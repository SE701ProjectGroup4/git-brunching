import dotenv from 'dotenv';
import mysql from './sqlConnectionResolver';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS
});

if (!connection.asyncQuery) {
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
}

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
