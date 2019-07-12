"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _pagesStructure = require("../utils/pagesStructure");

var _testTokenAndCurrentAction = require("../utils/testTokenAndCurrentAction.test");

var server;
describe('/api/pages', function () {
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
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'post', 'pages');

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
    it('should respond error 401/400/404 wrong data, or wrong user, wrong page or wrong website',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var tokens, structure, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context3.sent;
              _context3.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context3.sent;
              _context3.next = 8;
              return (0, _supertest["default"])(server).post('/api/pages}').set('Current-Action', '10').set('X-Auth-Token', tokens[0]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                duplicate: true
              });

            case 8:
              res = _context3.sent;
              expect(res.status).toBe(404);
              _context3.next = 12;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: 'dsdfds',
                websiteId: structure[1].websites[2]._id,
                duplicate: true
              });

            case 12:
              res = _context3.sent;
              expect(res.status).toBe(400);
              _context3.next = 16;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '11').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: 'structure[1].websites[2]._id',
                duplicate: true
              });

            case 16:
              res = _context3.sent;
              expect(res.status).toBe(400);
              _context3.next = 20;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '12').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                duplicate: 'truedfsfds'
              });

            case 20:
              res = _context3.sent;
              expect(res.status).toBe(400);
              _context3.next = 24;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '13').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[0].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                duplicate: true
              });

            case 24:
              res = _context3.sent;
              expect(res.status).toBe(404);
              _context3.next = 28;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '14').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[1].pages[0],
                websiteId: structure[1].websites[2]._id,
                duplicate: true
              });

            case 28:
              res = _context3.sent;
              expect(res.status).toBe(404);
              _context3.next = 32;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '15').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[1]._id,
                duplicate: true
              });

            case 32:
              res = _context3.sent;
              expect(res.status).toBe(404);

            case 34:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should respond with page and pagesStructure for duplicate false',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var tokens, oldStructure, res, result, structure, website, sourcePage, page, sourcePageLean, pageLean;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context4.sent;
              _context4.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              oldStructure = _context4.sent;
              _context4.next = 8;
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: oldStructure[1].websites[2].pages[0],
                websiteId: oldStructure[1].websites[2]._id
              });

            case 8:
              res = _context4.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context4.next = 13;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 13:
              structure = _context4.sent;
              _context4.next = 16;
              return _website.Website.findById(structure[1].websites[2]);

            case 16:
              website = _context4.sent;
              _context4.next = 19;
              return _page.Page.findById(website.pagesStructure[0].id);

            case 19:
              sourcePage = _context4.sent;
              _context4.next = 22;
              return _page.Page.findById(website.pagesStructure[11].id);

            case 22:
              page = _context4.sent;
              expect(oldStructure[1].websites[2].pages.length - website.pagesStructure.length).toEqual(-1);
              expect(result.page).toEqual((0, _testPopulateDBandReadStructure.pure)(page));
              expect(result.pagesStructure).toEqual((0, _testPopulateDBandReadStructure.pure)(website.pagesStructure));
              sourcePageLean = _lodash["default"].omit(sourcePage.toJSON(), ['_id']);
              pageLean = _lodash["default"].omit(page.toJSON(), ['_id']);
              expect(sourcePageLean).not.toEqual(pageLean);

            case 29:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should respond with page and pagesStructure for duplicate true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5() {
      var tokens, oldStructure, res, result, structure, website, sourcePage, page, sourcePageLean, pageLean;
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
              return (0, _supertest["default"])(server).post('/api/pages').set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: oldStructure[1].websites[2].pages[0],
                websiteId: oldStructure[1].websites[2]._id,
                duplicate: true
              });

            case 8:
              res = _context5.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context5.next = 13;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 13:
              structure = _context5.sent;
              _context5.next = 16;
              return _website.Website.findById(structure[1].websites[2]);

            case 16:
              website = _context5.sent;
              _context5.next = 19;
              return _page.Page.findById(website.pagesStructure[0].id);

            case 19:
              sourcePage = _context5.sent;
              _context5.next = 22;
              return _page.Page.findById(website.pagesStructure[11].id);

            case 22:
              page = _context5.sent;
              expect(oldStructure[1].websites[2].pages.length - website.pagesStructure.length).toEqual(-1);
              expect(result.page).toEqual((0, _testPopulateDBandReadStructure.pure)(page));
              expect(result.pagesStructure).toEqual((0, _testPopulateDBandReadStructure.pure)(website.pagesStructure));
              sourcePageLean = _lodash["default"].omit(sourcePage.toJSON(), ['_id']);
              pageLean = _lodash["default"].omit(page.toJSON(), ['_id']);
              expect(sourcePageLean).toEqual(pageLean);

            case 29:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('PUT /', function () {
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
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'put', 'pages/12');

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
    it('should respond error 401/400/404 if wrong data, or wrong user, wrong page or wrong website',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      var tokens, structure, website, pagesStructure, res;
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
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context7.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              _context7.next = 12;
              return (0, _supertest["default"])(server).put("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '10').set('X-Auth-Token', tokens[0]).send({
                content: {
                  content: 'is new'
                },
                pagesStructure: pagesStructure
              });

            case 12:
              res = _context7.sent;
              expect(res.status).toBe(404);
              _context7.next = 16;
              return (0, _supertest["default"])(server).put("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                content: 'asdasdasd',
                pagesStructure: pagesStructure
              });

            case 16:
              res = _context7.sent;
              expect(res.status).toBe(400);
              _context7.next = 20;
              return (0, _supertest["default"])(server).put("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '11').set('X-Auth-Token', tokens[1]).send({
                content: {
                  content: 'is new'
                },
                pagesStructure: 'pagesStructure'
              });

            case 20:
              res = _context7.sent;
              expect(res.status).toBe(400);
              _context7.next = 24;
              return (0, _supertest["default"])(server).put("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '12').set('X-Auth-Token', tokens[1]).send({
                content: {
                  content: 'is new'
                },
                pagesStructure: [].concat((0, _toConsumableArray2["default"])(pagesStructure), [{
                  url: 'dfklfsdlf',
                  id: structure[1].websites[1].pages[0]
                }])
              });

            case 24:
              res = _context7.sent;
              expect(res.status).toBe(404);

            case 26:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    it('should respond with status true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
      var tokens, structure, website, pagesStructure, res, result, newWebsite, page, newPagesStructure;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context8.sent;
              _context8.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context8.sent;
              _context8.next = 8;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context8.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              pagesStructure[0] = (0, _objectSpread2["default"])({}, pagesStructure[0], {
                title: 'super'
              });
              _context8.next = 13;
              return (0, _supertest["default"])(server).put("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                content: {
                  content: 'is new'
                },
                pagesStructure: pagesStructure
              });

            case 13:
              res = _context8.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context8.next = 18;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 18:
              newWebsite = _context8.sent;
              _context8.next = 21;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 21:
              page = _context8.sent;
              newPagesStructure = (0, _testPopulateDBandReadStructure.pure)(newWebsite.pagesStructure);
              expect(newPagesStructure).toEqual(pagesStructure);
              expect(newPagesStructure[0].title).toEqual('super');
              expect(page.content).toEqual({
                content: 'is new'
              });

            case 26:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('DELETE /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee9() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'delete', 'pages/12');

            case 2:
              headersAreGood = _context9.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should respond error 401/400/404 wrong data, or wrong user, wrong page or wrong website',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10() {
      var tokens, structure, res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context10.sent;
              _context10.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context10.sent;
              _context10.next = 8;
              return (0, _supertest["default"])(server)["delete"]("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '10').set('X-Auth-Token', tokens[0]);

            case 8:
              res = _context10.sent;
              expect(res.status).toBe(404);

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('should respond with pagesStructure and currentPage',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11() {
      var tokens, structure, website, pagesStructure, descedants, res, result, newStructure, newWebsite, newPagesStructure;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context11.sent;
              _context11.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context11.sent;
              _context11.next = 8;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context11.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              descedants = (0, _pagesStructure.findDescendants)(pagesStructure, structure[1].websites[2].pages[0]).map(function (item) {
                return item.id;
              });
              descedants.push(structure[1].websites[2].pages[0]);
              _context11.next = 14;
              return (0, _supertest["default"])(server)["delete"]("/api/pages/".concat(structure[1].websites[2].pages[0])).set('Current-Action', '10').set('X-Auth-Token', tokens[1]);

            case 14:
              res = _context11.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context11.next = 19;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 19:
              newStructure = _context11.sent;
              _context11.next = 22;
              return _website.Website.findById(newStructure[1].websites[2]._id);

            case 22:
              newWebsite = _context11.sent;
              newPagesStructure = (0, _testPopulateDBandReadStructure.pure)(newWebsite.pagesStructure);
              expect(newPagesStructure).not.toEqual(pagesStructure);
              expect(newPagesStructure[0]).not.toEqual(pagesStructure[0]);
              expect(newPagesStructure[0].isHomePage).toBeTruthy();
              expect(newPagesStructure[0].id).toEqual(result.currentPage);
              expect(result.pagesStructure).toEqual(newPagesStructure);
              expect(result.pagesStructure.length).toEqual(pagesStructure.length - descedants.length);

            case 30:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('POST/PUBLISH /', function () {
    it('should respond error 400/401/412 if no token in headers, wrong token, no current action or wrong currentaction',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12() {
      var headersAreGood;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'post', 'pages/publish');

            case 2:
              headersAreGood = _context12.sent;
              expect(headersAreGood).toBeTruthy();

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should respond error 401/400/404 wrong data, or wrong user, wrong page or wrong website',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13() {
      var tokens, structure, website, pagesStructure, sampleData, res, updatedPagesStructure;
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
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context13.sent;
              _context13.next = 8;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context13.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              sampleData = {
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: true
              };
              _context13.next = 13;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '10').set('X-Auth-Token', tokens[0]).send(sampleData);

            case 13:
              res = _context13.sent;
              expect(res.status).toBe(404);
              _context13.next = 17;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                currentPage: structure[1].websites[1].pages[0]
              }));

            case 17:
              res = _context13.sent;
              expect(res.status).toBe(400);
              _context13.next = 21;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '11').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                currentPage: structure[0].websites[1].pages[0]
              }));

            case 21:
              res = _context13.sent;
              expect(res.status).toBe(400);
              _context13.next = 25;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '12').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                websiteId: structure[1].websites[1]._id
              }));

            case 25:
              res = _context13.sent;
              expect(res.status).toBe(404);
              updatedPagesStructure = (0, _toConsumableArray2["default"])(pagesStructure);
              updatedPagesStructure[3] = {
                id: structure[0].websites[1].pages[3],
                url: 'sdasdasd'
              };
              _context13.next = 31;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '13').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                pagesStructure: updatedPagesStructure
              }));

            case 31:
              res = _context13.sent;
              expect(res.status).toBe(404);
              _context13.next = 35;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '14').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                publishOne: 'one'
              }));

            case 35:
              res = _context13.sent;
              expect(res.status).toBe(400);

            case 37:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    it('should respond with success true when publishOne is true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14() {
      var tokens, structure, website, pagesStructure, page, page2, res, result, newStructure, newWebsite, newPagesStructure, newPage, newPage2;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context14.sent;
              _context14.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context14.sent;
              _context14.next = 8;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context14.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              pagesStructure[0].title = 'updated';
              _context14.next = 13;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 13:
              page = _context14.sent;
              _context14.next = 16;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 16:
              page2 = _context14.sent;
              expect((0, _testPopulateDBandReadStructure.pure)(page.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(page2.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old'
              });
              _context14.next = 23;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: true
              });

            case 23:
              res = _context14.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context14.next = 28;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 28:
              newStructure = _context14.sent;
              _context14.next = 31;
              return _website.Website.findById(newStructure[1].websites[2]._id);

            case 31:
              newWebsite = _context14.sent;
              newPagesStructure = (0, _testPopulateDBandReadStructure.pure)(newWebsite.pagesStructure);
              _context14.next = 35;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 35:
              newPage = _context14.sent;
              _context14.next = 38;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 38:
              newPage2 = _context14.sent;
              expect(newPagesStructure[0].title).toBe('updated');
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page2.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old'
              });
              expect(result.success).toBeTruthy();

            case 47:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should respond with success true when publishOne is true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15() {
      var tokens, structure, website, pagesStructure, page, page2, res, result, newStructure, newWebsite, newPagesStructure, newPage, newPage2;
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
              structure = _context15.sent;
              _context15.next = 8;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context15.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              pagesStructure[0].title = 'updated';
              _context15.next = 13;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 13:
              page = _context15.sent;
              _context15.next = 16;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 16:
              page2 = _context15.sent;
              expect((0, _testPopulateDBandReadStructure.pure)(page.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(page2.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old'
              });
              _context15.next = 23;
              return (0, _supertest["default"])(server).post("/api/pages/publish").set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: false
              });

            case 23:
              res = _context15.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context15.next = 28;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 28:
              newStructure = _context15.sent;
              _context15.next = 31;
              return _website.Website.findById(newStructure[1].websites[2]._id);

            case 31:
              newWebsite = _context15.sent;
              newPagesStructure = (0, _testPopulateDBandReadStructure.pure)(newWebsite.pagesStructure);
              _context15.next = 35;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 35:
              newPage = _context15.sent;
              _context15.next = 38;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 38:
              newPage2 = _context15.sent;
              expect(newPagesStructure[0].title).toBe('updated');
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page2.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2'
              });
              expect(result.success).toBeTruthy();

            case 47:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  describe('POST/REVERT /', function () {
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
              return (0, _testTokenAndCurrentAction.testTokenAndCurrentAction)(server, 'post', 'pages/revert');

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
    it('should respond error 401/400/404 if wrong data, or wrong user, wrong page or wrong website',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee17() {
      var tokens, structure, website, pagesStructure, sampleData, res, updatedPagesStructure;
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
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context17.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              sampleData = {
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: true
              };
              _context17.next = 13;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '10').set('X-Auth-Token', tokens[0]).send(sampleData);

            case 13:
              res = _context17.sent;
              expect(res.status).toBe(404);
              _context17.next = 17;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                currentPage: structure[1].websites[1].pages[0]
              }));

            case 17:
              res = _context17.sent;
              expect(res.status).toBe(400);
              _context17.next = 21;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '11').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                currentPage: structure[0].websites[1].pages[0]
              }));

            case 21:
              res = _context17.sent;
              expect(res.status).toBe(400);
              _context17.next = 25;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '12').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                websiteId: structure[1].websites[1]._id
              }));

            case 25:
              res = _context17.sent;
              expect(res.status).toBe(404);
              updatedPagesStructure = (0, _toConsumableArray2["default"])(pagesStructure);
              updatedPagesStructure[3] = {
                id: structure[0].websites[1].pages[3],
                url: 'sdasdasd'
              };
              _context17.next = 31;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '13').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                pagesStructure: updatedPagesStructure
              }));

            case 31:
              res = _context17.sent;
              expect(res.status).toBe(404);
              _context17.next = 35;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '14').set('X-Auth-Token', tokens[1]).send((0, _objectSpread2["default"])({}, sampleData, {
                publishOne: 'one'
              }));

            case 35:
              res = _context17.sent;
              expect(res.status).toBe(400);

            case 37:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
    it('should respond with success true when publishOne is true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee18() {
      var tokens, structure, website, pagesStructure, page, page2, res, result, newStructure, newWebsite, newPagesStructure, newPage, newPage2, pagesObjects;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return (0, _testPopulateDBandReadStructure.populateTestDB)({
                users: 2,
                websites: 3,
                pages: 15,
                currentWebsite: 0,
                currentPage: 0
              });

            case 2:
              tokens = _context18.sent;
              _context18.next = 5;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 5:
              structure = _context18.sent;
              _context18.next = 8;
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context18.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              pagesStructure[0].title = 'updated';
              _context18.next = 13;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 13:
              page = _context18.sent;
              _context18.next = 16;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 16:
              page2 = _context18.sent;
              expect((0, _testPopulateDBandReadStructure.pure)(page.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(page2.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2'
              });
              _context18.next = 23;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: true
              });

            case 23:
              res = _context18.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context18.next = 28;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 28:
              newStructure = _context18.sent;
              _context18.next = 31;
              return _website.Website.findById(newStructure[1].websites[2]._id);

            case 31:
              newWebsite = _context18.sent;
              newPagesStructure = (0, _testPopulateDBandReadStructure.pure)(newWebsite.pagesStructure);
              _context18.next = 35;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 35:
              newPage = _context18.sent;
              _context18.next = 38;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 38:
              newPage2 = _context18.sent;
              pagesObjects = (0, _defineProperty2["default"])({}, structure[1].websites[2].pages[0], newPage);
              expect(newPagesStructure[0].title).toBe('updated');
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page2.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2'
              });
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));

            case 48:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('should respond with success true when publishOne is true',
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee20() {
      var tokens, structure, website, pagesStructure, page, page2, res, result, newStructure, newWebsite, newPagesStructure, newPage, newPage2, pagesObjects;
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
              return _website.Website.findById(structure[1].websites[2]._id);

            case 8:
              website = _context20.sent;
              pagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);
              pagesStructure[0].title = 'updated';
              _context20.next = 13;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 13:
              page = _context20.sent;
              _context20.next = 16;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 16:
              page2 = _context20.sent;
              expect((0, _testPopulateDBandReadStructure.pure)(page.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(page2.content)).not.toEqual((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(page2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2'
              });
              _context20.next = 23;
              return (0, _supertest["default"])(server).post("/api/pages/revert").set('Current-Action', '10').set('X-Auth-Token', tokens[1]).send({
                currentPageId: structure[1].websites[2].pages[0],
                websiteId: structure[1].websites[2]._id,
                pagesStructure: pagesStructure,
                publishOne: false
              });

            case 23:
              res = _context20.sent;
              expect(res.status).toBe(200);
              result = JSON.parse(res.text);
              _context20.next = 28;
              return (0, _testPopulateDBandReadStructure.getDBStructure)();

            case 28:
              newStructure = _context20.sent;
              _context20.next = 31;
              return _website.Website.findById(newStructure[1].websites[2]._id);

            case 31:
              newWebsite = _context20.sent;
              newPagesStructure = (0, _testPopulateDBandReadStructure.pure)(newWebsite.pagesStructure);
              _context20.next = 35;
              return _page.Page.findById(structure[1].websites[2].pages[0]);

            case 35:
              newPage = _context20.sent;
              _context20.next = 38;
              return _page.Page.findById(structure[1].websites[2].pages[2]);

            case 38:
              newPage2 = _context20.sent;
              pagesObjects = {};
              _context20.next = 42;
              return Promise.all(website.pagesStructure.map(
              /*#__PURE__*/
              function () {
                var _ref20 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee19(item) {
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          _context19.next = 2;
                          return _page.Page.findById(item.id);

                        case 2:
                          pagesObjects[item.id] = _context19.sent;

                        case 3:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, _callee19);
                }));

                return function (_x) {
                  return _ref20.apply(this, arguments);
                };
              }()));

            case 42:
              expect(newPagesStructure[0].title).toBe('updated');
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.publishedVersion.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage.content)).toEqual({
                key_1: 'User_1 Website 2_Page_0_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_0_value_2_key_2_old'
              });
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.publishedVersion.content)).toEqual((0, _testPopulateDBandReadStructure.pure)(page2.publishedVersion.content));
              expect((0, _testPopulateDBandReadStructure.pure)(newPage2.content)).toEqual({
                key_1: 'User_1 Website 2_Page_2_value_1_key_1_old',
                key_2: 'User_1 Website 2_Page_2_value_2_key_2_old'
              });
              expect(result.pagesObjects).toEqual((0, _testPopulateDBandReadStructure.pure)(pagesObjects));

            case 50:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
  });
});
//# sourceMappingURL=pages.test.js.map