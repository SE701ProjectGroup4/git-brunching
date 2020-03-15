import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const validateTime = (databaseRow, databaseError, action) => {
  // Handle errors
  if (databaseError) {
    return { error: 'Could not retrieve this reservation' };
  }

  if (!databaseRow || !Array.isArray(databaseRow) || databaseRow.length !== 1) {
    return { error: 'This reservation does not exist' };
  }

  const reservationTime = databaseRow[0].Time;
  const [hour, min, sec] = reservationTime.split(':').map(token => Number(token));

  const reservationDateTime = new Date(databaseRow[0].Date);
  reservationDateTime.setHours(reservationDateTime.getHours() + hour);
  reservationDateTime.setMinutes(reservationDateTime.getMinutes() + min);
  reservationDateTime.setSeconds(reservationDateTime.getSeconds() + sec);
  const currentDateTime = new Date();

  // Ensure the reservation has not already passed
  if (reservationDateTime < currentDateTime) {
    return { error: 'This reservation has already passed' };
  }

  // Ensure the reservation is more than 1 hour away
  reservationDateTime.setHours(reservationDateTime.getHours() - 1);
  if (reservationDateTime < currentDateTime) {
    return { error: `Can only ${action} reservations more than 1 hour in advance` };
  }

  return {};
};

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

// Update a reservation when a user needs to change a field.
// The applicable fields to change are:
// Notes, Number Of Guests, Date, Time
router.post('/update', async (req, res) => {
  const { reservationID, date, time, numberOfGuests, notes } = req.body;

  if (!reservationID) {
    res.status(400).json({ error: 'reservation/update POST endpoint needs a reservationID body param' });
    return;
  }

  // check that this is an applicable booking to update (i.e more than 1 hour away)
  const {
    error: queryError,
    result: queryResult
  } = await connection.asyncQuery('SELECT Date, Time, Notes, NumberOfGuests FROM RESERVATION WHERE ID = ?;', [
    reservationID
  ]);

  const validationResult = validateTime(queryResult, queryError, 'update');

  if (validationResult.error) {
    res.status(400).json({ error: validationResult.error });
    return;
  }

  // Update old values
  const newNotes = notes || queryResult[0].Notes;
  const newDate = date || queryResult[0].Date;
  const newTime = time || queryResult[0].Time;
  const newNoOfGuests = numberOfGuests || queryResult[0].NumberOfGuests;

  // update booking details
  const { error: updateError } = await connection.asyncQuery(
    'UPDATE RESERVATION SET Notes = ?, Date = ?, Time = ?, NumberOfGuests = ? WHERE ID = ?;',
    [newNotes, newDate, newTime, newNoOfGuests, reservationID]
  );

  if (updateError) {
    res.status(400).json({ error: updateError });
  }

  res.json({ result: 'Updated reservation', reservationID });
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
    result: timeRow
  } = await connection.asyncQuery('SELECT Date, Time FROM RESERVATION WHERE ID = ?;', [reservationID]);

  const validationResult = validateTime(timeRow, timeError, 'cancel');

  if (validationResult.error) {
    res.status(400).json({ error: validationResult.error });
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
