import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * /menu/{menuId}:
 *   get:
 *     tags: [Menu]
 *     description: Fetch a menu object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menuId
 *         description: Primary Key of menu database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns menu object
 */
router.get('/:menuId', async (req, res) => {
  const { menuId } = req.params;

  if (!menuId) {
    res.status(400).json({ error: 'GET /menuId/{id} invocation error: {id} must be an int' });
    return;
  }
  connection.query('SELECT * FROM MENU WHERE ID = ? ', [menuId], (error, results) => {
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
 * /menu/restaurant/{restaurantId}:
 *   get:
 *     tags: [Menu]
 *     description: Fetch all menu objects for a restaurant
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: restaurantId
 *         description: Primary Key of restaurant database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns menu object
 */
router.get('/restaurant/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  if (!restaurantId) {
    res.status(400).json({ error: 'GET menu/restaurant/{id} invocation error: {id} must be an int' });
    return;
  }
  connection.query('SELECT * FROM MENU WHERE restaurantId = ? ', [restaurantId], (error, results) => {
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
 * /menu:
 *   post:
 *     tags: [Menu]
 *     description: Adds a menu object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Link to the hosted image
 *         in: formData
 *         required: true
 *         type: string
 *       - name: restaurantID
 *         description: ID of the restaurant the menu is for
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: height
 *         description: height of the image
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: width
 *         description: width of the image
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully added menu to database
 */
router.post('/', (req, res) => {
  const { body } = req;

  if (!body.url) {
    res.status(400).json({ error: 'POST menu/ invocation error: post body needs { url }' });
    return;
  }
  if (!body.height) {
    res.status(400).json({ error: 'POST menu/ invocation error: post body needs { height }' });
    return;
  }
  if (!body.width) {
    res.status(400).json({ error: 'POST menu/ invocation error: post body needs { width }' });
    return;
  }
  if (!body.restaurantID) {
    res.status(400).json({ error: 'POST menu/ invocation error: post body needs { restaurantID }' });
    return;
  }
  connection.query(
    'INSERT INTO MENU (`Link`, `Height`, `Width`, `RestaurantID`) VALUES (?, ?, ?, ?);',
    [body.url, body.height, body.width, body.restaurantID],
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
 * /menu/{menuID}:
 *   delete:
 *     tags: [Menu]
 *     description: Deletes a menu object to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menuID
 *         description: Primary Key of menu database table
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted menu to database
 */
router.delete('/:menuID', (req, res) => {
  const { menuID } = req.params;

  if (!menuID) {
    res.status(400).json({ error: 'DELETE /menu/{id} invocation error: {id} must be an int' });
    return;
  }

  connection.query('DELETE FROM MENU WHERE ID=?;', [menuID], (error) => {
    if (error) {
      res.status(400).json({ error });
      return;
    }
    res.json('deleted');
  });
});
export default router;
