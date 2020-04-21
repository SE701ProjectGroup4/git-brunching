import express from 'express';
import bodyParser from 'body-parser';
import connection from '../database';
import config from '../config';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /user:
 *   post:
 *     tags: [User]
 *     description: Adds a user object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: User's given name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: User's surname
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: User's telephone number
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email address
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully added user to database
 */
router.post('/', async (req, res) => {
  const { body } = req;

  if (!body.firstName || !body.lastName || !body.phone || !body.email) {
    res.status(400).json({ error: '/user POST endpoint needs firstName, lastName, phone, and email body params' });
    return;
  }

  const {
    error,
    result
  } = await connection.asyncQuery('INSERT INTO USER(FirstName, LastName, Phone, Email) VALUES (?, ?, ?, ?);', [
    body.firstName,
    body.lastName,
    body.phone,
    body.email
  ]);

  if (error) {
    res.status(400).json({ error });
    return;
  }

  const userID = result.insertId;
  res.json({ result: 'Added user', userID });
});

/**
 * @swagger
 *
 * /user/{userID}:
 *   get:
 *     tags: [User]
 *     description: Get a list of tables that are free for booking
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userID
 *         description: Primary Key of User database table
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *        200:
 *         description: Returns the user that is associated with that ID
 */
router.get('/:userID', async (req, res) => {
  const { userID } = req.params;

  if (!userID) {
    res.status(400).json({ error: '/user GET endpoint needs userID in path params' });
    return;
  }

  const { error, result } = await connection.asyncQuery('SELECT * FROM USER WHERE ID = ? ', [userID]);

  if (error) {
    res.status(400).json({ error });
    return;
  }

  res.json({ result });
});

/**
 * @swagger
 *
 * /user:
 *   put:
 *     tags: [User]
 *     description: |
 *      Update a user in the database, identified by the booking that user has made.
 *      At least one parameter out of firstName, lastName, phone, or email must be entered.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: User's new given name
 *         in: formData
 *         required: false
 *         type: string
 *       - name: lastName
 *         description: User's new surname
 *         in: formData
 *         required: false
 *         type: string
 *       - name: phone
 *         description: User's new telephone number
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: User's new email address
 *         in: formData
 *         required: false
 *         type: string
 *       - name: reservationID
 *         description: ID of the reservation that the user has made. Primary key of reservation database table
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully updated user in database
 */
router.put('/', async (req, res) => {
  const { body } = req;

  if (!body.reservationID || (!body.firstName && !body.lastName && !body.phone && !body.email)) {
    res
      .status(400)
      .json({ error: '/user PUT endpoint needs firstName, lastName, phone, OR email, AND reservationID body params' });
    return;
  }

  const {
    error,
    result
  } = await connection.asyncQuery(
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
  if (config.mock) {
    newFirstName = 'test';
    newLastName = 'user';
    newPhone = '091234567';
    newEmail = 'testuser@email.com';
  } else {
    newFirstName = body.firstName || result[0].FirstName;
    newLastName = body.lastName || result[0].LastName;
    newPhone = body.phone || result[0].Phone;
    newEmail = body.email || result[0].Email;
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
