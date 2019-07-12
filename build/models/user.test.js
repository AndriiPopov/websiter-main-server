"use strict";

var _require = require('./user'),
    User = _require.User;

var jwt = require('jsonwebtoken');

var config = require('config');

var mongoose = require('mongoose');

describe('user.generateAuthToken', function () {
  it('should return a valid JWT', function () {
    var payload = {
      _id: new mongoose.Types.ObjectId().toHexString()
    };
    var user = new User(payload);
    var token = user.generateAuthToken();
    var decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});
//# sourceMappingURL=user.test.js.map