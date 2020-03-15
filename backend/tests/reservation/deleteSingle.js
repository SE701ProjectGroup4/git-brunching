import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';

chai.use(chaiHttp);

// Testing /reservation/single DELETE endpoint

describe('DELETE reservations/single', () => {
  it('1. should return expected error when reservationID is not provided.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .delete('/single')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reservation/single DELETE endpoint needs a reservationID query param'
        });
        done();
      });
  });

  it('2. should return an error as reservation does not exist.', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .delete('/single')
      .query({ reservationID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, { error: 'This reservation does not exist' });
        done();
      });
  });
});
