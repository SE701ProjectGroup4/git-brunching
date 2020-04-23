import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /restaurant/popular:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch most popular (has most bookings made) restaurant objects from the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: Number of restaurants to retrieve
 *         in: query
 *         required: false
 *         type: string
 *       - name: offset
 *         description: Number of restaurants to offset search by
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Returns restaurant objects
 */
router.get('/popular', (req, res) => {
  const { limit, offset } = req.query;

  if (limit < 0) {
    res.status(400).json({ error: 'Limit value must be at least 0 or omitted.' });
    return;
  }

  if (offset < 0) {
    res.status(400).json({ error: 'Offset value must be at least 0 or omitted.' });
    return;
  }

  let queryLimit = limit ? parseInt(limit) : 10;
  let queryOffset = offset ? parseInt(offset) : 0;

  connection.query(
    'SELECT RESTAURANT.* FROM RESTAURANT LEFT JOIN RESERVATION ON RESTAURANT.ID = RESERVATION.RestaurantID AND ' +
      'CURDATE() <= DATE_ADD(RESERVATION.Date, INTERVAL 1 MONTH) GROUP BY RESTAURANT.ID ' +
      'ORDER BY SUM(RESERVATION.NumberOfGuests) DESC, RESTAURANT.Name DESC LIMIT ? OFFSET ?',
    [queryLimit, queryOffset],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

/**
 * @swagger
 *
 * /restaurant/open:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch the restaurant objects of restuarants which are open from the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: Number of restaurants to retrieve
 *         in: query
 *         required: false
 *         type: string
 *       - name: offset
 *         description: Number of restaurants to offset search by
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Returns restaurant objects
 */
router.get('/open', (req, res) => {
  const { limit, offset } = req.query;

  if (limit < 0) {
    res.status(400).json({ error: 'Limit value must be at least 0 or omitted.' });
    return;
  }

  if (offset < 0) {
    res.status(400).json({ error: 'Offset value must be at least 0 or omitted.' });
    return;
  }

  let queryLimit = limit ? parseInt(limit) : 10;
  let queryOffset = offset ? parseInt(offset) : 0;

  connection.query(
    'SELECT RESTAURANT.* FROM RESTAURANT INNER JOIN HOURS ON RESTAURANT.ID = HOURS.RestaurantID AND ' +
      'HOURS.DayOfWeek = LEFT(DAYNAME(CURDATE()), 3) AND CURTIME() BETWEEN HOURS.OpenTime AND ' +
      'HOURS.CloseTime LIMIT ? OFFSET ?',
    [queryLimit, queryOffset],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

/**
 * @swagger
 *
 * /restaurant/new:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch restaurant objects of restaurants created in the last month from the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: Number of restaurants to retrieve
 *         in: query
 *         required: false
 *         type: string
 *       - name: offset
 *         description: Number of restaurants to offset search by
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Returns restaurant objects
 */
router.get('/new', (req, res) => {
  const { limit, offset } = req.query;

  if (limit < 0) {
    res.status(400).json({ error: 'Limit value must be at least 0 or omitted.' });
    return;
  }

  if (offset < 0) {
    res.status(400).json({ error: 'Offset value must be at least 0 or omitted.' });
    return;
  }

  let queryLimit = limit ? parseInt(limit) : 10;
  let queryOffset = offset ? parseInt(offset) : 0;

  connection.query(
    'SELECT * FROM RESTAURANT WHERE CURDATE() <= DATE_ADD(DateAdded, INTERVAL 1 MONTH) ' +
      'ORDER BY DateAdded DESC, Name ASC LIMIT ? OFFSET ?',
    [queryLimit, queryOffset],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

/**
 * @swagger
 *
 * /restaurant/{restaurantID}:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch a restaurant object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns restaurant object
 */
router.get('/:restaurantID', async (req, res) => {
  const { restaurantID } = req.params;

  if (!restaurantID) {
    res.status(400).json({ error: 'GET /restaurant/{id} invocation error: {id} must be an int' });
    return;
  }

  connection.query('SELECT * FROM RESTAURANT WHERE ID = ? ', [restaurantID], (error, results) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 *
 * /restaurant/{restaurantID}/openhours:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch the opening hours of the restaurent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary key of the restaurant used on the database
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns all restaurant objects
 */
router.get('/:restaurantID/openhours', async (req, res) => {
  const { restaurantID } = req.params;
  if (!restaurantID) {
    res.status(400).json({ error: 'GET /restaurant/{id}/openhours invocation error: {id} must be an int' });
    return;
  }

  connection.query(
    'SELECT DayOfWeek, OpenTime, CloseTime from HOURS WHERE RestaurantID = ?;',
    [restaurantID],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

/**
 * @swagger
 *
 * /restaurant:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch all or a batch of restaurant objects from the database in one API call.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: The maximum number of results to show. By default there is no limit.
 *         in: query
 *         required: false
 *         type: integer
 *       - name: batch
 *         description: An index for batch(es) of results. Only usable when limit is assigned a value. Index starts from 0.
 *         in: query
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns all restaurant objects
 *       400:
 *         description: At least one of the parameters was not supplied correctly.
 */
router.get('/', (req, res) => {
  const { batch, limit } = req.query;

  let sql = 'SELECT * FROM RESTAURANT';
  const sqlParams = [];

  if (batch && !limit) {
    res.status(400).json({ error: 'You must supply a limit query in order to supply a batch query.' });
    return;
  }

  if (limit) {
    // By default returns all results if none supplied.
    if (limit < 0) {
      res.status(400).json({ error: 'Limit value must be at least 0 or omitted.' });
      return;
    }
    sql += ' LIMIT ?';
    sqlParams.push(limit * 1);
    if (batch) {
      // By default returns first batch.
      if (batch < 0) {
        res.status(400).json({ error: 'Batch value must be at least 0 or omitted.' });
        return;
      }
      sql += ' OFFSET ?';
      sqlParams.push(batch * limit);
    }
  }

  connection.query(sql, sqlParams, (error, results) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json(results);
  });
});

/**
 * @swagger
 *
 * /restaurant:
 *   post:
 *     tags: [Restaurant]
 *     description: Adds a restaurant object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of restaurant
 *         in: formData
 *         required: true
 *         type: string
 *       - name: ownerId
 *         description: ID of the restaurant owner
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully added restaurant to database
 */
router.post('/', (req, res) => {
  const { body } = req;

  if (!body.name) {
    res.status(400).json({ error: 'POST restaurant/ invocation error: post body needs { name }' });
    return;
  }

  if (!body.ownerId) {
    res.status(400).json({ error: 'POST restaurant/ invocation error: post body needs { ownerId }' });
    return;
  }

  let image = body.image ? body.image : null;
  let date = new Date();

  connection.query(
    'INSERT INTO RESTAURANT (`Name`, `OwnerId`, `Image`, `DateAdded`) VALUES (?, ?, ?, ?);',
    [body.name, body.ownerId, image, date],
    (error) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json('added');
    }
  );
});

/**
 * @swagger
 *
 * /restaurant/search/{restaurantName}:
 *   get:
 *     tags: [Restaurant]
 *     description: Fetch restaurant objects that contains the search phrase from the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantName
 *         description: Phrase used to search in Name field in the database
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns matching restaurant objects
 */
router.get('/search/:restaurantName', async (req, res) => {
  const { restaurantName } = req.params;
  if (!restaurantName) {
    res
      .status(400)
      .json({ error: 'GET /restaurant/{restaurantName} invocation error: {restaurantName} must be an string' });
    return;
  } else {
    connection.query('SELECT * FROM RESTAURANT WHERE NAME LIKE ?', '%' + restaurantName + '%', (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    });
  }
});

/**
 * @swagger
 *
 * /restaurant/{restaurantID}:
 *   delete:
 *     tags: [Restaurant]
 *     description: Deletes a restaurant object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted restaurant to database
 */
router.delete('/:restaurantID', (req, res) => {
  const { restaurantID } = req.params;

  if (!restaurantID) {
    res.status(400).json({ error: 'DELETE /restaurant/{id} invocation error: {id} must be an int' });
    return;
  }

  connection.query('DELETE FROM RESTAURANT WHERE ID=?;', [restaurantID], (error) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('deleted');
  });
});

/**
 * @swagger
 *
 * /restaurant/{restaurantID}/capacity:
 *   get:
 *     tags: [Restaurant]
 *     description: Get the minimum and maximum guest allowed of a restaurant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns the Minimum MinGuests and Maximum MaxGuests of the tables for a given restaurant
 */
router.get('/:restaurantID/capacity', (req, res) => {
  const { restaurantID } = req.params;

  if (!restaurantID) {
    res.status(400).json({ error: 'GET /restaurant/{id}/openhours invocation error: {id} must be an int' });
    return;
  }

  connection.query(
    'SELECT MIN(MinGuests) as minimum, MAX(MaxGuests) as maximum FROM `TABLE` as t WHERE t.RestaurantID = ?;',
    [restaurantID],
    (error, results) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json(results);
    }
  );
});

export default router;
