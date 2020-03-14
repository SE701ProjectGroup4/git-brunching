import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('DELETE reservations/single', () => {
  it('1. should return expected error when reservationID is not provided.', function(done) {
    chai
      .request('localhost:3001/reservation')
      .delete('/single')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/single DELETE endpoint needs a reservationID query param',
        });
        done();
      });
  });

  it('2. should successfully delete when reservationID is provided.', function(done) {
    chai
      .request('localhost:3001/reservation')
      .delete('/single')
      .query({ reservationID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.strictEqual(body.result, 'Deleted reservation');
        done();
      });
  });
});
