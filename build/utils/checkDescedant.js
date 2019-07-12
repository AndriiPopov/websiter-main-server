"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagesStructureIsRight = exports.websiteIsInUser = exports.pageIsInUser = exports.pageIsInWebsite = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = require("../models/user");

var _website = require("../models/website");

var _page = require("../models/page");

var _testPopulateDBandReadStructure = require("./testPopulateDBandReadStructure");

var pageIsInWebsite =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(pageId, websiteId, res) {
    var website;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _website.Website.findById(websiteId);

          case 2:
            website = _context.sent;

            if (website) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 7:
            if (website.pagesStructure.some(function (page) {
              return page.id.toString() === pageId;
            })) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).send('The page with the given ID was not found.'));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function pageIsInWebsite(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.pageIsInWebsite = pageIsInWebsite;

var pageIsInUser =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(pageId, user, res) {
    var page;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _page.Page.findById(pageId);

          case 2:
            page = _context2.sent;

            if (user.websites.some(function (website) {
              return website.toString() === page.website.toString();
            })) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(404).send('The page with the given ID was not found.'));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function pageIsInUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.pageIsInUser = pageIsInUser;

var websiteIsInUser =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(websiteId, user, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (user.websites.some(function (website) {
              return website.toString() === websiteId;
            })) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function websiteIsInUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.websiteIsInUser = websiteIsInUser;

var pagesStructureIsRight =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(pagesStructure, websiteId, res) {
    var website, oldPagesStructure;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _website.Website.findById(websiteId);

          case 2:
            website = _context4.sent;
            oldPagesStructure = (0, _testPopulateDBandReadStructure.pure)(website.pagesStructure);

            if (!pagesStructure.some(function (page) {
              return !oldPagesStructure.some(function (item) {
                return item.id.toString() === page.id.toString();
              });
            })) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).send('The pages in the pageStructure are wrong.'));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function pagesStructureIsRight(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.pagesStructureIsRight = pagesStructureIsRight;
//# sourceMappingURL=checkDescedant.js.map