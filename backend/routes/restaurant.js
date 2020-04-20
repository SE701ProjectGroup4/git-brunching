import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /restaurant/{restaurantID}:
 *   get:
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
    'SELECT DayOfWeek, OpenTime, CloseTime from HOURS WHERE RestaurantID = ?;', [restaurantID],
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

  if (limit) { // By default returns all results if none supplied.
    if (limit < 0) {
      res.status(400).json({ error: 'Limit value must be at least 0 or omitted.' });
      return;
    }
    sql += ' LIMIT ?';
    sqlParams.push(limit * 1);
    if (batch) { // By default returns first batch.
      if (batch < 0) {
        res.status(400).json({ error: 'Batch value must be at least 0 or omitted.' });
        return;
      }
      sql += ' OFFSET ?';
      sqlParams.push(batch * limit);
    }
  }

  connection.query(
    sql, sqlParams,
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
 * /restaurant/search/{restaurantName}:
 *   get:
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
    console.log(restaurantName);
    if (!restaurantName) {
        res.status(400).json({ error: 'GET /restaurant/{restaurantName} invocation error: {restaurantName} must be an string' });
        return;
    }
    else {
        connection.query(
            'SELECT * FROM RESTAURANT WHERE NAME LIKE ?', '%' + restaurantName + '%',
            (error, results) => {
                if (error) {
                    res.status(400).json({ error });
                    return;
                }
                res.json(results);
            }
        );
    }
});

/**
 * @swagger
 *
 * /restaurant:
 *   post:
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

  connection.query('INSERT INTO RESTAURANT (`Name`, `OwnerId`) VALUES (?, ?);', [body.name, body.ownerId], error => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('added');
  });
});

/**
 * @swagger
 *
 * /restaurant/{restaurantID}:
 *   delete:
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

  connection.query('DELETE FROM RESTAURANT WHERE ID=?;', [restaurantID], error => {
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
    'SELECT MIN(MinGuests) as minimum, MAX(MaxGuests) as maximum FROM restaurant_db.table as t WHERE t.RestaurantID = ?;',
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
