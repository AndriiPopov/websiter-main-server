"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _websites = _interopRequireDefault(require("../routes/websites"));

var _pages = _interopRequireDefault(require("../routes/pages"));

var _users = _interopRequireDefault(require("../routes/users"));

var _live = _interopRequireDefault(require("../routes/live"));

var _auth = _interopRequireDefault(require("../routes/auth"));

var _error = _interopRequireDefault(require("../middleware/error"));

function _default(app) {
  app.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With'); //res.header("Access-Control-Expose-Headers", "X-Auth-Token");

    next();
  });
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '/../client/build')));
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use('/api/websites', _websites["default"]);
  app.use('/api/pages', _pages["default"]);
  app.use('/api/users', _users["default"]);
  app.use('/api/auth', _auth["default"]);
  app.use('/live/*', _live["default"]);
  app.get('*', function (req, res) {
    res.sendFile(_path["default"].join(__dirname + '/../client/build/index.html'));
  });
  app.use(_error["default"]);
}
//# sourceMappingURL=routes.js.map