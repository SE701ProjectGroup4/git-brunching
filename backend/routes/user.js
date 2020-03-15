import express from 'express';
import bodyParser from 'body-parser';
import connection from '../database';

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

  if (!body.reservationID || !body.firstName || !body.lastName || !body.phone || !body.email) {
    res
      .status(400)
      .json({ error: '/user PUT endpoint needs firstName, lastName, phone, email, and reservationID body params' });
    return;
  }

  const { error } = await connection.asyncQuery(
    `UPDATE USER, RESERVATION SET USER.FirstName = ?, USER.LastName = ?, USER.Phone = ?, USER.Email = ? 
                      WHERE RESERVATION.UserID = USER.ID AND RESERVATION.ID = ?`,
    [body.firstName, body.lastName, body.phone, body.email, body.reservationID]
  );

  if (error) {
    res.status(400).json({ error });
    return;
  }

  res.json({ result: 'Updated user' });
});

export default router;
