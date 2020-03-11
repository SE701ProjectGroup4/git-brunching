const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require('morgan');

// Import endpoints
const exampleEndpoint = require('./routes/exampleEndpoint')


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// For command line logging of server
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));

// Launch backend using port where /api is appended
app.use("/api", router);
app.use("/exampleEndpoint", exampleEndpoint);
app.listen(API_PORT, () => console.log(`LISTENING TO PORT ${API_PORT}`));