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
 * /restaurant/{id}/openhours:
 *   get:
 *     description: Fetch a restaurant's open hours
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
 *         description: Returns restaurant open hours
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
 *     description: Fetch a list of all the restaurants name and ID
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successfully fetched all restaurants name and ID
 */
router.get('/', (req, res) => {
  const input = req.query;

  if (JSON.stringify(input) !== '{}') {
    res.status(400).json({ error: '/restaurant GET endpoint needs no query param' });
    return;
  }

  connection.query(
    'SELECT * FROM RESTAURANT',
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

  connection.query('INSERT INTO RESTAURANT (`Name`) VALUES (?);', [body.name], error => {
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
 * /restaurant:
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

export default router;
