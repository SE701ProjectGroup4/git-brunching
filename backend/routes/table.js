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
 *     tags: [Table]
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
 *        400:
 *         description: Bad request
 *        500:
 *         description: Internal server error
 */
router.get('/free', async (req, res) => {
  const { date, numberOfGuests, restaurantID } = req.query;

  if (!date || !numberOfGuests || !restaurantID) {
    res.status(400).json({
      error: 'table/free GET endpoint needs: date, numberOfGuests and restaurantID query params'
    });
    return;
  }
  // Extracting day of the week from date
  const reservationDate = new Date(date);
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayOfWeekIndex = reservationDate.getDay();
  const day = dayNames[dayOfWeekIndex];

  // Getting opening hours for the restaurant for that day
  const {
    error: queryError,
    result: restaurentHours
  } = await connection.asyncQuery('SELECT OpenTime, CloseTime from HOURS WHERE RestaurantID = ? AND DayOfWeek = ?', [
    restaurantID,
    day
  ]);

  if (queryError) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  if (!Array.isArray(restaurentHours) || !restaurentHours[0]) {
    res.status(404).json({ error: 'The restaurent is not open on this day' });
    return;
  }

  // Getting opening time and closing time
  const STRING_SPLIT = ':';
  const tempOpeningTime = restaurentHours[0].OpenTime.split(STRING_SPLIT);
  const openingTime = Number(tempOpeningTime[0]);
  const tempClosingTime = restaurentHours[0].CloseTime.split(STRING_SPLIT);
  const closingTime = Number(tempClosingTime[0]);
  const hourQueryPromises = [];
  const availableHours = [];
  const queryErrors = [];

  for (let i = openingTime; i < closingTime; i += 1) {
    // Checking if a table is free for all the opening hours
    const hour = `${i > 10 ? '0' : ''}${i}:00:00`;
    hourQueryPromises.push(
      connection
        .asyncQuery(
          'SELECT t.ID ' +
            'FROM `TABLE` t ' +
            'WHERE t.RestaurantID = ? AND t.maxGuests >= ? AND t.minGuests <= ? AND NOT EXISTS ( SELECT * ' +
            'FROM RESERVATION r ' +
            'WHERE t.RestaurantID = r.RestaurantID AND ' +
            't.ID = r.TableID AND ' +
            'r.Date = ? AND ' +
            'r.Time = ? );',
          [restaurantID, numberOfGuests, numberOfGuests, date, hour]
        )
        .then(({ error, result }) => {
          if (error) {
            queryErrors.push(error);
          } else if (result[0]) {
            // if there is a table available for that hour
            availableHours.push(i);
          }
        })
    );
  }

  await Promise.all(hourQueryPromises);

  if (queryErrors.length) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  res.json({ availableHours });
});

export default router;
