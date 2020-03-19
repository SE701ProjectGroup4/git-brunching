import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';

chai.use(chaiHttp);

// Testing restaurant/openhours end point
describe('GET restaurant/openhours', () => {
it('1. should return expected error if no parameters are entered', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/openhours')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {error: '/restaurant/openhours GET endpoint needs a restaurantID query param'});
        done();
      });
  });

  it('2. should return expected error if incorrect parameters are entered', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/openhours')
      .query({notRestaurantID:2})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {error: '/restaurant/openhours GET endpoint needs a restaurantID query param'});
        done();
      });
  });

  it('3. should return expected correct query when restaurantID is provided', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/openhours')
      .query({restaurantID:2})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        
        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          "query":"SELECT DayOfWeek, OpenTime, CloseTime from HOURS WHERE RestaurantID = ?;",
          "args":["2"]
        });
        done();
      });
  });

});
