"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _website = require("../models/website");

var _page = require("../models/page");

var router = _express["default"].Router();

router.get('*',
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var urlArray, domain, _ref2, pagesStructure, pagesObjects;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            urlArray = req.originalUrl.split('/');

            if (!(urlArray.length < 2)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(404).send('The website with the given URL was not found.'));

          case 3:
            domain = urlArray[2];
            _context2.next = 6;
            return _website.Website.findOne({
              domain: domain
            }, 'pagesStructure');

          case 6:
            _ref2 = _context2.sent;
            pagesStructure = _ref2.pagesStructure;
            pagesObjects = {};
            _context2.next = 11;
            return Promise.all(pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(item) {
                var pageObject;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _page.Page.findById(item.id, 'publishedVersion');

                      case 2:
                        pageObject = _context.sent;
                        pagesObjects[item.id] = pageObject.publishedVersion;

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 11:
            _fs["default"].readFile(_path["default"].join(__dirname + '/../client/build/index.html'), 'utf8', function (err, data) {
              if (err) throw err;
              urlArray.splice(0, 3);
              var newData = data.replace('<head>', "<head><script>window.pagesStructure = JSON.parse('" + JSON.stringify(pagesStructure) + "');window.pagesObjects = JSON.parse('" + JSON.stringify(pagesObjects) + "');window.currentPage = JSON.parse('" + JSON.stringify(urlArray.join('/')) + "');</script>");
              res.send(newData);
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=live.js.map