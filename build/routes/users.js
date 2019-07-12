"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _page = require("../models/page");

var _website = require("../models/website");

var _user = require("../models/user");

var _express = _interopRequireDefault(require("express"));

var _action = _interopRequireDefault(require("../middleware/action"));

var router = _express["default"].Router();

router.get('/', _auth["default"],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var user, websites, website, pagesObjects;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            _context3.next = 3;
            return Promise.all(user.websites.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(id) {
                var website;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _website.Website.findById(id);

                      case 2:
                        website = _context.sent;
                        return _context.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 3:
            websites = _context3.sent;

            if (!user.currentWebsite) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return _website.Website.findById(user.currentWebsite);

          case 7:
            website = _context3.sent;

          case 8:
            if (!(!website && user.websites.length > 0)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 11;
            return _website.Website.findById(user.websites[0]);

          case 11:
            website = _context3.sent;
            user.currentWebsite = website;
            _context3.next = 15;
            return user.save();

          case 15:
            pagesObjects = {};

            if (!website) {
              _context3.next = 21;
              break;
            }

            _context3.next = 19;
            return Promise.all(website.pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(item) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _page.Page.findById(item.id);

                      case 2:
                        pagesObjects[item.id] = _context2.sent;

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 19:
            _context3.next = 22;
            break;

          case 21:
            website = {};

          case 22:
            res.send({
              email: user.email,
              website: website,
              websites: websites,
              pagesObjects: pagesObjects,
              currentAction: user.currentAction
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/',
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var _validateUser, error, user, salt, website, pagesObjects, websites, token;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _validateUser = (0, _user.validateUser)(req.body), error = _validateUser.error;

            if (!error) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context6.next = 5;
            return _user.User.findOne({
              email: req.body.email
            });

          case 5:
            user = _context6.sent;

            if (!user) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(400).send('User already registered.'));

          case 8:
            user = new _user.User({
              email: req.body.email,
              password: req.body.password,
              currentAction: 0
            });
            _context6.next = 11;
            return _bcryptjs["default"].genSalt(10);

          case 11:
            salt = _context6.sent;
            _context6.next = 14;
            return _bcryptjs["default"].hash(user.password, salt);

          case 14:
            user.password = _context6.sent;
            _context6.next = 17;
            return user.createWebsite(user);

          case 17:
            website = _context6.sent;
            pagesObjects = {};
            _context6.next = 21;
            return Promise.all(website.pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(item) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _page.Page.findById(item.id);

                      case 2:
                        pagesObjects[item.id] = _context4.sent;

                      case 3:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x7) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 21:
            user.websites.push(website._id);
            _context6.next = 24;
            return Promise.all(user.websites.map(
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee5(id) {
                var website;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _website.Website.findById(id);

                      case 2:
                        website = _context5.sent;
                        return _context5.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x8) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 24:
            websites = _context6.sent;
            _context6.next = 27;
            return user.save();

          case 27:
            req.user = user;
            token = user.generateAuthToken();
            res.set({
              'X-Auth-Token': token
            }).send((0, _objectSpread2["default"])({}, _lodash["default"].pick(user, ['_id', 'email']), {
              token: token,
              website: website,
              websites: websites,
              pagesObjects: pagesObjects,
              currentAction: user.currentAction
            }));

          case 30:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/', _auth["default"], _action["default"],
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            user = req.user;
            _context8.next = 3;
            return Promise.all(user.websites.map(
            /*#__PURE__*/
            function () {
              var _ref8 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee7(websiteId) {
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return user.deleteWebsite(websiteId, res);

                      case 2:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x11) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 3:
            _context8.next = 5;
            return _user.User.findByIdAndRemove(user._id);

          case 5:
            res.send({
              status: true
            });

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=users.js.map