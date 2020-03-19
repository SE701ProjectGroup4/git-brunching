import dotenv from 'dotenv';
import mysql from 'mysql';
import config from './config/config';

dotenv.config();

const databaseVariables = config.mock ? config.testDatabase : process.env;

const connection = mysql.createConnection({
  host: databaseVariables.DB_HOST,
  user: databaseVariables.DB_USER,
  database: databaseVariables.DB_DATABASE,
  password: databaseVariables.DB_PASS
});

// eslint-disable-next-line arrow-body-style
connection.asyncQuery = (...args) => {
  return new Promise(resolve => {
    connection.query(...args, (error, result) => {
      if (error) {
        resolve({ error });
      } else {
        resolve({ result });
      }
    });
  });
};

connection.connect(err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(`Error connecting: ${err.stack}`);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`Connected as thread id: ${connection.threadId}`);
});

export default connection;
