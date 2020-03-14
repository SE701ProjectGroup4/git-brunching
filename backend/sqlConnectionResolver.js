import mysql from 'mysql';
import config from './config/config';
import mocksql from './tests/mockSQL';

let sqlConnection;
if (config.mock) {
  sqlConnection = mocksql;
} else {
  sqlConnection = mysql;
}

export default sqlConnection;
