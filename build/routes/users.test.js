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

var _testTokenAndCurrentAction = require("../utils/testTokenAndCurrentAction.test");

var server;
describe('/api/users', function () {
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
  describe('GET /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'get', 'users');

            case 2:
              headersAreGood = _context2.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should respond with email, website, websites, and pagesStructure',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var tokens, res, result, structure, user, websites, website, pagesObjects;
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
              return (0, _supertest["default"])(server).get('/api/users').set('Current-Action', '10').set('X-Auth-Token', tokens[1]);

            case 5:
              res = _context5.sent;
              result = JSON.parse(res.text);
              _context5.next = 9;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 9:
              structure = _context5.sent;
              _context5.next = 12;
              return _user.User.findById(structure[1]._id);

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

            case 26:
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
      var tokens, res, result, structure, user, websites, website;
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
              return (0, _supertest["default"])(server).get('/api/users').set('X-Auth-Token', tokens[0]).set('Current-Action', '10');

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

            case 23:
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
      var tokens, res, result, structure, user, websites;
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
              return (0, _supertest["default"])(server).get('/api/users').set('X-Auth-Token', tokens[2]).set('Current-Action', '10');

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

            case 20:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('POST /', function () {
    it('should respond error 400 if not valid data',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10() {
      var res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return (0, _supertest["default"])(server).post('/api/users').send({
                email: 'aaa@aaa.aaa',
                password: '1'
              });

            case 2:
              res = _context10.sent;
              expect(res.status).toBe(400);
              _context10.next = 6;
              return (0, _supertest["default"])(server).post('/api/users').send({
                email: 'aaa@aaa',
                password: '12345'
              });

            case 6:
              res = _context10.sent;
              expect(res.status).toBe(400);

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('should respond with email, website, websites, and pagesStructure for valid email and password and reject user create for the same email address',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13() {
      var tokens, res, result, structure, user, websites, website, pagesObjects;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context13.sent;
              _context13.next = 5;
              return (0, _supertest["default"])(server).post('/api/users').send({
                email: 'aaa@aaa.aaa',
                password: '123456'
              });

            case 5:
              res = _context13.sent;
              result = JSON.parse(res.text);
              _context13.next = 9;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 9:
              structure = _context13.sent;
              _context13.next = 12;
              return _user.User.findById(structure[3]._id);

            case 12:
              user = _context13.sent;
              _context13.next = 15;
              return Promise.all(user.websites.map(
              /*#__PURE__*/
              function () {
                var _ref12 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee11(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context11.sent;
                          return _context11.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x5) {
                  return _ref12.apply(this, arguments);
                };
              }()));

            case 15:
              websites = _context13.sent;
              _context13.next = 18;
              return _website.Website.findById(user.currentWebsite);

            case 18:
              website = _context13.sent;
              pagesObjects = {};
              _context13.next = 22;
              return Promise.all(website.pagesStructure.map(
              /*#__PURE__*/
              function () {
                var _ref13 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee12(item) {
                  return _regenerator["default"].wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          _context12.next = 2;
                          return _page.Page.findById(item.id);

                        case 2:
                          pagesObjects[item.id] = _context12.sent;

                        case 3:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12);
                }));

                return function (_x6) {
                  return _ref13.apply(this, arguments);
                };
              }()));

            case 22:
              expect(res.status).toBe(200);
              expect(result._id).toEqual(user._id.toString());
              expect(result.email).toEqual(user.email);
              expect(result.websites).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));
              _context13.next = 30;
              return (0, _supertest["default"])(server).post('/api/users').send({
                email: 'aaa@aaa.aaa',
                password: '123456'
              });

            case 30:
              res = _context13.sent;
              expect(res.status).toBe(400);

            case 32:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  describe('DELETE /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'delete', 'users');

            case 2:
              headersAreGood = _context14.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should delete user and send status true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15() {
      var tokens, oldStructure, res, newStructure;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context15.sent;
              _context15.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context15.sent;
              _context15.next = 8;
              return (0, _supertest["default"])(server)["delete"]('/api/users').set('Current-Action', '10').set('X-Auth-Token', tokens[1]);

            case 8:
              res = _context15.sent;
              expect(res.status).toBe(200);
              _context15.next = 12;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 12:
              newStructure = _context15.sent;
              expect(oldStructure.length).toBe(3);
              expect(newStructure.length).toBe(2);
              _context15.next = 17;
              return (0, _supertest["default"])(server)["delete"]('/api/users').set('Current-Action', '11').set('X-Auth-Token', tokens[1]);

            case 17:
              res = _context15.sent;
              expect(res.status).toBe(400);

            case 19:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
});
//# sourceMappingURL=users.test.js.map