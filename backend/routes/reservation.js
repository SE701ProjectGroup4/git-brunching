import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// Retrieve a single reservation for a user to check their reservation.
router.get('/single', (req, res) => {
  const { reservationID } = req.query;

  if (!reservationID) {
    res.status(400).json({ error: 'reservation/single GET endpoint needs a reservationID query param' });
    return;
  }

  connection.query(
    `SELECT ` +
      `ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION ` +
      `WHERE ID = ? `,
    [reservationID],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json({ result: results });
    }
  );
});

// Retrieve all reservation from a single restaurant. Used by restaurant manager to see all reservations.
router.get('/all', (req, res) => {
  const { restaurantID } = req.query;

  if (!restaurantID) {
    res.status(400).json({ error: 'reservation/all GET endpoint needs a restaurantID query param' });
    return;
  }

  connection.query(
    `SELECT ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION WHERE RestaurantID = ?;`,
    [restaurantID],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json({ result: results });
    }
  );
});

// Add a new reservation when a user wants to book a table.
router.post('/single', (req, res) => {
  // Generate a random number capped at 2147483647 as this is the largest number the database can hold.
  const reservationID = Math.floor(Math.random() * 2147483647);
  const { date, time, notes, numberOfGuests, tableID, restaurantID, userID } = req.body;

  if (!date || !time || !numberOfGuests || !tableID || !restaurantID || !userID) {
    res.status(400).json({
      error:
        'reservation/single POST endpoint needs: date, time, numberOfGuests, tableID, restaurantID and userID body params',
    });
    return;
  }

  connection.query(
    `INSERT INTO RESERVATION (ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID) ` +
      `VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [reservationID, date, time, notes, numberOfGuests, tableID, restaurantID, userID],
    error => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json({ result: 'Added single reservation', reservationID });
    }
  );
});

// Delete a reservation when a customer want to cancel a booking.
router.delete('/single', (req, res) => {
  const { reservationID } = req.query;

  if (!reservationID) {
    res.status(400).json({ error: 'reservation/single DELETE endpoint needs a reservationID query param' });
    return;
  }

  connection.query(`DELETE FROM RESTAURANT WHERE ID=?;`, [reservationID], error => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json({ result: 'Deleted reservation' });
  });
});

export default router;
