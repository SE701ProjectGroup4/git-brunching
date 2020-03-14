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
  connection.query(
    `SELECT ID, Date, Time, Notes, NumberOfGuests, TableID, RestaurantID, UserID FROM RESERVATION;`,
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json({ result: results });
    }
  );
});

export default router;
