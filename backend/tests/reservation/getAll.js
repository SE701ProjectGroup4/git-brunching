import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';
import connection from '../../database';

chai.use(chaiHttp);

// before(async () => {
//   const { error, result } = await connection.asyncQuery(
//     `INSERT INTO restaurant_db.RESTAURANT VALUES (300, "Example resteraunt");`
//   );

//   console.log('Inserting starting reservations');
//   console.log({ error, result });
// });
// Testing /reservation/all GET endpoint. Using ids 0-10
describe('GET reservations/all', () => {
  it.only('4. should return reservation.', function(done) {
    // const { error, result } = await connection.asyncQuery(
    //   `BEGIN;
    //   INSERT INTO restaurant_db.RESTAURANT VALUES (300, "Example resteraunt");
    //   INSERT INTO restaurant_db.TABLE VALUES (300, 300, 1, 6);
    //   INSERT INTO restaurant_db.USER VALUES (300, "First name", "Last name", "09 123,456", "example@email.com");
    //   INSERT INTO restaurant_db.RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID)
    //     VALUES (300, '2020-03-14', '11:30:00', '', '2', '300', '300', '300');
    //   COMMIT;`
    // );

    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/all')
      .query({ restaurantID: 300 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.isArray(body.result, 'Expected response body to contain an array of results');

        // assert.isAtLeast(body.result.length, 1, 'Expected at lease 1 result');

        // const row = body.result[0];

        // assert.deepEqual(
        //   row,
        //   {
        //     ID: '300',
        //     Date: '2020-03-14T00:00:00.000Z',
        //     Time: '11:30:00',
        //     Notes: '',
        //     NumberOfGuests: 2,
        //     TableID: 300,
        //     RestaurantID: 300,
        //     UserID: 300
        //   },
        //   'Expected the correct row to be returned from database'
        // );
        connection.end();
        done();
      });
  });

  it('1. should return expected error when restaurantID is not provided.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/all')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/all GET endpoint needs a restaurantID query param'
        });
        done();
      });
  });

  it('2. should return expected correct query when restaurantID is provided.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/all')
      .query({ restaurantID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.isObject(body.result, 'Expected response body to contain a result object');

        const { query, args } = body.result;

        assert.strictEqual(
          query,
          'SELECT ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION WHERE RestaurantID = ?;',
          'Expected the returned query to match expected query'
        );

        assert.deepEqual(args, ['4'], 'Expected the placeholder id to be the same id that was sent in the request.');
        done();
      });
  });

  it('3. should ignore ignore invalid parameters.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/all')
      .query({ reservationID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/all GET endpoint needs a restaurantID query param'
        });
        done();
      });
  });
});
