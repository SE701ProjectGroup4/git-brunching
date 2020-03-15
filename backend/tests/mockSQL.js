class MockSQL {
  constructor() {
    this.connection = new Connection();
  }

  createConnection = () => {
    return this.connection;
  };
}

class Connection {
  threadId = 'mock connection';

  connect = callback => {
    callback();
  };

  query = (...args) => {
    let callback;
    const query = [];

    args.forEach(arg => {
      if (typeof arg === 'function') {
        callback = arg;
      } else {
        query.push(arg);
      }
    });

    callback(undefined, { query: query[0], args: query[1] });
  };

  asyncQuery = (...args) => {
    return new Promise(resolve => {
      this.query(...args, (error, result) => {
        if (error) {
          resolve({ error });
        } else {
          resolve({ result });
        }
      });
    });
  };
}

export default new MockSQL();
