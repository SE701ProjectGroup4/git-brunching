import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
<<<<<<< HEAD
<<<<<<< HEAD
 * /reviews/{reviewID}:
=======
 * /restaurant:
>>>>>>> 181f028... added reviews file and get request
=======
 * /reviews:
>>>>>>> fb8e382... added review post method
 *   get:
 *     description: Fetch a review object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reviewID
 *         description: Primary Key of review database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns review object
 */
router.get('/:reviewID', async (req, res) => {
  const { reviewID } = req.params;

  if (!reviewID) {
    res.status(400).json({ error: 'GET /reviewID/{id} invocation error: {id} must be an int' });
    return;
  }

  connection.query('SELECT * FROM REVIEW WHERE ID = ? ', [reviewID], (error, results) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json(results);
  });
});
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * @swagger
 *
 * /reviews/restaurant/{restaurantID}:
=======
/**
 * @swagger
 *
 * /reviews:
>>>>>>> fb8e382... added review post method
 *   get:
 *     description: Fetch a list of review objects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantID
 *         description: Primary Key of restaurant database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns a lsit of review objects for the specified restaurant ID
 */
router.get('/restaurant/:restaurantID', async (req, res) => {
  const { restaurantID } = req.params;
<<<<<<< HEAD

  if (!restaurantID) {
    res.status(400).json({ error: 'GET reviews/restaurant/{id} invocation error: {id} must be an int' });
    return;
  }

=======

  if (!restaurantID) {
    res.status(400).json({ error: 'GET reviews/restaurant/{id} invocation error: {id} must be an int' });
    return;
  }

>>>>>>> fb8e382... added review post method
  connection.query('SELECT * FROM REVIEW WHERE RESTAURANTID = ? ', [restaurantID], (error, results) => {
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
 * /reviews:
 *   post:
 *     description: Adds a reviews object to the database
<<<<<<< HEAD
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of reviewer
 *         in: formData
 *         required: true
 *         type: string
 *       - name: restaurantID
 *         description: ID of the restaurant the review is for
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: review
 *         description: review description
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully added review to database
 */
router.post('/', (req, res) => {
  const { body } = req;

  if (!body.review) {
    res.status(400).json({ error: 'POST reviews/ invocation error: post body needs { review }' });
    return;
  }

  if (!body.name) {
    res.status(400).json({ error: 'POST reviews/ invocation error: post body needs { name }' });
    return;
  }
  if (!body.restaurantID) {
    res.status(400).json({ error: 'POST reviews/ invocation error: post body needs { restaurantID }' });
    return;
  }

  connection.query(
    'INSERT INTO REVIEW (`Review`, `Name`, `RestaurantID`) VALUES (?, ?, ?);',
    [body.review, body.name, body.restaurantID],
    (error) => {
      if (error) {
        res.status(400).json({ error });
        return;
      }
      res.json('added');
    }
  );
});
=======
>>>>>>> 181f028... added reviews file and get request

/**
 * @swagger
 *
<<<<<<< HEAD
 * /reviews:
 *   delete:
 *     description: Deletes a reviews object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reviewID
 *         description: Primary Key of reviews database table
=======
 * /restaurant:
 *   delete:
 *     description: Deletes a restaurant object to the database
=======
>>>>>>> fb8e382... added review post method
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name of reviewer
 *         in: formData
 *         required: true
 *         type: string
 *       - name: restaurantID
<<<<<<< HEAD
 *         description: Primary Key of Restaurant database table
>>>>>>> 181f028... added reviews file and get request
=======
 *         description: ID of the restaurant the review is for
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully added restaurant to database
 */
router.post('/', (req, res) => {
  const { body } = req;

  if (!body.review) {
    res.status(400).json({ error: 'POST reviews/ invocation error: post body needs { review }' });
    return;
  }

  if (!body.name) {
    res.status(400).json({ error: 'POST reviews/ invocation error: post body needs { name }' });
    return;
  }
  if (!body.restaurantID) {
    res.status(400).json({ error: 'POST reviews/ invocation error: post body needs { restaurantID }' });
    return;
  }

  connection.query(
    'INSERT INTO REVIEW (`Review`, `Name`, `RestaurantID`) VALUES (?, ?, ?);',
    [body.review, body.name, body.restaurantID],
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
 * /reviews:
 *   delete:
 *     description: Deletes a reviews object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reviewID
 *         description: Primary Key of reviews database table
>>>>>>> fb8e382... added review post method
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
<<<<<<< HEAD
<<<<<<< HEAD
 *         description: Successfully deleted reviews to database
=======
 *         description: Successfully deleted restaurant to database
>>>>>>> 181f028... added reviews file and get request
=======
 *         description: Successfully deleted reviews to database
>>>>>>> fb8e382... added review post method
 */
router.delete('/:reviewID', (req, res) => {
  const { reviewID } = req.params;

  if (!reviewID) {
<<<<<<< HEAD
    res.status(400).json({ error: 'DELETE /reviews/{id} invocation error: {id} must be an int' });
=======
    res.status(400).json({ error: 'DELETE /review/{id} invocation error: {id} must be an int' });
>>>>>>> 181f028... added reviews file and get request
    return;
  }

  connection.query('DELETE FROM REVIEW WHERE ID=?;', [reviewID], (error) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('deleted');
  });
});

export default router;
