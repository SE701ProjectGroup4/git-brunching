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
    var reservationDate = new Date(date);
    var dayNames = ['mon','tue','wed','thu','fri','sat','sun'];
    var dayOfWeekIndex = reservationDate.getDay();
    var day = dayNames[dayOfWeekIndex];
    console.log(day, restaurantID)

    
    // Getting opening hours for the restaurant for that day 
    const { error: queryError, result: restaurentHours } = await connection.asyncQuery(
      'SELECT OpenTime, CloseTime from HOURS WHERE RestaurantID = ? AND DayOfWeek = ?', [restaurantID, day]
    );

    if (queryError) {
      res.status(500).json({ error });
      return;
    }
    
    if (!restaurentHours[0]) {
      res.status(404).json({ error: "The restaurent is not open on this day" });
      return;
    }

    // Getting opening time and closing time
    var tempOpeningTime = restaurentHours[0].OpenTime.split(':');
    var openingTime =  tempOpeningTime[0];
    var tempClosingTime = restaurentHours[0].CloseTime.split(':');
    var closingTime = tempClosingTime[0];
    var availableHours = [];

    for (var i = openingTime; i < closingTime; i++){
      // Checking if a table is free for all the opening hours
      const { error: queryError, result: tableIDs } = await connection.asyncQuery(
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

      if (queryError) {
        res.status(400).json({ error });
        return;
      }

      
      // Setting that tables are available for that hour
      if (tableIDs[0]){
        availableHours.push(`${i}`);
      }
      
      }
  !
    res.json({availableHours});
  
  
  });

  export default router;