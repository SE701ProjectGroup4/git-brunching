import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('GET reservations/all', () => {
  it('1. should return expected error when restaurantID is not provided.', function(done) {
    chai
      .request('localhost:3001/reservation')
      .get('/all')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/all GET endpoint needs a restaurantID query param',
        });
        done();
      });
  });

  it('2. should return expected correct query when restaurantID is provided.', function(done) {
    chai
      .request('localhost:3001/reservation')
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
      .request('localhost:3001/reservation')
      .get('/all')
      .query({ reservationID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/all GET endpoint needs a restaurantID query param',
        });
        done();
      });
  });
});
