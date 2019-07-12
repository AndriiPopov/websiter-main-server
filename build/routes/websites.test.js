"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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
describe('/api/websites', function () {
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
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'post', 'websites');

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
    it('should respond with website, websites, and pagesObjects',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var tokens, oldStructure, res, result, structure, user, websites, website, pagesObjects;
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
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context5.sent;
              _context5.next = 8;
              return (0, _supertest["default"])(server).post('/api/websites').set('Current-Action', '10').set('X-Auth-Token', tokens[1]);

            case 8:
              res = _context5.sent;
              result = JSON.parse(res.text);
              _context5.next = 12;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 12:
              structure = _context5.sent;
              _context5.next = 15;
              return _user.User.findById(structure[1]._id);

            case 15:
              user = _context5.sent;
              _context5.next = 18;
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

            case 18:
              websites = _context5.sent;
              _context5.next = 21;
              return _website.Website.findById(user.currentWebsite);

            case 21:
              website = _context5.sent;
              pagesObjects = {};
              _context5.next = 25;
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

            case 25:
              expect(result.websites).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));
              expect(result.websites.length).toBe(5);
              expect(result.website.title).toBe('New website');
              expect(result.website.pagesStructure.length).toBe(1);

            case 31:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('PUT /:id /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'put', 'websites/1');

            case 2:
              headersAreGood = _context6.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('should respond error 401/400 if wrong data, or wrong user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var tokens, structure, res, website, pagesStructure;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context7.sent;
              _context7.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context7.sent;
              _context7.next = 8;
              return (0, _supertest["default"])(server).put("/api/websites/".concat(structure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                title: 1
              });

            case 8:
              res = _context7.sent;
              expect(res.status).toBe(400);
              _context7.next = 12;
              return (0, _supertest["default"])(server).put("/api/websites/dskfdjslkwelkj").set('Current-Action', '10').set('X-Auth-Token', tokens[0]).send({
                title: 1
              });

            case 12:
              res = _context7.sent;
              expect(res.status).toBe(404);
              _context7.next = 16;
              return (0, _supertest["default"])(server).put("/api/websites/".concat(structure[1].websites[2]._id)).set('Current-Action', '11').set('X-Auth-Token', tokens[0]).send({
                title: 'Updated'
              });

            case 16:
              res = _context7.sent;
              expect(res.status).toBe(404);
              _context7.next = 20;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 20:
              website = _context7.sent;
              expect(website.title).not.toBe('Updated');
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              _context7.next = 25;
              return (0, _supertest["default"])(server).put("/api/websites/".concat(structure[1].websites[2]._id)).set('Current-Action', '11').set('X-Auth-Token', tokens[1]).send({
                pagesStructure: [].concat((0, _toConsumableArray2["default"])(pagesStructure), [{
                  url: 'askjsaas',
                  id: structure[0].websites[2].pages[0]
                }])
              });

            case 25:
              res = _context7.sent;
              expect(res.status).toBe(404);

            case 27:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should update the website and respond with website and websites',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var tokens, oldStructure, oldUser, oldWebsite, oldPagesStructure, res, result, structure, user, websites, website;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0
              });

            case 2:
              tokens = _context9.sent;
              _context9.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context9.sent;
              _context9.next = 8;
              return _user.User.findById(oldStructure[1]._id);

            case 8:
              oldUser = _context9.sent;
              _context9.next = 11;
              return _website.Website.findById(oldUser.currentWebsite);

            case 11:
              oldWebsite = _context9.sent;
              oldPagesStructure = (0, _testPopulateDBandReadStructure.pure)(oldWebsite.pagesStructure);
              oldPagesStructure[0].url = 'updated';
              oldPagesStructure[1].url = 'updated2';
              _context9.next = 17;
              return (0, _supertest["default"])(server).put("/api/websites/".concat(oldStructure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).set('Content-Type', 'application/json').send({
                title: 'Updated',
                pagesStructure: oldPagesStructure
              });

            case 17:
              res = _context9.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context9.next = 22;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 22:
              structure = _context9.sent;
              _context9.next = 25;
              return _user.User.findById(structure[1]._id);

            case 25:
              user = _context9.sent;
              _context9.next = 28;
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

                return function (_x3) {
                  return _ref9.apply(this, arguments);
                };
              }()));

            case 28:
              websites = _context9.sent;
              _context9.next = 31;
              return _website.Website.findById(user.currentWebsite);

            case 31:
              website = _context9.sent;
              expect(result.websites).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(website.title).toBe('Updated');
              expect(website.pagesStructure[0].url).toBe('updated');
              expect(website.pagesStructure[1].url).toBe('updated2');

            case 37:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should respond with urlNotGood true if url is taken',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12() {
      var tokens, oldStructure, oldUser, oldWebsites, oldWebsite, oldPagesStructure, res, result, structure, user, websites, website;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0
              });

            case 2:
              tokens = _context12.sent;
              _context12.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context12.sent;
              _context12.next = 8;
              return _user.User.findById(oldStructure[1]._id);

            case 8:
              oldUser = _context12.sent;
              _context12.next = 11;
              return Promise.all(oldUser.websites.map(
              /*#__PURE__*/
              function () {
                var _ref11 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee10(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          _context10.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context10.sent;
                          return _context10.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x4) {
                  return _ref11.apply(this, arguments);
                };
              }()));

            case 11:
              oldWebsites = _context12.sent;
              _context12.next = 14;
              return _website.Website.findById(oldUser.currentWebsite);

            case 14:
              oldWebsite = _context12.sent;
              oldPagesStructure = (0, _testPopulateDBandReadStructure.pure)(oldWebsite.pagesStructure);
              oldPagesStructure[0].url = oldPagesStructure[1].url;
              _context12.next = 19;
              return (0, _supertest["default"])(server).put("/api/websites/".concat(oldStructure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).set('Content-Type', 'application/json').send({
                title: 'Updated',
                pagesStructure: oldPagesStructure
              });

            case 19:
              res = _context12.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context12.next = 24;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 24:
              structure = _context12.sent;
              _context12.next = 27;
              return _user.User.findById(structure[1]._id);

            case 27:
              user = _context12.sent;
              _context12.next = 30;
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

            case 30:
              websites = _context12.sent;
              _context12.next = 33;
              return _website.Website.findById(user.currentWebsite);

            case 33:
              website = _context12.sent;
              expect((0, _testPopulateDBandReadStructure.pure)(oldWebsites)).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect((0, _testPopulateDBandReadStructure.pure)(website)).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.urlNotOk).toBeTruthy();

            case 37:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should respond with urlNotGood true if url is in wron gformat',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15() {
      var tokens, oldStructure, oldUser, oldWebsites, oldWebsite, oldPagesStructure, res, result, structure, user, websites, website;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0
              });

            case 2:
              tokens = _context15.sent;
              _context15.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context15.sent;
              _context15.next = 8;
              return _user.User.findById(oldStructure[1]._id);

            case 8:
              oldUser = _context15.sent;
              _context15.next = 11;
              return Promise.all(oldUser.websites.map(
              /*#__PURE__*/
              function () {
                var _ref14 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee13(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          _context13.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context13.sent;
                          return _context13.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                return function (_x6) {
                  return _ref14.apply(this, arguments);
                };
              }()));

            case 11:
              oldWebsites = _context15.sent;
              _context15.next = 14;
              return _website.Website.findById(oldUser.currentWebsite);

            case 14:
              oldWebsite = _context15.sent;
              oldPagesStructure = (0, _testPopulateDBandReadStructure.pure)(oldWebsite.pagesStructure);
              oldPagesStructure[0].url = 'askdjaslj aldjalk';
              _context15.next = 19;
              return (0, _supertest["default"])(server).put("/api/websites/".concat(oldStructure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).set('Content-Type', 'application/json').send({
                title: 'Updated',
                pagesStructure: oldPagesStructure
              });

            case 19:
              res = _context15.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context15.next = 24;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 24:
              structure = _context15.sent;
              _context15.next = 27;
              return _user.User.findById(structure[1]._id);

            case 27:
              user = _context15.sent;
              _context15.next = 30;
              return Promise.all(user.websites.map(
              /*#__PURE__*/
              function () {
                var _ref15 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee14(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee14$(_context14) {
                    while (1) {
                      switch (_context14.prev = _context14.next) {
                        case 0:
                          _context14.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context14.sent;
                          return _context14.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context14.stop();
                      }
                    }
                  }, _callee14);
                }));

                return function (_x7) {
                  return _ref15.apply(this, arguments);
                };
              }()));

            case 30:
              websites = _context15.sent;
              _context15.next = 33;
              return _website.Website.findById(user.currentWebsite);

            case 33:
              website = _context15.sent;
              expect((0, _testPopulateDBandReadStructure.pure)(oldWebsites)).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect((0, _testPopulateDBandReadStructure.pure)(website)).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.urlNotOk).toBeTruthy();

            case 37:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  describe('PUT /currentpage/:id /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee16() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'put', 'websites/currentpage/1');

            case 2:
              headersAreGood = _context16.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('should respond error 401 if  wrong data, or wrong user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee17() {
      var tokens, structure, res, website;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context17.sent;
              _context17.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context17.sent;
              _context17.next = 8;
              return (0, _supertest["default"])(server).put("/api/websites/currentpage/".concat(structure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                title: 1
              });

            case 8:
              res = _context17.sent;
              expect(res.status).toBe(400);
              _context17.next = 12;
              return (0, _supertest["default"])(server).put("/api/websites/currentpage/dskfdjslkwelkj").set('Current-Action', '10').set('X-Auth-Token', tokens[0]).send({
                title: 1
              });

            case 12:
              res = _context17.sent;
              expect(res.status).toBe(404);
              _context17.next = 16;
              return (0, _supertest["default"])(server).put("/api/websites/currentpage/".concat(structure[1].websites[2]._id)).set('Current-Action', '11').set('X-Auth-Token', tokens[0]).send({
                title: 'Updated'
              });

            case 16:
              res = _context17.sent;
              expect(res.status).toBe(404);
              _context17.next = 20;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 20:
              website = _context17.sent;
              expect(website.title).not.toBe('Updated');

            case 22:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('should update the website and respond with status true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee18() {
      var tokens, oldStructure, oldUser, oldWebsite, res, result, structure, user, website;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0
              });

            case 2:
              tokens = _context18.sent;
              _context18.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context18.sent;
              _context18.next = 8;
              return _user.User.findById(oldStructure[1]._id);

            case 8:
              oldUser = _context18.sent;
              _context18.next = 11;
              return _website.Website.findById(oldUser.currentWebsite);

            case 11:
              oldWebsite = _context18.sent;
              _context18.next = 14;
              return (0, _supertest["default"])(server).put("/api/websites/currentpage/".concat(oldStructure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).set('Content-Type', 'application/json').send({
                currentPage: oldStructure[1].websites[2].pages[2],
                title: 'Updated'
              });

            case 14:
              res = _context18.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context18.next = 19;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 19:
              structure = _context18.sent;
              _context18.next = 22;
              return _user.User.findById(structure[1]._id);

            case 22:
              user = _context18.sent;
              _context18.next = 25;
              return _website.Website.findById(user.currentWebsite);

            case 25:
              website = _context18.sent;
              expect(result.status).toBeTruthy();
              expect(oldWebsite.title).toEqual(website.title);
              expect(website.title).not.toBe('Updated');
              expect((0, _testPopulateDBandReadStructure.pure)(oldWebsite.currentPage)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(website.currentPage));
              expect((0, _testPopulateDBandReadStructure.pure)(website.currentPage)).toEqual((0, _testPopulateDBandReadStructure.pure)(oldStructure[1].websites[2].pages[2]));

            case 31:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
  });
  describe('GET /:id /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee19() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'get', 'websites/1');

            case 2:
              headersAreGood = _context19.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    it('should respond error 401/400 if wrong data, or wrong user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee20() {
      var tokens, structure, res;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context20.sent;
              _context20.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context20.sent;
              _context20.next = 8;
              return (0, _supertest["default"])(server).get("/api/websites/".concat(structure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[0]);

            case 8:
              res = _context20.sent;
              expect(res.status).toBe(404);

            case 10:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    it('should website and pagesObjects',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee22() {
      var tokens, structure, user, website, pagesObjects, res, result;
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 2,
                currentPage: 0
              });

            case 2:
              tokens = _context22.sent;
              _context22.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context22.sent;
              _context22.next = 8;
              return _user.User.findById(structure[1]._id);

            case 8:
              user = _context22.sent;
              _context22.next = 11;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 11:
              website = _context22.sent;
              pagesObjects = {};
              _context22.next = 15;
              return Promise.all(website.pagesStructure.map(
              /*#__PURE__*/
              function () {
                var _ref22 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee21(item) {
                  return _regenerator["default"].wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          _context21.next = 2;
                          return _page.Page.findById(item.id);

                        case 2:
                          pagesObjects[item.id] = _context21.sent;

                        case 3:
                        case "end":
                          return _context21.stop();
                      }
                    }
                  }, _callee21);
                }));

                return function (_x8) {
                  return _ref22.apply(this, arguments);
                };
              }()));

            case 15:
              _context22.next = 17;
              return (0, _supertest["default"])(server).get("/api/websites/".concat(structure[1].websites[2]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).set('Content-Type', 'application/json');

            case 17:
              res = _context22.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website.toObject()));
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));

            case 22:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
  });
  describe('DELETE /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee23() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'delete', 'websites/1');

            case 2:
              headersAreGood = _context23.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
    it('should respond error 401/400 wrong data, or wrong user',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee24() {
      var tokens, structure, res;
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context24.sent;
              _context24.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context24.sent;
              _context24.next = 8;
              return (0, _supertest["default"])(server)["delete"]("/api/websites/dskfdjslkwelkj").set('Current-Action', '10').set('X-Auth-Token', tokens[0]);

            case 8:
              res = _context24.sent;
              expect(res.status).toBe(404);
              _context24.next = 12;
              return (0, _supertest["default"])(server)["delete"]("/api/websites/".concat(structure[1].websites[2]._id)).set('Current-Action', '11').set('X-Auth-Token', tokens[0]);

            case 12:
              res = _context24.sent;
              expect(res.status).toBe(404);

            case 14:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    it('should delete website and send website, websites and pagesObjects -- delete two websites one by one',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee27() {
      var tokens, oldStructure, res, result, structure, user, website, pagesObjects, websites, newResult, newStructure, newUser;
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              _context27.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 1,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context27.sent;
              _context27.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context27.sent;
              _context27.next = 8;
              return (0, _supertest["default"])(server)["delete"]("/api/websites/".concat(oldStructure[1].websites[0]._id)).set('Current-Action', '10').set('X-Auth-Token', tokens[1]);

            case 8:
              res = _context27.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context27.next = 13;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 13:
              structure = _context27.sent;
              _context27.next = 16;
              return _user.User.findById(structure[1]._id);

            case 16:
              user = _context27.sent;
              _context27.next = 19;
              return _website.Website.findById(user.currentWebsite);

            case 19:
              website = _context27.sent;
              pagesObjects = {};
              _context27.next = 23;
              return Promise.all(website.pagesStructure.map(
              /*#__PURE__*/
              function () {
                var _ref26 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee25(item) {
                  return _regenerator["default"].wrap(function _callee25$(_context25) {
                    while (1) {
                      switch (_context25.prev = _context25.next) {
                        case 0:
                          _context25.next = 2;
                          return _page.Page.findById(item.id);

                        case 2:
                          pagesObjects[item.id] = _context25.sent;

                        case 3:
                        case "end":
                          return _context25.stop();
                      }
                    }
                  }, _callee25);
                }));

                return function (_x9) {
                  return _ref26.apply(this, arguments);
                };
              }()));

            case 23:
              _context27.next = 25;
              return Promise.all(user.websites.map(
              /*#__PURE__*/
              function () {
                var _ref27 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee26(id) {
                  var website;
                  return _regenerator["default"].wrap(function _callee26$(_context26) {
                    while (1) {
                      switch (_context26.prev = _context26.next) {
                        case 0:
                          _context26.next = 2;
                          return _website.Website.findById(id);

                        case 2:
                          website = _context26.sent;
                          return _context26.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                        case 4:
                        case "end":
                          return _context26.stop();
                      }
                    }
                  }, _callee26);
                }));

                return function (_x10) {
                  return _ref27.apply(this, arguments);
                };
              }()));

            case 25:
              websites = _context27.sent;
              expect(oldStructure[1].websites.length).toBe(2);
              expect(structure[1].websites.length).toBe(1);
              expect(result.websites).toEqual((0, _testPopulateDBandReadStructure.pure)(websites));
              expect(result.website).toEqual((0, _testPopulateDBandReadStructure.pure)(website));
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));
              _context27.next = 33;
              return (0, _supertest["default"])(server)["delete"]("/api/websites/".concat(user.currentWebsite)).set('Current-Action', '11').set('X-Auth-Token', tokens[1]);

            case 33:
              res = _context27.sent;
              expect(res.status).toBe(200);
              newResult = JSON.parse(res.text);
              _context27.next = 38;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 38:
              newStructure = _context27.sent;
              _context27.next = 41;
              return _user.User.findById(structure[1]._id);

            case 41:
              newUser = _context27.sent;
              expect(newStructure[1].websites.length).toBe(0);
              expect(newResult.websites).toEqual([]);
              expect(newResult.website).toBeNull();
              expect(newResult.pagesObjects).toEqual({});

            case 46:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    })));
  });
});
//# sourceMappingURL=websites.test.js.map