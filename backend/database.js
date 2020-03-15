import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

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
