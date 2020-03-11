const express = require('express');
const router = express.Router();

// To call from Chrome use:
// fail example: http://localhost:3001/exampleEndpoint
// fail example: http://localhost:3001/exampleEndpoint?id=12
router.get('/', function (req, res) {
    const input = req.query;

    if (!input.id) {
        // Return error results
        res.status(400).json({ error: 'Need an id input' });
        return
    }

    const returnObject = {
        numberOfTables: 5,
        openingTime: "10am",
        closeTime: "5pm"
    };

    // Return sucess results
    res.json(returnObject);
});

module.exports = router;