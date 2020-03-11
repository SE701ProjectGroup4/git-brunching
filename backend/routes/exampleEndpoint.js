// const express = require('express');
import express from 'express';

const router = express.Router();

// Example of using base path. Used to get something from the database.
// To call from Chrome use:
// fail example: http://localhost:3001/exampleEndpoint
// fail example: http://localhost:3001/exampleEndpoint?id=12
router.get('/', (req, res) => {
  const input = req.query;

  if (!input.id) {
    // Return error results
    res.status(400).json({ error: '/exampleEndpoint endpoint. Needs an id input' });
    return;
  }

  const returnObject = {
    id: input.id,
    numberOfTables: 1,
    openingTime: '10am',
    closeTime: '5pm',
  };

  // Return sucess results
  res.json(returnObject);
});

// Example of using an explicit path. Used to get something from the database.
// To call from Chrome use:
// fail example: http://localhost:3001/exampleEndpoint/extraPath
// fail example: http://localhost:3001/exampleEndpoint/extraPath?id=12
router.get('/extraPath', (req, res) => {
  const input = req.query;

  if (!input.id) {
    // Return error results
    res.status(400).json({ error: '/exampleEndpoint/extraPath endpoint. Needs an id input' });
    return;
  }

  const returnObject = {
    id: input.id,
    numberOfTables: 2,
    openingTime: '2am',
    closeTime: '2pm',
  };

  // Return sucess results
  res.json(returnObject);
});

// Example of patch request. Used to update an existing item on the database
// To call use Postman (or something similar) with PACTH: localhost:3001/exampleEndpoint
router.patch('/', (req, res) => {
  const input = req.query || {};
  const { id } = input;

  const returnObject = { response: `Sucessfully updated ${id} on the database` };
  res.json(returnObject);
});

export default router;
