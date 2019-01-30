const express = require('express');

const cors = require('cors');

const websites = require('../routes/websites');
const pages = require('../routes/pages');
const users = require('../routes/users');

const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //res.header("Access-Control-Expose-Headers", "X-Auth-Token");
    next();
  });
  app.use(cors());
  app.use(express.json());
  app.use('/api/websites', websites);
  app.use('/api/pages', pages);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}