import connection from '../database';

after(() => {
  connection.end();
});
