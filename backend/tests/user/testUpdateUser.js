import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';

chai.use(chaiHttp);

// Testing /user/ PUT endpoint

describe('PUT /user/', () => {
  it('1. should return "Updated user" on a successful add.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        firstName: 'test',
        lastName: 'user',
        phone: '091234567',
        email: 'testuser@email.com',
        reservationID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.isObject(response.body, 'Expected the response to have a body object');

    const { userID, result } = response.body;
    assert.strictEqual(result, 'Updated user');

    // The mock SQL doesn't return a proper result object which the userID is obtained from, so can't use this part of the test with the mock SQL
    if (!config.mock) {
      assert.isNumber(userID, 'Expected userID to be a number');
    }
  });

  it('2. should return expected error when all parameters other than reservationID are missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        reservationID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error: '/user PUT endpoint needs firstName, lastName, phone, OR email, AND reservationID body params'
    });
  });

  it('3. should return expected error when the reservationID parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        firstName: 'test',
        lastName: 'user',
        phone: '091234567',
        email: 'testuser@email.com'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error: '/user PUT endpoint needs firstName, lastName, phone, OR email, AND reservationID body params'
    });
  });

  it('4. should successfully update if only reservationID and firstName are provided.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        firstName: 'test',
        reservationID: '300'
      });

    const { userID, result } = response.body;
    assert.strictEqual(result, 'Updated user');

    if (!config.mock) {
      assert.isNumber(userID, 'Expected userID to be a number');
    }
  });

  it('5. should successfully update if only reservationID and lastName are provided.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        lastName: 'user',
        reservationID: '300'
      });

    const { userID, result } = response.body;
    assert.strictEqual(result, 'Updated user');

    if (!config.mock) {
      assert.isNumber(userID, 'Expected userID to be a number');
    }
  });

  it('6. should successfully update if only reservationID and phone are provided.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        phone: '091234567',
        reservationID: '300'
      });

    const { userID, result } = response.body;
    assert.strictEqual(result, 'Updated user');

    if (!config.mock) {
      assert.isNumber(userID, 'Expected userID to be a number');
    }
  });

  it('7. should successfully update if only reservationID and email are provided.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        email: 'testuser@email.com',
        reservationID: '300'
      });

    const { userID, result } = response.body;
    assert.strictEqual(result, 'Updated user');

    if (!config.mock) {
      assert.isNumber(userID, 'Expected userID to be a number');
    }
  });
});
