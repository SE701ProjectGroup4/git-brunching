import express from 'express';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';

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

/**
 * @swagger
 *
 * /reservation/{reservationId}:
 *   get:
 *     description: Fetch a reservation object
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         description: Primary Key of reservation database table
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns reservation object
 */
router.get('/:reservationId', async (req, res) => {
  const reservationID = req.params.reservationId;

  if (!reservationID) {
    res.status(400).json({ error: 'GET reservation/{id} invocation error: {id} needs to be an int' });
    return;
  }

  const { error, result } = await connection.asyncQuery(
    'SELECT * ' +
    'FROM RESERVATION ' +
    'WHERE ID = ? ',
    [reservationID]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.json({ result });
});

/**
 * @swagger
 *
 * /reservation/{restaurantID}:
 *   get:
 *     description: Fetch a all reservation for a restaurant
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns a list of reservation for made for the restaurant
 */
router.get('/', async (req, res) => {
  const { restaurantID } = req.query;

  if (!restaurantID) {
    res.status(400).json({ error: 'GET reservation invocation error: missing ?restaurantID= query param' });
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

/**
 * @swagger
 *
 * /reservation/{reservationID}:
 *   put:
 *     summary: Used to update reservation information
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: query
 *         required: true
 *         type: integer
 *       - name: numberOfGuests
 *         description: The number of guests that the table is being booked for
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: time
 *         description: The start time of the booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: date
 *         description: Date for when the booking is made
 *         in: formData
 *         required: true
 *         type: string
 *       - name: note
 *         description: Notes reguarding the booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: firstName
 *         description: First name of the person booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: Last name of the person booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phoneNumber
 *         description: Phone number of the person booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email of the person booking
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:reservationID', async (req, res) => {
  const { date, time, numberOfGuests, notes, firstName, lastName, phoneNumber, email } = req.body;
  const { reservationID } = req.params;

  if (!reservationID) {
    res.status(400).json({ error: 'PUT reservation/{id} invocation error: {id} needs to be an int ' });
    return;
  }

  const { error: reservationQueryError, result: reservationQueryResult } = await connection.asyncQuery(
    'SELECT Date, Time, Notes, NumberOfGuests, UserID FROM RESERVATION WHERE ID = ?;',
    [reservationID]
  );

  // check that this is an applicable booking to update (i.e more than 1 hour away)
  const validationResult = validateTime(reservationQueryResult, reservationQueryError, 'update');

  if (validationResult.error) {
    res.status(400).json({ error: validationResult.error });
    return;
  }

  const { error: userQueryError, result: userQueryResult } = await connection.asyncQuery(
    'SELECT * FROM USER WHERE ID = ?;', [reservationQueryResult[0].userID]
  );

  if (userQueryError) {
    res.status(400).json({ error: userQueryError });
  }

  // For each parameter, check if it has been provided in endpoint, otherwise use previous value.
  const newNotes = notes || reservationQueryResult[0].Notes;
  const newDate = date || reservationQueryResult[0].Date;
  const newTime = time || reservationQueryResult[0].Time;
  const newNoOfGuests = numberOfGuests || reservationQueryResult[0].NumberOfGuests;

  const newFirstName = firstName || userQueryResult[0].FirstName;
  const newLastName = lastName || userQueryResult[0].LastName;
  const newPhone = phoneNumber || userQueryResult[0].Phone;
  const newEmail = email || userQueryResult[0].Email;

  // update booking details
  const { error: reservationUpdateError } = await connection.asyncQuery(
    'UPDATE RESERVATION SET Notes = ?, Date = ?, Time = ?, NumberOfGuests = ? WHERE ID = ?;',
    [newNotes, newDate, newTime, newNoOfGuests, reservationID]
  );

  if (reservationUpdateError) {
    res.status(400).json({ error: reservationUpdateError });
  }

  // update user details
  const { error: userUpdateError } = await connection.asyncQuery(
    'UPDATE USER SET FirstName = ?, LastName = ?, Phone = ?, Email = ? WHERE ID = ?;',
    [newFirstName, newLastName, newPhone, newEmail, reservationQueryResult[0].userID]
  );

  if (userUpdateError) {
    res.status(400).json({ error: userUpdateError });
  }

  res.json({ result: 'Updated reservation', reservationID });
});

/**
 * @swagger
 *
 * /reservation:
 *   post:
 *     description: Fetch a all reservation for a restaurant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: numberOfGuests
 *         description: The number of guests that the table is being booked for
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: time
 *         description: The start time of the booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: date
 *         description: Date for when the booking is made
 *         in: formData
 *         required: true
 *         type: string
 *       - name: tableID
 *         description: ID for the table being booked
 *         in: formData
 *         required: true
 *         type: string
 *       - name: userID
 *         description: ID for the user
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return success message for adding reservation
 */
router.post('/', async (req, res) => {
  // Generate a random, unique id.
  const reservationID = uniqid();
  const { date, time, notes, numberOfGuests, tableID, restaurantID, userID } = req.body;

  if (!date || !time || !numberOfGuests || !tableID || !restaurantID || !userID) {
    res.status(400).json({
      error:
        'POST reservation invocation error: post body needs { date, time, numberOfGuests, tableID, restaurantID, userID }'
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

/**
 * @swagger
 *
 * /reservation/{reservationID}:
 *   delete:
 *     description: Deletes a reservation on the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reservationID
 *         description: Primary Key of reservation database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns success message for deleting reservation on the database
 */
router.delete('/:reservationID', async (req, res) => {
  const { reservationID } = req.params;

  if (!reservationID) {
    res.status(400).json({ error: 'DELETE reservation/{id} invocation error: {id} must be an int' });
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

/**
 * @swagger
 *
 * /reservation/available:
 *   post:
 *     description: Get a list of tables that are free for booking
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: numberOfGuests
 *         description: The number of guests that the table is being booked for
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: time
 *         description: The start time of the booking
 *         in: formData
 *         required: true
 *         type: string
 *       - name: date
 *         description: Date for when the booking is made
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *        200:
 *         description: Returns the list of table ID's that are free for that restaurant
 */
router.post('/available', async (req, res) => {
  const { date, time, numberOfGuests, restaurantID } = req.body;

  if (!date || !time || !numberOfGuests || !restaurantID) {
    res.status(400).json({
      error:
        'reservation/available GET endpoint needs: date, time, numberOfGuests and restaurantID body params'
    });
    return;
  }

  const { error, result } = await connection.asyncQuery(
    'SELECT t.ID ' +
    'FROM restaurant_db.TABLE t ' +
    'WHERE t.RestaurantID = ? AND t.maxGuests >= ? AND t.minGuests <= ? AND NOT EXISTS ( SELECT * ' +
                                                                        'FROM RESERVATION r ' +
                                                                        'WHERE t.RestaurantID = r.RestaurantID AND ' +
                                                                        't.ID = r.TableID AND ' +
                                                                        'r.Date = ? AND ' +
                                                                        'r.Time = ? );',
    [restaurantID, numberOfGuests, numberOfGuests, date, time]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }
  res.json({ result });
});


export default router;
