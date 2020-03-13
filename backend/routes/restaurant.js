import express from 'express';

require('dotenv').config();

const bodyParser = require('body-parser');
const connection = require('../database');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  const input = req.query;

  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant GET endpoint needs a restaurantID query param' });
    return;
  }

  connection.query(
    `SELECT * FROM RESTAURANT WHERE ID = ${req.query.restaurantID}`,
    (error, results) => {
      if (error) throw error;
      res.json(results);
    },
  );
});

router.post('/', (req, res) => {
  const { body } = req;

  if (!body.restaurantID || !body.name) {
    res.status(400).json({ error: '/restaurant POST endpoint needs a restaurantID and name body param' });
    return;
  }

  connection.query(
    'INSERT INTO RESTAURANT '
    + `VALUES (${body.restaurantID}, '${body.name}');`,
    error => {
      if (error) throw error;
      res.json('added');
    },
  );
});

router.delete('/', (req, res) => {
  const input = req.query;

  if (!input.restaurantID) {
    res.status(400).json({ error: '/restaurant DELETE endpoint needs a restaurantID' });
    return;
  }

  connection.query(
    `DELETE FROM RESTAURANT WHERE ID=${input.restaurantID};`,
    error => {
      if (error) throw error;
      res.json('deleted');
    },
  );
});

export default router;
