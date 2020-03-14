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
}

export default new MockSQL();
