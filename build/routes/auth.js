"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _page = require("../models/page");

var _website = require("../models/website");

var _user = require("../models/user");

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

router.post('/',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var _validateUser, error, user, validPassword, websites, website, pagesObjects, token;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _validateUser = (0, _user.validateUser)(req.body), error = _validateUser.error;

            if (!error) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context3.next = 5;
            return _user.User.findOne({
              email: req.body.email
            });

          case 5:
            user = _context3.sent;

            if (user) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(400).send('Invalid email or password.'));

          case 8:
            _context3.next = 10;
            return _bcryptjs["default"].compare(req.body.password, user.password);

          case 10:
            validPassword = _context3.sent;

            if (validPassword) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.status(400).send('Invalid email or password.'));

          case 13:
            _context3.next = 15;
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

          case 15:
            websites = _context3.sent;

            if (!user.currentWebsite) {
              _context3.next = 20;
              break;
            }

            _context3.next = 19;
            return _website.Website.findById(user.currentWebsite);

          case 19:
            website = _context3.sent;

          case 20:
            if (!(!website && user.websites.length > 0)) {
              _context3.next = 26;
              break;
            }

            _context3.next = 23;
            return _website.Website.findById(user.websites[0]);

          case 23:
            website = _context3.sent;
            user.currentWebsite = website;
            user.save();

          case 26:
            pagesObjects = {};

            if (!website) {
              _context3.next = 32;
              break;
            }

            _context3.next = 30;
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

          case 30:
            _context3.next = 33;
            break;

          case 32:
            website = {};

          case 33:
            token = user.generateAuthToken();
            res.set({
              'X-Auth-Token': token
            }).send((0, _objectSpread2["default"])({}, _lodash["default"].pick(user, ['_id', 'email']), {
              token: token,
              websites: websites,
              website: website,
              pagesObjects: pagesObjects,
              currentAction: user.currentAction
            }));

          case 35:
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
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map