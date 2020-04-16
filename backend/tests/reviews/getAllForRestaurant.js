import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import connection from '../../database';

chai.use(chaiHttp);
// Testing /reviews/restaurant/?restaurantID GET endpoint. Using IDs 1-2

before(async () => {
  // Setup the database before any tests in this file run.
  const errors = [];
  await connection
    .asyncQuery('INSERT INTO restaurant_db.RESTAURANT VALUES (1, "Example restaurant1");')
    .then(({ error }) => error && errors.push(error));
  await connection;

  assert.strictEqual(errors.length, 0, 'Expected no errors in initial setup');
});

describe('GET reviews/', () => {
  // Test that the API is able to handle calls when there are no reviews for the desired restaurant.
  it('1. should return an empty array when there are no reviews.', async function () {
    const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reviews`)
      .get('')
      .query({ restaurantID: 1 });

    assert.isObject(queryResult, 'Expected the request to return an object');
    assert.isFalse(queryResult.error, 'Expected error to be undefined. Ensure an instance of the api is running');

    const { body } = queryResult;

    assert.isObject(body, 'Expected response to contain a body object');
    assert.isArray(body.result, 'Expected response body to contain an array of results');
    assert.deepEqual(body.result, [], 'Expected an empty array of results');
  });

  // Test that the API is able to return the correct result when there is only one review for the desired restaurant.
  it('2. should return an array of reviews when the restaurant only has one review', async function () {
    await connection
      .asyncQuery(`INSERT INTO restaurant_db.REVIEW VALUES (1, "Bryan", 1, "This place sucks");`)
      .then(({ error }) => {
        assert.isUndefined(error, 'Expected no errors when adding items to database');
      });

    const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reviews/restuarant`)
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
          Name: 'Bryan',
          RestaurantId: 1,
          Review: 'This place sucks'
        }
      ],
      'Expected the correct row to be returned from database'
    );
  });

  // Test that the API is able to return the correct result when there are multiple reviews for the desired restaurant.
  it('3. should return an array of reviews when the restaurant has multiple reviews', async function () {
    await connection
      .asyncQuery(`INSERT INTO restaurant_db.REVIEW VALUES (1, "Bryan", 1, "This place sucks");`)
      .then(({ error }) => {
        assert.isUndefined(error, 'Expected no errors when adding items to database');
      });

    await connection
      .asyncQuery(`INSERT INTO restaurant_db.REVIEW VALUES (2, "Richard", 1, "OMG best place ever");`)
      .then(({ error }) => {
        assert.isUndefined(error, 'Expected no errors when adding items to database');
      });

    const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reviews`)
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
          Name: 'Bryan',
          RestaurantId: 1,
          Review: 'This place sucks'
        },
        {
          ID: '2',
          Name: 'Richard',
          RestaurantId: 1,
          Review: 'OMG best place ever'
        }
      ],
      'Expected the correct rows to be returned from database'
    );
  });

  // Test that the API is able to handle requests that do not provide a desired restaurantID and return the appropriate error.
  it('4. should return expected error when restaurantID is not provided.', async function () {
    const queryResult = await chai
      .request(`${config.listen.address}:${config.listen.port}/reviews/restaurant`)
      .get('')
      .query({});

    assert.isObject(queryResult, 'Expected the request to return an object');

    const { body } = queryResult;
    assert.isObject(body, 'Expected response to contain a body object');
    assert.deepEqual(body, {
      error: 'GET reviews invocation error: missing ?restaurantID= query param'
    });
  });
});
