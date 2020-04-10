"use strict";

const jwt = require('jsonwebtoken');

const {
  User
} = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    if (req.query.tryWebsiter) {
      res.status(412).send('Error.');
      return;
    }

    const token = req.header('x-auth-token');
    if (!token) return res.status(412).send('Access denied. No token provided.');
    await jwt.verify(token, process.env.jwtPrivateKey, async (err, decoded) => {
      if (err) {
        return res.status(412).send('logout');
      } else {
        req.user = await User.findById(decoded._id);

        if (!req.user) {
          return res.status(412).send('logout');
        } else {
          if (decoded.issued < req.user.logoutAllDate) {
            req.user = null;
            return res.status(412).send('logout');
          }

          next();
          return;
        }
      }
    });
  } catch (ex) {
    return res.status(412).send('Error.');
  }
};