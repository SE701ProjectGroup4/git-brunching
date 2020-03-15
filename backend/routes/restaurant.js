import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /restaurant:
 *   get:
 *     description: Fetch a restaurant object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: Returns restaurant object
 */
router.get('/', (req, res) => {
  const input = req.query;

  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant GET endpoint needs a restaurantID query param' });
    return;
  }

  connection.query('SELECT * FROM RESTAURANT WHERE ID = ? ', [req.query.restaurantID], (error, results) => {
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
 *     description: Adds a restaurant object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of Restaurant database table
 *         in: query
 *         required: true
 *         type: int
 *       - name: name
 *         description: Name of restaurant
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully added restaurant to database
 */
router.post('/', (req, res) => {
  const { body } = req;

  if (!body.restaurantID || !body.name) {
    res.status(400).json({ error: '/restaurant POST endpoint needs a restaurantID and name body param' });
    return;
  }

  connection.query('INSERT INTO RESTAURANT VALUES (?, ?);', [body.restaurantID, body.name], error => {
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
 *         in: query
 *         required: true
 *         type: int
 *     responses:
 *       200:
 *         description: Successfully deleted restaurant to database
 */
router.delete('/', (req, res) => {
  const input = req.query;

  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant DELETE endpoint needs a restaurantID' });
    return;
  }

  connection.query('DELETE FROM RESTAURANT WHERE ID=?;', [input.restaurantID], error => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('deleted');
  });
});

export default router;
