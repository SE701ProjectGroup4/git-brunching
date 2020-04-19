<<<<<<< HEAD
// import chai, { assert } from 'chai';
// import chaiHttp from 'chai-http';
// import config from '../../config';

// chai.use(chaiHttp);

// // Testing /reviews/single GET endpoint

// describe('GET reviews/single', () => {
//   it('1. should return expected error when reviewID is not provided.', function (done) {
//     chai
//       .request(`${config.listen.address}:${config.listen.port}/reviews`)
//       .get('/single')
//       .query({})
//       .end((err, res) => {
//         assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

//         const { body } = res;
//         assert.isObject(body, 'Expected response to contain a body object');
//         assert.deepEqual(body, {
//           error: 'reviews/single GET endpoint needs a reviewID query param'
//         });
//         done();
//       });
//   });

//   it('2. should return expected correct query when reviewID is provided.', function (done) {
//     chai
//       .request(`${config.listen.address}:${config.listen.port}/reviews`)
//       .get('/single')
//       .query({ reviewID: 4 })
//       .end((err, res) => {
//         assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

//         const { body } = res;
//         assert.isObject(body, 'Expected response to contain a body object');
//         assert.isObject(body.result, 'Expected response body to contain a result object');

//         const { query, args } = body.result;

//         assert.strictEqual(
//           query,
//           'SELECT * FROM REVIEWS WHERE ID = ? ',
//           'Expected the returned query to match expected query'
//         );
//         done();
//       });
//   });
// });
=======
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';

chai.use(chaiHttp);

// Testing /reviews/single GET endpoint

describe('GET reviews/single', () => {
  it('1. should return expected error when reviewID is not provided.', function (done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reviews`)
      .get('/single')
      .query({})
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.deepEqual(body, {
          error: 'reviews/single GET endpoint needs a reviewID query param'
        });
        done();
      });
  });

  it('2. should return expected correct query when reviewID is provided.', function (done) {
    chai
      .request(`${config.listen.address}:${config.listen.port}/reviews`)
      .get('/single')
      .query({ reviewID: 4 })
      .end((err, res) => {
        assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

        const { body } = res;
        assert.isObject(body, 'Expected response to contain a body object');
        assert.isObject(body.result, 'Expected response body to contain a result object');

        const { query, args } = body.result;

        assert.strictEqual(
          query,
          'SELECT * FROM REVIEWS WHERE ID = ? ',
          'Expected the returned query to match expected query'
        );
        done();
      });
  });
});
>>>>>>> 09e60cd... added swagger documentation
