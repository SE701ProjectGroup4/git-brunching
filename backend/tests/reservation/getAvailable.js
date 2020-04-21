// import chai, { assert } from 'chai';
// import chaiHttp from 'chai-http';
// import config from '../../config';

// chai.use(chaiHttp);

// // Testing /reservation/single DELETE endpoint

// describe('GET reservations/available', () => {
//   it('1. should return expected error when either restaurantID, date, time or numberOfGuests is not provided.', function(done) {
//     chai
//       .request(`${config.listen.address}:${config.listen.port}/reservation`)
//       .get('/available')
//       .query({})
//       .end((err, res) => {
//         assert.isNull(err, 'Expected error to be null. Ensure an instance of the api is running');

//         const { body } = res;
//         assert.isObject(body, 'Expected response to contain a body object');
//         assert.deepEqual(body, {
//           error: 'reservation/available GET endpoint needs: date, time, numberOfGuests and restaurantID body params'
//         });
//         done();
//       });
//   });
// });
