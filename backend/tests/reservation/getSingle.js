import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';

chai.use(chaiHttp);

// Testing /reservation/single GET endpoint

describe('GET reservations/single', () => {
  it('1. should return expected error when reservationID is not provided.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/single')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/single GET endpoint needs a reservationID query param'
        });
        done();
      });
  });

  it('2. should return expected correct query when reservationID is provided.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/single')
      .query({ reservationID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.isObject(body.result, 'Expected response body to contain a result object');

        const { query, args } = body.result;

        assert.strictEqual(
          query,
          'SELECT ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION WHERE ID = ? ',
          'Expected the returned query to match expected query'
        );

        assert.deepEqual(args, ['4'], 'Expected the placeholder id to be the same id that was sent in the request.');
        done();
      });
  });

  it('3. should ignore extra parameters.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('/single')
      .query({ notReservationID: 4, reservationID: 1 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.isObject(body.result, 'Expected response body to contain a result object');

        const { query, args } = body.result;

        assert.strictEqual(
          query,
          'SELECT ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION WHERE ID = ? ',
          'Expected the returned query to match expected query'
        );

        assert.deepEqual(args, ['1'], 'Expected the placeholder id to be the same id that was sent in the request.');
        done();
      });
  });
});
