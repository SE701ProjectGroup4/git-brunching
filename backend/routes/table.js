import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /table/free:
 *   get:
 *     description: Get a list of of hours where there is a table free for a restaurent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: query
 *         required: true
 *         type: string
 *       - name: numberOfGuests
 *         description: The number of guests that the table is being booked for
 *         in: query
 *         required: true
 *         type: integer
 *       - name: date
 *         description: Date for when the booking is made
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *        200:
 *         description: Returns the list of times that the restaurent has a table free
 */
router.get('/free', async (req, res) => {
  const { date, numberOfGuests, restaurantID } = req.query;
  // Extracting day of the week from date
  const reservationDate = new Date(date);
  const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayOfWeekIndex = reservationDate.getDay();
  const day = dayNames[dayOfWeekIndex];


  // Getting opening hours for the restaurant for that day
  const { error: queryError, result: restaurentHours } = await connection.asyncQuery(
    'SELECT OpenTime, CloseTime from HOURS WHERE RestaurantID = ? AND DayOfWeek = ?', [restaurantID, day]
  );

  if (queryError) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  if (!restaurentHours[0]) {
    res.status(404).json({ error: 'The restaurent is not open on this day' });
    return;
  }

  // Getting opening time and closing time
  const tempOpeningTime = restaurentHours[0].OpenTime.split(':');
  const openingTime = tempOpeningTime[0];
  const tempClosingTime = restaurentHours[0].CloseTime.split(':');
  const closingTime = tempClosingTime[0];
  const availableHours = [];

  for (let i = openingTime; i < closingTime; i += 1) {
    // Checking if a table is free for all the opening hours
    const { error: tableQueryError, result: tableIDs } = await connection.asyncQuery(
      'SELECT t.ID ' +
        'FROM restaurant_db.TABLE t ' +
        'WHERE t.RestaurantID = ? AND t.maxGuests >= ? AND t.minGuests <= ? AND NOT EXISTS ( SELECT * ' +
                                                                            'FROM RESERVATION r ' +
                                                                            'WHERE t.RestaurantID = r.RestaurantID AND ' +
                                                                            't.ID = r.TableID AND ' +
                                                                            'r.Date = ? AND ' +
                                                                            'r.Time = ? );',
      [restaurantID, numberOfGuests, numberOfGuests, date, openingTime]
    );

    if (tableQueryError) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }


    // Setting that tables are available for that hour
    if (tableIDs[0]) {
      availableHours.push(`${i}`);
    }
  }
  res.json({ availableHours });
});

export default router;
