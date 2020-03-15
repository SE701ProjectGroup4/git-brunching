import express from 'express';

require('dotenv').config();

const bodyParser = require('body-parser');
const connection = require('../database');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    const { body } = req;
  
    if (!body.firstName || !body.lastName || !body.phone || !body.email) {
        res.status(400).json({ error: '/user POST endpoint needs firstName, lastName, phone, and email body params' });
         return;
       }
  
    connection.query(`INSERT INTO USER(FirstName, LastName, Phone, Email) VALUES (?, ?, ?, ?);`, [body.firstName, body.lastName, body.phone, body.email], error => {
        if (error) {
          res.status(400).json({ error });
          return;
       }
       res.json('user created');
     });
   });

router.put('/', (req, res) => {
    const { body } = req;
  
    if (!body.reservationID || !body.firstName || !body.lastName || !body.phone || !body.email) {
        res.status(400).json({ error: '/user PUT endpoint needs reservationID, firstName, lastName, phone, and email body params' });
         return;
       }
  
    connection.query(`UPDATE USER, RESERVATION SET USER.FirstName = ?, USER.LastName = ?, USER.Phone = ?, USER.Email = ? 
                      WHERE RESERVATION.UserID = USER.ID AND RESERVATION.ID = ?`, [body.firstName, body.lastName, body.phone, body.email, body.reservationID], error => {
        if (error) {
          res.status(400).json({ error });
          return;
       }
       res.json('user updated');
     });
   });

export default router;