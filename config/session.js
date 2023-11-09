var expressSession = require("express-session");
var mySqlStore = require("express-mysql-session");

function createSessionStore() {
    const MySQLStore = mySqlStore(expressSession);
  
    const store = new MySQLStore({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "SQL$$gns36236",
        database: "class",
    });
  
    return store;
}

function createSessionConfig() {
    return {
      secret: 'super-secret',
      resave: false,
      saveUninitialized: false,
      store: createSessionStore(),
      cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000
      }
    };
}

module.exports = createSessionConfig;

  


  