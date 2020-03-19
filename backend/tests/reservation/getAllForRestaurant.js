import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import connection from '../../database';

chai.use(chaiHttp);
// Testing /reservation/?restaurantID GET endpoint. Using IDs 1-5

before(async () => {
  // Setup the databse before any tests in this file run.
  const errors = [];
  await connection
    .asyncQuery('INSERT INTO restaurant_db.RESTAURANT VALUES (1, "Example resteraunt");')
    .then(({ error }) => error && errors.push(error));

  await connection
    .asyncQuery(`INSERT INTO restaurant_db.TABLE VALUES (1, 1, 1, 6);`)
    .then(({ error }) => error && errors.push(error));

  await connection
    .asyncQuery(
      `INSERT INTO restaurant_db.USER VALUES (1, "First name", "Last name", "09 123,456", "example@email.com");`
    )
    .then(({ error }) => error && errors.push(error));

  assert.strictEqual(errors.length, 0, 'Expected no errors in initial setup');
});

describe('GET reservations/all', () => {
  it('1. should return an empty array when there are no reservations.', async function() {
    const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('')
      .query({ restaurantID: 1 });

    assert.isObject(queryResult, 'Expected the request to return an object');
    assert.isFalse(queryResult.error, 'Expected error to be undefined. Ensure an instance of the api is running');

    const { body } = queryResult;

    assert.isObject(body, 'Expected response to contain a body object');
    assert.isArray(body.result, 'Expected response body to contain an array of results');
    assert.deepEqual(body.result, [], 'Expected an empty array of results');
  });

  it('2. should return an array of reservations when the resteraunt only has one reservation', async function() {
    await connection
      .asyncQuery(
        `INSERT INTO restaurant_db.RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID)
    VALUES (1, '2020-03-14', '11:30:00', '', '1', '1', '1', '1');`
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
    assert.deepEqual(
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
          UserID: 1
        }
      ],
      'Expected the correct row to be returned from database'
    );
  });

  it('3. should return an array of reservations when the resteraunt has multiple reservations', async function() {
    await connection
      .asyncQuery(
        `INSERT INTO restaurant_db.RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID)
    VALUES (2, '2020-03-14', '11:30:00', '', '1', '1', '1', '1');`
      )
      .then(({ error }) => {
        assert.isUndefined(error, 'Expected no errors when adding items to database');
      });

    await connection
      .asyncQuery(
        `INSERT INTO restaurant_db.RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID)
    VALUES (3, '2020-03-14', '11:30:00', '', '1', '1', '1', '1');`
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
          ID: '1',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
          UserID: 1
        },
        {
          ID: '2',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
          UserID: 1
        },
        {
          ID: '3',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
          UserID: 1
        }
      ],
      'Expected the correct rows to be returned from database'
    );
  });

  it('4. should return expected error when restaurantID is not provided.', async function() {
    const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .get('')
      .query({});

    assert.isObject(queryResult, 'Expected the request to return an object');

    const { body } = queryResult;
    assert.isObject(body, 'Expected response to contain a body object');
    assert.deepEqual(body, {
      error: 'GET reservation invocation error: missing ?restaurantID= query param'
    });
  });

  it('5. should ignore extra paramaters.', async function() {
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
          UserID: 1
        },
        {
          ID: '2',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
          UserID: 1
        },
        {
          ID: '3',
          Date: '2020-03-14T00:00:00.000Z',
          Time: '11:30:00',
          Notes: '',
          NumberOfGuests: 1,
          TableID: 1,
          RestaurantID: 1,
          UserID: 1
        }
      ],
      'Expected the correct rows to be returned from database'
    );
  });

  it('6. should return expected error when restaurantID is malformed.', async function() {
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
});
