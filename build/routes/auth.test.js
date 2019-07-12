"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _index = _interopRequireDefault(require("../index"));

var _supertest = _interopRequireDefault(require("supertest"));

var _user = require("../models/user");

var _website = require("../models/website");

var _page = require("../models/page");

var _testPopulateDBandReadStructure = require("../utils/testPopulateDBandReadStructure");

var server;
describe('/api/auth', function () {
  beforeEach(function () {
    server = _index["default"];
  });
  afterEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server.close();
            _context.next = 3;
            return _page.Page.remove({});

          case 3:
            _context.next = 5;
            return _website.Website.remove({});

          case 5:
            _context.next = 7;
            return _user.User.remove({});

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('POST /', function () {
    it('should respond error 400 if user not found or password is wrong or both',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _supertest["default"])(server).post('/api/auth').send({
                email: 'bbb.bbb@bbb',
                password: '12345'
              });

            case 2:
              res = _context2.sent;
              expect(res.status).toBe(400);
              _context2.next = 6;
              return (0, _supertest["default"])(server).post('/api/auth').send({
                email: 'myemail_0@domain0.com',
                password: '12345'
              });

            case 6:
              res = _context2.sent;
              expect(res.status).toBe(400);
              _context2.next = 10;
              return (0, _supertest["default"])(server).post('/api/auth').send({
                email: 'myemail@domain.com',
                password: '12345_0'
              });

            case 10:
              res = _context2.sent;
              expect(res.status).toBe(400);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should respond with token, email, website, websites, and pageObjects',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var tokens, res, result, structure, user, websites, website, pagesObjects, resNew;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context5.sent;
              _context5.next = 5;
              return (0, _supertest["default"])(server).post('/api/auth').send({
                email: 'myemail_0@domain0.com',
                password: '12345_0'
              });

            case 5:
              res = _context5.sent;
              result = JSON.parse(res.text);
              _context5.next = 9;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 9:
              structure = _context5.sent;
              _context5.next = 12;
              return _user.User.findById(structure[0]._id);

            case 12:
              user = _context5.sent;
              _context5.next = 15;
              return Promise.all(user.websites.map(
              /*#__PURE__*/
              function () {
                var _ref4 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee3(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context3.sent;
                          return _context3.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x) {
                  return _ref4.apply(this, arguments);
                };
              }()));

            case 15:
              websites = _context5.sent;
              _context5.next = 18;
              return _website.Website.findById(user.currentWebsite);

            case 18:
              website = _context5.sent;
              pagesObjects = {};
              _context5.next = 22;
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

                return function (_x2) {
                  return _ref5.apply(this, arguments);
                };
              }()));

            case 22:
              expect(result.email).toEqual(user.email);
              expect(result.websites).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));
              _context5.next = 28;
              return (0, _supertest["default"])(server).get('/api/users').set('X-Auth-Token', result.token);

            case 28:
              resNew = _context5.sent;
              expect(resNew.status).toBe(200);

            case 30:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should respond with email, website, websites, and pagesStructure for empty website',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var tokens, res, result, structure, user, websites, website, resNew;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 3,
                currentPage: 0
              });

            case 2:
              tokens = _context7.sent;
              _context7.next = 5;
              return (0, _supertest["default"])(server).post('/api/auth').send({
                email: 'myemail_0@domain0.com',
                password: '12345_0'
              });

            case 5:
              res = _context7.sent;
              result = JSON.parse(res.text);
              _context7.next = 9;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 9:
              structure = _context7.sent;
              _context7.next = 12;
              return _user.User.findById(structure[0]._id);

            case 12:
              user = _context7.sent;
              _context7.next = 15;
              return Promise.all(user.websites.map(
              /*#__PURE__*/
              function () {
                var _ref7 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee6(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context6.sent;
                          return _context6.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function (_x3) {
                  return _ref7.apply(this, arguments);
                };
              }()));

            case 15:
              websites = _context7.sent;
              _context7.next = 18;
              return _website.Website.findById(user.currentWebsite);

            case 18:
              website = _context7.sent;
              expect(result.email).toEqual(user.email);
              expect(result.websites).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.pagesObjects).toEqual({});
              _context7.next = 25;
              return (0, _supertest["default"])(server).get('/api/users').set('X-Auth-Token', result.token);

            case 25:
              resNew = _context7.sent;
              expect(resNew.status).toBe(200);

            case 27:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should respond with email, website, websites, and pagesStructure for empty user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var tokens, res, result, structure, user, websites, resNew;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 3,
                currentPage: 0
              });

            case 2:
              tokens = _context9.sent;
              _context9.next = 5;
              return (0, _supertest["default"])(server).post('/api/auth').send({
                email: 'myemail_2@domain2.com',
                password: '12345_2'
              });

            case 5:
              res = _context9.sent;
              result = JSON.parse(res.text);
              _context9.next = 9;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 9:
              structure = _context9.sent;
              _context9.next = 12;
              return _user.User.findById(structure[2]._id);

            case 12:
              user = _context9.sent;
              _context9.next = 15;
              return Promise.all(user.websites.map(
              /*#__PURE__*/
              function () {
                var _ref9 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee8(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context8.sent;
                          return _context8.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x4) {
                  return _ref9.apply(this, arguments);
                };
              }()));

            case 15:
              websites = _context9.sent;
              expect(result.email).toEqual(user.email);
              expect(result.websites).toEqual([]);
              expect(result.website).toEqual({});
              expect(result.pagesObjects).toEqual({});
              _context9.next = 22;
              return (0, _supertest["default"])(server).get('/api/users').set('X-Auth-Token', result.token);

            case 22:
              resNew = _context9.sent;
              expect(resNew.status).toBe(200);

            case 24:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
});
//# sourceMappingURL=auth.test.js.map