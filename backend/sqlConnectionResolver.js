import mysql from 'mysql';
import config from './config/config';
import mocksql from './tests/mockSQL';

// eslint-disable-next-line import/no-mutable-exports
let sqlConnection;
if (config.mock) {
  sqlConnection = mocksql;
} else {
  sqlConnection = mysql;
}

export default sqlConnection;
