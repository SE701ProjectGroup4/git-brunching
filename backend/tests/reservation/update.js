import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';

chai.use(chaiHttp);

// Testing /reservation/ PUT endpoint

describe('PUT /reservation', () => {
  it('1. should return "This reservation does not exist" for a non-existant reservationID', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .put('/300')
      .send({});

    assert.isObject(response, 'Expected the response to be an object');
    assert.isObject(response.body, 'Expected the response to have a body object');

    const { error } = response.body;
    assert.strictEqual(error, 'This reservation does not exist');
  });
});