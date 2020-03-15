import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';

chai.use(chaiHttp);

// Testing restaurant/getall end point
describe('GET restaurant/getall', () => {
  it('1. should return expected error if extra parameters are entered', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/getall')
      .query({id:1})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {error: '/restaurant/getall GET endpoint needs no query param'});
        done();
      });
  });

  it('2. should return expected correct query with no parameters', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/getall')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {query: 'SELECT * FROM RESTAURANT'}); 
        done();
      });
    });
});
