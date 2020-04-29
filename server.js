const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const restricted = require('./users/restrictedMiddleware.js');

const registerRouter = require('./register/registerRouter.js');
const loginRouter = require('./login/loginRouter.js');
const logoutRouter = require('./logout/logoutRouter.js');
const usersRouter = require('./users/usersRouter.js');

const server = express();

const sessionConfig = {
    name: 'node-auth-1-project',
    secret: 'thatsupersecretsauce',
    cookie: {
      maxAge: 3600 * 1000,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("./data/dbConfig.js"), // Points to db config which points to knexConfig
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 3600 * 1000
      }
    )
  }

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session(sessionConfig));

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/logout', logoutRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
    res.send('<h1>Node Auth 1 Project</h1>');
});

module.exports = server;