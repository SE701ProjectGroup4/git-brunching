import express from 'express';
import bodyParser from 'body-parser';
import connection from '../database';
import config from '../config/config';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// Add new user to database. Used when adding a new reservation, so that a user can identify themself.
router.post('/', async (req, res) => {
  const { body } = req;

  if (!body.firstName || !body.lastName || !body.phone || !body.email) {
    res.status(400).json({ error: '/user POST endpoint needs firstName, lastName, phone, and email body params' });
    return;
  }

  const { error, result } = await connection.asyncQuery(
    'INSERT INTO USER(FirstName, LastName, Phone, Email) VALUES (?, ?, ?, ?);',
    [body.firstName, body.lastName, body.phone, body.email]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const userID = result.insertId;
  res.json({ result: 'Added user', userID });
});

// Update user in database.
router.put('/', async (req, res) => {
  const { body } = req;

  if (!body.reservationID || (!body.firstName && !body.lastName && !body.phone && !body.email)) {
    res
      .status(400)
      .json({ error: '/user PUT endpoint needs firstName, lastName, phone, OR email, AND reservationID body params' });
    return;
  }

  const { error, result } = await connection.asyncQuery(
    'SELECT * FROM USER JOIN RESERVATION ON USER.ID = RESERVATION.UserID WHERE RESERVATION.ID = ?',
    [body.reservationID]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }

  let newFirstName;
  let newLastName;
  let newPhone;
  let newEmail;

  // For each parameter, check if it has been provided in endpoint, otherwise use previous value.
  // The mock SQL doesn't return a proper result, so a default value is assigned when testing
  if (body.firstName) {
    newFirstName = body.firstName;
  } else if (config.mock) {
    newFirstName = 'test';
  } else {
    newFirstName = result[0].FirstName;
  }

  if (body.lastName) {
    newLastName = body.lastName;
  } else if (config.mock) {
    newLastName = 'user';
  } else {
    newLastName = result[0].LastName;
  }

  if (body.phone) {
    newPhone = body.phone;
  } else if (config.mock) {
    newPhone = '091234567';
  } else {
    newPhone = result[0].Phone;
  }

  if (body.email) {
    newEmail = body.email;
  } else if (config.mock) {
    newEmail = 'testuser@email.com';
  } else {
    newEmail = result[0].Email;
  }

  const { err } = await connection.asyncQuery(
    `UPDATE USER, RESERVATION SET USER.FirstName = ?, USER.LastName = ?, USER.Phone = ?, USER.Email = ? 
                      WHERE RESERVATION.UserID = USER.ID AND RESERVATION.ID = ?`,
    [newFirstName, newLastName, newPhone, newEmail, body.reservationID]
  );

  if (err) {
    res.status(400).json({ err });
    return;
  }

  // The mock SQL doesn't return a proper result, so a default value is assigned when testing
  let userID;
  if (config.mock) {
    userID = '303';
  } else {
    userID = result[0].ID;
  }
  res.json({ result: 'Updated user', userID });
});

export default router;
