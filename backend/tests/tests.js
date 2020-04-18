import config from '../config';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GH_ACTIONS && !config.mock) {
  throw '\n\n   Tests should only be run on the mock database. Please set the mock flag in the config to true.\n \
  If you know what you are doing and wish to run this on a real database, remove this check.\n\n';
}

// MUST BE FIRST
require('./setup');

// List all tests to be run.
// require('./reservation/getAllForRestaurant'); // Using IDs 1-5

// MUST BE LAST TO CLOSE THE DATABASE CONNECTION
require('./cleanup');
