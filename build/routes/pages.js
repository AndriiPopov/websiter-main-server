"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _lodash = _interopRequireDefault(require("lodash"));

var _action = _interopRequireDefault(require("../middleware/action"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _checkDescedant = require("../utils/checkDescedant");

var _website = require("../models/website");

var _page = require("../models/page");

var router = _express["default"].Router();

// $FlowFixMe
router.post('/publish', [_auth["default"], _action["default"]],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _validatePagePublishR, error, pagesToPublish, website;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _validatePagePublishR = (0, _page.validatePagePublishRevert)(req.body), error = _validatePagePublishR.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context2.next = 5;
            return (0, _checkDescedant.websiteIsInUser)(req.body.websiteId, req.user, res);

          case 5:
            if (!_context2.sent) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return");

          case 7:
            _context2.next = 9;
            return (0, _checkDescedant.pageIsInWebsite)(req.body.currentPageId, req.body.websiteId, res);

          case 9:
            if (!_context2.sent) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return");

          case 11:
            _context2.next = 13;
            return (0, _checkDescedant.pagesStructureIsRight)(req.body.pagesStructure, req.body.websiteId, res);

          case 13:
            if (!_context2.sent) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return");

          case 15:
            _context2.next = 17;
            return _website.Website.findByIdAndUpdate(req.body.websiteId, {
              pagesStructure: req.body.pagesStructure
            });

          case 17:
            pagesToPublish = [];

            if (!req.body.publishOne) {
              _context2.next = 22;
              break;
            }

            pagesToPublish.push(req.body.currentPageId);
            _context2.next = 28;
            break;

          case 22:
            _context2.next = 24;
            return _website.Website.findById(req.body.websiteId);

          case 24:
            website = _context2.sent;

            if (website) {
              _context2.next = 27;
              break;
            }

            return _context2.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 27:
            pagesToPublish = pagesToPublish.concat(website.pagesStructure.map(function (page) {
              return page.id;
            }));

          case 28:
            _context2.next = 30;
            return Promise.all(pagesToPublish.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(pageId) {
                var page;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _page.Page.findById(pageId);

                      case 2:
                        page = _context.sent;

                        if (page) {
                          _context.next = 5;
                          break;
                        }

                        return _context.abrupt("return", res.status(404).send('The page with the given ID was not found.'));

                      case 5:
                        page.publishedVersion.content = page.toObject().content;
                        page.markModified('publishedVersion');
                        _context.next = 9;
                        return page.save();

                      case 9:
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

          case 30:
            res.send({
              success: true
            });

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // $FlowFixMe

router.post('/revert', [_auth["default"], _action["default"]],
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res) {
    var _validatePagePublishR2, error, pagesToRevert, website, pagesObjects;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _validatePagePublishR2 = (0, _page.validatePagePublishRevert)(req.body), error = _validatePagePublishR2.error;

            if (!error) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context4.next = 5;
            return (0, _checkDescedant.websiteIsInUser)(req.body.websiteId, req.user, res);

          case 5:
            if (!_context4.sent) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return");

          case 7:
            _context4.next = 9;
            return (0, _checkDescedant.pageIsInWebsite)(req.body.currentPageId, req.body.websiteId, res);

          case 9:
            if (!_context4.sent) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return");

          case 11:
            _context4.next = 13;
            return (0, _checkDescedant.pagesStructureIsRight)(req.body.pagesStructure, req.body.websiteId, res);

          case 13:
            if (!_context4.sent) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return");

          case 15:
            _context4.next = 17;
            return _website.Website.findByIdAndUpdate(req.body.websiteId, {
              pagesStructure: req.body.pagesStructure
            });

          case 17:
            pagesToRevert = [];

            if (!req.body.publishOne) {
              _context4.next = 22;
              break;
            }

            pagesToRevert.push(req.body.currentPageId);
            _context4.next = 28;
            break;

          case 22:
            _context4.next = 24;
            return _website.Website.findById(req.body.websiteId);

          case 24:
            website = _context4.sent;

            if (website) {
              _context4.next = 27;
              break;
            }

            return _context4.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 27:
            pagesToRevert = pagesToRevert.concat(website.pagesStructure.map(function (page) {
              return page.id;
            }));

          case 28:
            pagesObjects = {};
            _context4.next = 31;
            return Promise.all(pagesToRevert.map(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(pageId) {
                var page;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _page.Page.findById(pageId);

                      case 2:
                        page = _context3.sent;

                        if (page) {
                          _context3.next = 5;
                          break;
                        }

                        return _context3.abrupt("return", res.status(404).send('The page with the given ID was not found.'));

                      case 5:
                        page.content = page.publishedVersion.content;
                        page.markModified('publishedVersion');
                        pagesObjects[pageId] = page;
                        _context3.next = 10;
                        return page.save();

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 31:
            res.send({
              pagesObjects: pagesObjects
            });

          case 32:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
// $FlowFixMe
router.post('/', [_auth["default"], _action["default"]],
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var _validatePageCreate, error, website, _ref6, page, pagesStructure;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _validatePageCreate = (0, _page.validatePageCreate)(req.body), error = _validatePageCreate.error;

            if (!error) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context5.next = 5;
            return (0, _checkDescedant.websiteIsInUser)(req.body.websiteId, req.user, res);

          case 5:
            if (!_context5.sent) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return");

          case 7:
            if (!req.body.currentPageId) {
              _context5.next = 12;
              break;
            }

            _context5.next = 10;
            return (0, _checkDescedant.pageIsInWebsite)(req.body.currentPageId, req.body.websiteId, res);

          case 10:
            if (!_context5.sent) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return");

          case 12:
            _context5.next = 14;
            return _website.Website.findById(req.body.websiteId);

          case 14:
            website = _context5.sent;
            _context5.next = 17;
            return website.createPage(req.body.currentPageId, req.body.duplicate);

          case 17:
            _ref6 = _context5.sent;
            page = _ref6.page;
            pagesStructure = _ref6.pagesStructure;
            _context5.next = 22;
            return website.save();

          case 22:
            res.send({
              page: page,
              pagesStructure: pagesStructure
            });

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}());
// $FlowFixMe
router.put('/:id', [_auth["default"], _action["default"]],
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var _validatePageSave, error, page;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _validatePageSave = (0, _page.validatePageSave)(req.body), error = _validatePageSave.error;

            if (!error) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context6.next = 5;
            return (0, _checkDescedant.pageIsInUser)(req.params.id, req.user, res);

          case 5:
            if (!_context6.sent) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return");

          case 7:
            _context6.next = 9;
            return _page.Page.findById(req.params.id);

          case 9:
            page = _context6.sent;

            if (page) {
              _context6.next = 12;
              break;
            }

            return _context6.abrupt("return", res.status(404).send('The page with the given ID was not found.'));

          case 12:
            if (!req.body.pagesStructure) {
              _context6.next = 17;
              break;
            }

            _context6.next = 15;
            return (0, _checkDescedant.pagesStructureIsRight)(req.body.pagesStructure, page.website, res);

          case 15:
            if (!_context6.sent) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return");

          case 17:
            page.content = req.body.content;
            _context6.next = 20;
            return page.save();

          case 20:
            if (!req.body.pagesStructure) {
              _context6.next = 23;
              break;
            }

            _context6.next = 23;
            return _website.Website.findByIdAndUpdate(page.website, {
              pagesStructure: req.body.pagesStructure
            });

          case 23:
            res.send({
              status: true
            });

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}());
// $FlowFixMe
router["delete"]('/:id', [_auth["default"], _action["default"]],
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(req, res) {
    var page, website;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _page.Page.findById(req.params.id);

          case 2:
            page = _context7.sent;

            if (page) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", res.status(404).send('The page with the given ID was not found.'));

          case 5:
            _context7.next = 7;
            return (0, _checkDescedant.pageIsInUser)(req.params.id, req.user, res);

          case 7:
            if (!_context7.sent) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return");

          case 9:
            _context7.next = 11;
            return _website.Website.findById(page.website);

          case 11:
            website = _context7.sent;

            if (website) {
              _context7.next = 14;
              break;
            }

            return _context7.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 14:
            _context7.next = 16;
            return website.deletePage(page._id);

          case 16:
            _context7.next = 18;
            return website.save();

          case 18:
            website = _context7.sent;
            res.send({
              pagesStructure: website.pagesStructure,
              currentPage: website.currentPage
            });

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=pages.js.map