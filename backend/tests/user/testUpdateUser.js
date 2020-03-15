import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';

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

  it('2. should return expected error when the firstName parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        lastName: 'user',
        phone: '091234567',
        email: 'testuser@email.com',
        reservationID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error: '/user PUT endpoint needs firstName, lastName, phone, email, and reservationID body params'
    });
  });

  it('3. should return expected error when the lastName parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        firstName: 'test',
        phone: '091234567',
        email: 'testuser@email.com',
        reservationID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error: '/user PUT endpoint needs firstName, lastName, phone, email, and reservationID body params'
    });
  });

  it('4. should return expected error when the phone parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'testuser@email.com',
        reservationID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error: '/user PUT endpoint needs firstName, lastName, phone, email, and reservationID body params'
    });
  });

  it('5. should return expected error when the email parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/user`)
      .put('/')
      .send({
        firstName: 'test',
        lastName: 'user',
        phone: '091234567',
        reservationID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error: '/user PUT endpoint needs firstName, lastName, phone, email, and reservationID body params'
    });
  });

  it('6. should return expected error when the reservationID parameter is missing.', async () => {
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
      error: '/user PUT endpoint needs firstName, lastName, phone, email, and reservationID body params'
    });
  });
});
