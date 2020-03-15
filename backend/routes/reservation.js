import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// Retrieve a single reservation for a user to check their reservation.
router.get('/single', async (req, res) => {
  const { reservationID } = req.query;

  if (!reservationID) {
    res.status(400).json({ error: 'reservation/single GET endpoint needs a reservationID query param' });
    return;
  }

  const { error, result } = await connection.asyncQuery(
    'SELECT ' +
    'ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION ' +
    'WHERE ID = ? ',
    [reservationID]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.json({ result });
});

// Retrieve all reservation from a single restaurant. Used by restaurant manager to see all reservations.
router.get('/all', async (req, res) => {
  const { restaurantID } = req.query;

  if (!restaurantID) {
    res.status(400).json({ error: 'reservation/all GET endpoint needs a restaurantID query param' });
    return;
  }

  const { error, result } = await connection.asyncQuery(
    'SELECT ' +
    'ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION ' +
    'WHERE RestaurantID = ?;',
    [restaurantID]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.json({ result });
});

// Add a new reservation when a user wants to book a table.
router.post('/single', async (req, res) => {
  // Generate a random number capped at 2147483647 as this is the largest number the database can hold.
  const reservationID = Math.floor(Math.random() * 2147483647);
  const { date, time, notes, numberOfGuests, tableID, restaurantID, userID } = req.body;

  if (!date || !time || !numberOfGuests || !tableID || !restaurantID || !userID) {
    res.status(400).json({
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params'
    });
    return;
  }

  const { error } = await connection.asyncQuery(
    'INSERT ' +
    'INTO RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
    [reservationID, date, time, notes, numberOfGuests, tableID, restaurantID, userID]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.json({ result: 'Added single reservation', reservationID });
});

// Delete a reservation when a customer want to cancel a booking.
router.delete('/single', async (req, res) => {
  const { reservationID } = req.query;

  if (!reservationID) {
    res.status(400).json({ error: 'reservation/single DELETE endpoint needs a reservationID query param' });
    return;
  }

  const {
    error: timeError,
    result: row
  } = await connection.asyncQuery('SELECT DATE, TIME FROM RESERVATION WHERE ID = ?;', [reservationID]);

  if (timeError) {
    res.status(400).json({ error: 'Could not retrieve this reservation' });
    return;
  }

  const timeRow = JSON.parse(JSON.stringify(row)); // Convert SQL row into readable array.

  if (!timeRow || !Array.isArray(timeRow) || timeRow.length !== 1) {
    res.status(400).json({ error: 'This reservation does not exist' });
    return;
  }

  const reservationTime = (timeRow[0] || {}).TIME;
  const [hour, min, sec] = reservationTime.split(':').map(token => Number(token));

  const reservationDateTime = new Date((timeRow[0] || {}).DATE);
  reservationDateTime.setHours(reservationDateTime.getHours() + hour);
  reservationDateTime.setMinutes(reservationDateTime.getMinutes() + min);
  reservationDateTime.setSeconds(reservationDateTime.getSeconds() + sec);
  const currentDateTime = new Date();

  // Ensure the reservation has not already passed
  if (reservationDateTime < currentDateTime) {
    res.status(400).json({ error: 'This reservation has already passed' });
    return;
  }

  // Ensure the reservation is more than 1 hour away
  reservationDateTime.setHours(reservationDateTime.getHours() - 1);

  if (reservationDateTime < currentDateTime) {
    res.status(400).json({ error: 'Can only cancel reservations more than 1 hour in advance' });
    return;
  }

  const { error } = await connection.asyncQuery('DELETE FROM RESERVATION WHERE ID=?;', [reservationID]);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.json({ result: 'Deleted reservation' });
});

export default router;
