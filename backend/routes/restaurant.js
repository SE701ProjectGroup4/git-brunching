import express from 'express';

require('dotenv').config()

const bodyParser = require('body-parser');
const connection = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    const input = req.query;

    if (!input.restaurantID) {
        res.status(400).json({ error: '/restaurant endpoint needs an restaurantID query param' });
        return;
    }

    connection.query(
        "SELECT * FROM `RESTAURANT` WHERE ID = " + req.query.restaurantID,
        function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});

router.get('/status', (req, res) => res.send('Working!'));

export default router;