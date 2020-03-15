import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config/config';

chai.use(chaiHttp);

// Testing /reservation/single POST endpoint

describe('POST reservations/single', () => {
  it('1. should return the reservationID on a successful add.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        time: '11:30:00',
        notes: 'An example note.',
        numberOfGuests: 2,
        tableID: '300',
        restaurantID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.isObject(response.body, 'Expected the response to have a body object');

    const { reservationID, result } = response.body;
    assert.strictEqual(result, 'Added single reservation');
    assert.isNumber(reservationID, 'Expected reservationID to be a number');
  });

  it('2. should return expected error when the date parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        time: '11:30:00',
        notes: 'An example note.',
        numberOfGuests: 2,
        tableID: '300',
        restaurantID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
  });

  it('3. should return expected error when the time parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        notes: 'An example note.',
        numberOfGuests: 2,
        tableID: '300',
        restaurantID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
  });

  it('4. should return expected error when the numberOfGuests parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        time: '11:30:00',
        notes: 'An example note.',
        tableID: '300',
        restaurantID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
  });

  it('5. should return expected error when the tableID parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        time: '11:30:00',
        notes: 'An example note.',
        numberOfGuests: 2,
        restaurantID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
  });

  it('6. should return expected error when the restaurantID parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        time: '11:30:00',
        notes: 'An example note.',
        numberOfGuests: 2,
        tableID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
  });

  it('7. should return expected error when the userID parameter is missing.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        time: '11:30:00',
        notes: 'An example note.',
        numberOfGuests: 2,
        tableID: '300',
        restaurantID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.deepEqual(response.body, {
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
  });

  it('8. should successfully add even when notes is not present.', async () => {
    let response = await chai
      .request(`${config.listen.address}:${config.listen.port}/reservation`)
      .post('/single')
      .send({
        date: '2020-03-14',
        time: '11:30:00',
        numberOfGuests: 2,
        tableID: '300',
        restaurantID: '300',
        userID: '300'
      });

    assert.isObject(response, 'Expected the response to be an object');
    assert.isObject(response.body, 'Expected the response to have a body object');

    const { reservationID, result } = response.body;
    assert.strictEqual(result, 'Added single reservation');
    assert.isNumber(reservationID, 'Expected reservationID to be a number');
  });
});
