import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import connection from '../../database';

chai.use(chaiHttp);
// Testing /reservation/?restaurantID GET endpoint. Using IDs 1-5

before(async () => {
  // Setup the database before any tests in this file run.
  const errors = [];
  await connection
    .asyncQuery('INSERT INTO RESTAURANT VALUES (1, "Example restaurant0" , 1);')
    .then(({ error }) => error && errors.push(error));

  await connection
    .asyncQuery(`INSERT INTO \`TABLE\` VALUES (1, 1, 1, 6);`)
    .then(({ error }) => error && errors.push(error));

  await connection
    .asyncQuery(
      `INSERT INTO USER VALUES (1, "First name", "Last name", "09 123,456", "example@email.com");`
    )
    .then(({ error }) => error && errors.push(error));
  assert.strictEqual(errors.length, 0, 'Expected no errors in initial setup');
});

describe('GET reservations/', () => {
  // Test that the API is able to handle calls when there are no reservations for the desired restaurant.
  it('1. should return an empty array when there are no reservations.', async function () {
     const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation/restaurant`)
       .get('')
      .query({ restaurantID: 1 });

     assert.isObject(queryResult, 'Expected the request to return an object');
     assert.isFalse(queryResult.error, 'Expected error to be undefined. Ensure an instance of the api is running');

    const { body } = queryResult;

    assert.isObject(body, 'Expected response to contain a body object');
     assert.isArray(body.result, 'Expected response body to contain an array of results');
    assert.deepEqual(body.result, [], 'Expected an empty array of results');
    //assert.isOk(true)
  });

  // Test that the API is able to return the correct result when there is only one reservation for the desired restaurant.
  it('2. should return an array of reservations when the restaurant only has one reservation', async function () {
     await connection
      .asyncQuery(
        `INSERT INTO RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, Name, Phone, Email)
     VALUES (1, '2020-03-14', '11:30:00', '', '1', '1', '1',  'judelaw', '686393369',  'judelaw@gmail.com');`
      )
     .then(({ error }) => {
         assert.isUndefined(error, 'Expected no errors when adding items to database');
       });

     const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('')
      .query({ restaurantID: 1 });

     assert.isObject(queryResult, 'Expected the request to return an object');
     assert.isFalse(queryResult.error, 'Expected error to be undefined. Ensure an instance of the api is running');

     const { body } = queryResult;
     assert.isObject(body, 'Expected response to contain a body object');
     assert.isArray(body.result, 'Expected response body to contain an array of results');

     const rows = body.result;
     assert.strictEqual(rows.length, 1, 'Expected only 1 row to be returned');
     assert.sameDeepMembers(
       rows,
     [
        {
          ID: '1',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
          Name: 'judelaw',
          phone: '686393369',
          Email: 'judelaw@gmail.com',
        }
      ],
      // 'Expected the correct row to be returned from database'
     );
   // assert.isOk(true)
  });

  // Test that the API is able to return the correct result when there are multiple reservations for the desired restaurant.
  it('3. should return an array of reservations when the restaurant has multiple reservations', async function () {
     await connection
       .asyncQuery(
        `INSERT INTO RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, Name, Phone, Email)
        VALUES (1, '2020-03-14', '11:30:00', '', '1', '1', '1',  'judelaw', '686393369', 'judelaw@gmail.com');`
       )
       .then(({ error }) => {
        assert.isUndefined(error, 'Expected no errors when adding items to database');
       });

     await connection
      .asyncQuery(
        `INSERT INTO RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, Name, Phone, Email)
        VALUES (1, '2020-03-14', '11:30:00', '', '1', '1', '1',  'judelaw', '686393369', 'judelaw@gmail.com');`
     )
       .then(({ error }) => {
         assert.isUndefined(error, 'Expected no errors when adding items to database');
      });

     const queryResult = await chai
       .request(`${config.listen.address}:${config.listen.port}/reservation`)
       .get('')
       .query({ restaurantID: 1 });

     assert.isObject(queryResult, 'Expected the request to return an object');
     assert.isFalse(queryResult.error, 'Expected error to be undefined. Ensure an instance of the api is running');

     const { body } = queryResult;
     assert.isObject(body, 'Expected response to contain a body object');
     assert.isArray(body.result, 'Expected response body to contain an array of results');

     const rows = body.result;
     assert.strictEqual(rows.length, 3, 'Expected 3 row to be returned');
     assert.sameDeepMembers(
       rows,
      [
         {
           
       },
        {
          ID: '1',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
           Name: 'judelaw',
            phone: '686393369',
            Email: 'judelaw@gmail.com',
        },
         {
         ID: '3',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
           Name: 'judelaw',
            phone: '686393369',
            Email: 'judelaw@gmail.com',
        }
      ],
     // 'Expected the correct rows to be returned from database'
     );
    // assert.isOk(true)
  });

  // Test that the API is able to handle requests that do not provide a desired restaurantID and return the appropriate error.
  it('4. should return expected error when restaurantID is not provided.', async function () {
     const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation/restaurant`)
       .get('')
       .query({});

     assert.isObject(queryResult, 'Expected the request to return an object');

     const { body } = queryResult;
     assert.isObject(body, 'Expected response to contain a body object');
     assert.deepEqual(body, {
       error: 'GET reservation invocation error: missing ?restaurantID= query param'
     });
    //assert.isOk(true)
  });

  // Test that the API is able to handle requests that include additional, un-needed parameters and still return the expected result.
  it('5. should ignore extra parameters.', async function () {
     const queryResult = await chai
       .request(`${config.listen.address}:${config.listen.port}/reservation`)
       .get('')
       .query({ restaurantID: 1, notRestaurantID: 2 });

     assert.isObject(queryResult, 'Expected the request to return an object');
     assert.isFalse(queryResult.error, 'Expected error to be undefined. Ensure an instance of the api is running');

     const { body } = queryResult;
     assert.isObject(body, 'Expected response to contain a body object');
    assert.isArray(body.result, 'Expected response body to contain an array of results');

     const rows = body.result;
     assert.strictEqual(rows.length, 3, 'Expected 3 row to be returned');
     assert.sameDeepMembers(
       rows,
       [
         {
          ID: '1',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
           Name: 'judelaw',
            phone: '686393369',
            Email: 'judelaw@gmail.com',
       },
        {
      ID: '1',
      Date: '2020-03-14T00:00:00.000Z',
      Time: '11:30:00',
      Notes: '',
      NumberOfGuests: 1,
      TableID: 1,
      RestaurantID: 1,
       Name: 'judelaw',
        phone: '686393369',
        Email: 'judelaw@gmail.com',
        },
         {
          ID: '1',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
           Name: 'judelaw',
            phone: '686393369',
            Email: 'judelaw@gmail.com',
         }
       ],
    //   'Expected the correct rows to be returned from database'
     );
  // assert.isOk(true)
  });

  // Test that the API is able to handle requests that have a malformed restaurantID and return the appropriate error.
  it('6. should return expected error when restaurantID is malformed.', async function () {
     const queryResult = await chai
       .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('')
     .query({ restaurantID: [1, 2, 3] });

     assert.isObject(queryResult, 'Expected the request to return an object');
   assert.isObject(queryResult.body, 'Expected the request body to be an object');

     const { error } = queryResult.body;
    assert.isObject(error, 'Expected the error to be an object');
    assert.strictEqual(error.code, 'ER_PARSE_ERROR', 'Expected the correct error code');
  });

//Test that the API is able to handle requests that have a restaurantID that is not in the database. Should return an empty array.
   it('7. should return an empty array when restaurantID does not exist in database.', async function () {
     const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('')
      .query({ restaurantID: 4 });

     assert.isObject(queryResult, 'Expected the request to return an object');
     assert.isObject(queryResult.body, 'Expected the request body to be an object');

     const { body } = queryResult;
     assert.isObject(body, 'Expected response to contain a body object');
     assert.isArray(body.result, 'Expected response body to contain an array of results');

     const rows = body.result;
     assert.deepEqual(body.result, [], 'Expected an empty array of results');
     //   assert.isOk(true)
  });
});
