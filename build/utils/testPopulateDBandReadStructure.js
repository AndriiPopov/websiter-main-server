"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pure = exports.getDBStructure = exports.populateTestDB = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = require("../models/user");

var _website = require("../models/website");

var _page = require("../models/page");

var populateTestDB =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(settings) {
    var tokens, userCount, user, salt, websiteCount, website, path, pageCount, publishedVersion, page;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokens = [];
            userCount = 0;

          case 2:
            if (!(userCount <= settings.users)) {
              _context.next = 62;
              break;
            }

            user = new _user.User({
              email: "myemail_".concat(userCount, "@domain").concat(userCount, ".com"),
              password: "12345_".concat(userCount),
              currentAction: 10
            });
            _context.next = 6;
            return _bcryptjs["default"].genSalt(10);

          case 6:
            salt = _context.sent;
            _context.next = 9;
            return _bcryptjs["default"].hash(user.password, salt);

          case 9:
            user.password = _context.sent;

            if (!(userCount !== settings.users)) {
              _context.next = 56;
              break;
            }

            websiteCount = 0;

          case 12:
            if (!(websiteCount <= settings.websites)) {
              _context.next = 56;
              break;
            }

            website = new _website.Website({
              title: "User_".concat(userCount, " Website ").concat(websiteCount),
              header: {
                content: "User_".concat(userCount, " Website ").concat(websiteCount, "_header")
              },
              footer: {
                content: "User_".concat(userCount, " Website ").concat(websiteCount, "_footer")
              },
              domain: "User_".concat(userCount, " Website ").concat(websiteCount, "_domain"),
              bufferElements: [{
                element_1: "User_".concat(userCount, " Website ").concat(websiteCount, "_bufferElement_1")
              }, {
                element_2: "User_".concat(userCount, " Website ").concat(websiteCount, "_bufferElement_2")
              }]
            });

            if (!(websiteCount !== settings.websites)) {
              _context.next = 48;
              break;
            }

            path = [];
            pageCount = 0;

          case 17:
            if (!(pageCount < settings.pages)) {
              _context.next = 48;
              break;
            }

            publishedVersion = {};

            if (pageCount % 2 == 1) {
              publishedVersion = {
                content: {
                  key_1: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_value_1_key_1"),
                  key_2: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_value_2_key_2")
                }
              };
            } else {
              publishedVersion = {
                content: {
                  key_1: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_value_1_key_1_old"),
                  key_2: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_value_2_key_2_old")
                }
              };
            }

            page = new _page.Page({
              website: website,
              content: {
                key_1: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_value_1_key_1"),
                key_2: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_value_2_key_2")
              },
              publishedVersion: publishedVersion
            });
            _context.next = 23;
            return page.save();

          case 23:
            website.pagesStructure.push((0, _defineProperty2["default"])({
              id: page._id,
              path: path,
              name: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_name"),
              url: "User_".concat(userCount, "_Website_").concat(websiteCount, "_Page_").concat(pageCount, "_url"),
              isHidden: false,
              title: "User_".concat(userCount, " Website ").concat(websiteCount, "_Page_").concat(pageCount, "_title"),
              description: "User_".concat(userCount, "_Website ").concat(websiteCount, "_Page_").concat(pageCount, "_description"),
              isHomePage: pageCount === 0 ? true : false,
              isNotPublished: pageCount % 2 == 1 ? false : true
            }, "isHidden", false));
            _context.next = 26;
            return website.save();

          case 26:
            website = _context.sent;
            _context.t0 = parseInt(pageCount);
            _context.next = _context.t0 === 0 ? 30 : _context.t0 === 1 ? 32 : _context.t0 === 2 ? 34 : _context.t0 === 5 ? 36 : _context.t0 === 6 ? 38 : _context.t0 === 8 ? 40 : _context.t0 === 10 ? 42 : 44;
            break;

          case 30:
            path.push(page._id);
            return _context.abrupt("break", 44);

          case 32:
            path.push(page._id);
            return _context.abrupt("break", 44);

          case 34:
            path.push(page._id);
            return _context.abrupt("break", 44);

          case 36:
            path.pop();
            return _context.abrupt("break", 44);

          case 38:
            path.push(page._id);
            return _context.abrupt("break", 44);

          case 40:
            path.pop();
            return _context.abrupt("break", 44);

          case 42:
            path.length = 0;
            return _context.abrupt("break", 44);

          case 44:
            if (settings.currentPage || settings.currentPage === 0) {
              if (settings.currentPage === parseInt(pageCount)) {
                website.currentPage = page;
              }
            } else {
              website.currentPage = page;
            }

          case 45:
            pageCount++;
            _context.next = 17;
            break;

          case 48:
            _context.next = 50;
            return website.save();

          case 50:
            website = _context.sent;
            user.websites.push(website._id);

            if (settings.currentWebsite || settings.currentWebsite === 0) {
              if (settings.currentWebsite === parseInt(websiteCount)) {
                user.currentWebsite = website;
              }
            } else {
              user.currentWebsite = website;
            }

          case 53:
            websiteCount++;
            _context.next = 12;
            break;

          case 56:
            _context.next = 58;
            return user.save();

          case 58:
            tokens.push(user.generateAuthToken());

          case 59:
            userCount++;
            _context.next = 2;
            break;

          case 62:
            return _context.abrupt("return", tokens);

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function populateTestDB(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.populateTestDB = populateTestDB;

var getDBStructure =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user.User.find({});

          case 2:
            users = _context4.sent;
            _context4.next = 5;
            return Promise.all(users.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(user) {
                var websites;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        websites = user.websites;
                        _context3.next = 3;
                        return Promise.all(websites.map(
                        /*#__PURE__*/
                        function () {
                          var _ref4 = (0, _asyncToGenerator2["default"])(
                          /*#__PURE__*/
                          _regenerator["default"].mark(function _callee2(website) {
                            var websiteObject, pagesStructure, pages;
                            return _regenerator["default"].wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _context2.next = 2;
                                    return _website.Website.findById(website);

                                  case 2:
                                    websiteObject = _context2.sent;
                                    pagesStructure = websiteObject.pagesStructure;
                                    pages = pagesStructure.map(function (page) {
                                      return page.id;
                                    });
                                    return _context2.abrupt("return", {
                                      _id: website,
                                      pages: pages
                                    });

                                  case 6:
                                  case "end":
                                    return _context2.stop();
                                }
                              }
                            }, _callee2);
                          }));

                          return function (_x3) {
                            return _ref4.apply(this, arguments);
                          };
                        }()));

                      case 3:
                        websites = _context3.sent;
                        return _context3.abrupt("return", {
                          _id: user._id,
                          websites: websites
                        });

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 5:
            users = _context4.sent;
            return _context4.abrupt("return", users);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getDBStructure() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDBStructure = getDBStructure;

var pure = function pure(a) {
  return JSON.parse(JSON.stringify(a));
};

exports.pure = pure;
//# sourceMappingURL=testPopulateDBandReadStructure.js.map