import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import connection from '../../database';
chai.use(chaiHttp);
var expect = chai.expect;


before(async () => {
  // Setup the database before any tests in this file run.
  const errors = [];
  await connection
    .asyncQuery('INSERT INTO RESTAURANT VALUES (6,"KCF"),(7,"Mendat Ramen"),(8,"Nantoz"),(9,"Uni Zushi");')
    .then(({ error }) => error && errors.push(error));

  await connection
    .asyncQuery(`INSERT INTO \`TABLE\` VALUES (1,6,1,4),(1,7,1,3),(1,8,1,4),(1,9,1,3),(2,6,3,8),(2,7,1,3),(2,8,4,10),(2,9,1,3),(3,6,2,6),(3,9,4,10),(4,6,1,4);`)
    .then(({ error }) => error && errors.push(error));

  assert.strictEqual(errors.length, 0, 'Expected no errors in initial setup');
});


// Testing restaurant/{restaurantID}/capacity end point
describe('GET restaurant/{restaurantID}/capacity', () => {
it('1. should return expected error if no restaurantID are entered', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/{restaurantID}/capacity')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        const { body } = res;
        assert.isArray(body, 'Expected response to contain a body object');
        assert.deepEqual(body,{error: '/restaurant/{restaurantID}/capacity GET endpoint needs a restaurantID query param'});
        done();
      });
  });

  it('2. should return expected error if incorrect parameters are entered', function(done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/{restaurantID}/capacity')
      .query({notRestaurantID:6})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        const { body } = res;
        assert.isArray(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {error: '/restaurant/{restaurantID}/capacity GET endpoint needs a restaurantID query param'});
        done();
      });
  });

  it('3. should return expected correct query when restaurantID is provided',  function(done) { 
	  
    chai
      .request(`${config.listen.address}:${config.listen.port}/restaurant`)
      .get('/7/capacity')
      .query({restaurantID:1})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');
        
        const { body } = res;
        assert.isArray(body, 'Expected response to contain a body object');
		
		var rslt=[];
		
		connection.query(
		'SELECT MIN(MinGuests) as minimum, MAX(MaxGuests) as maximum FROM restaurant_db.TABLE as t WHERE t.RestaurantID = ?;',
		["7"],
		(error, results) => {
			rslt=results;
			assert.deepEqual(body, results,'Expected response to contain a xxxxx object');
	  });
		
		//expect(rslt).to.have.members([{minimum:null,maximum:null}]);
		//expect(actual).to.have.members({maximum:null});
        //});
        done();
      });
  });

});

