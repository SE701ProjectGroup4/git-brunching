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
router.delete('/:reviewID', (req, res) => {
  const { reviewID } = req.params;

  if (!reviewID) {
    res.status(400).json({ error: 'DELETE /review/{id} invocation error: {id} must be an int' });
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
