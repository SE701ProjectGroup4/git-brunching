import express from 'express';
import bodyParser from 'body-parser';

import connection from '../database';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

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
