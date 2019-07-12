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

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _action = _interopRequireDefault(require("../middleware/action"));

var _websiteUserDescedant = _interopRequireDefault(require("../middleware/websiteUserDescedant"));

var _checkDescedant = require("../utils/checkDescedant");

var _user = require("../models/user");

var _website = require("../models/website");

var _page = require("../models/page");

var router = _express["default"].Router();

// $FlowFixMe
router.post('/', [_auth["default"], _action["default"]],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var user, website, pagesObjects, websites;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            _context3.next = 3;
            return user.createWebsite();

          case 3:
            website = _context3.sent;
            pagesObjects = {};
            _context3.next = 7;
            return Promise.all(website.pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(item) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _page.Page.findById(item.id);

                      case 2:
                        pagesObjects[item.id] = _context.sent;

                      case 3:
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

          case 7:
            user.websites.push(website._id);
            _context3.next = 10;
            return Promise.all(user.websites.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(id) {
                var website;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _website.Website.findById(id);

                      case 2:
                        website = _context2.sent;
                        return _context2.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                      case 4:
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

          case 10:
            websites = _context3.sent;
            user.currentWebsite = website;
            _context3.next = 14;
            return user.save();

          case 14:
            res.send({
              website: website,
              websites: websites,
              pagesObjects: pagesObjects
            });

          case 15:
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
// $FlowFixMe
router.put('/:id', [_auth["default"], _action["default"], _websiteUserDescedant["default"]],
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res) {
    var user, urlNotOk, _validateWebsite, error, website, websites;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = req.user;
            urlNotOk = false;
            _validateWebsite = (0, _website.validateWebsite)(req.body), error = _validateWebsite.error;

            if (!error) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(400).send(error.details[0].message));

          case 5:
            if (!req.body.pagesStructure) {
              _context5.next = 11;
              break;
            }

            _context5.next = 8;
            return (0, _checkDescedant.pagesStructureIsRight)(req.body.pagesStructure, req.params.id, res);

          case 8:
            if (!_context5.sent) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return");

          case 10:
            req.body.pagesStructure.forEach(function (item) {
              if (req.body.pagesStructure.some(function (element) {
                return element.url === item.url && element.id !== item.id || !/^([A-Za-z0-9\-\_]+)$/.test(element.url);
              })) {
                urlNotOk = true;
              }
            });

          case 11:
            if (!urlNotOk) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt("return", res.send({
              urlNotOk: true
            }));

          case 13:
            _context5.next = 15;
            return _website.Website.findByIdAndUpdate(req.params.id, req.body, {
              "new": true
            });

          case 15:
            website = _context5.sent;
            _context5.next = 18;
            return Promise.all(user.websites.map(
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(id) {
                var website;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _website.Website.findById(id);

                      case 2:
                        website = _context4.sent;
                        return _context4.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                      case 4:
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

          case 18:
            websites = _context5.sent;
            res.send({
              website: website,
              websites: websites
            });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}());
var websiteMiddleware = []; // $FlowFixMe

router.put('/currentpage/:id', [_auth["default"], _action["default"], _websiteUserDescedant["default"]],
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(req, res) {
    var user, _validateWebsite2, error;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            user = req.user;
            _validateWebsite2 = (0, _website.validateWebsite)(req.body), error = _validateWebsite2.error;

            if (!error) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", res.status(400).send(error.details[0].message));

          case 4:
            _context6.next = 6;
            return _website.Website.findByIdAndUpdate(req.params.id, {
              currentPage: req.body.currentPage
            }, {
              "new": true
            });

          case 6:
            res.send({
              status: true
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}());
// $FlowFixMe
router["delete"]('/:id', [_auth["default"], _action["default"], _websiteUserDescedant["default"]],
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(req, res) {
    var user, websites, website, pagesObjects;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            user = req.user;
            _context9.next = 3;
            return user.deleteWebsite(req.params.id, res);

          case 3:
            _context9.next = 5;
            return user.save();

          case 5:
            _context9.next = 7;
            return Promise.all(user.websites.map(
            /*#__PURE__*/
            function () {
              var _ref8 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee7(id) {
                var website;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return _website.Website.findById(id);

                      case 2:
                        website = _context7.sent;
                        return _context7.abrupt("return", _lodash["default"].pick(website, ['_id', 'domain', 'title']));

                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x12) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 7:
            websites = _context9.sent;
            _context9.next = 10;
            return _website.Website.findById(user.currentWebsite);

          case 10:
            website = _context9.sent;
            pagesObjects = {};

            if (!website) {
              _context9.next = 15;
              break;
            }

            _context9.next = 15;
            return Promise.all(website.pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref9 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee8(item) {
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _page.Page.findById(item.id);

                      case 2:
                        pagesObjects[item.id] = _context8.sent;

                      case 3:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x13) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 15:
            res.send({
              website: website,
              websites: websites,
              pagesObjects: pagesObjects
            });

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}());
// $FlowFixMe
router.get('/:id', [_auth["default"], _action["default"], _websiteUserDescedant["default"]],
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(req, res) {
    var user, website, pagesObjects;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            user = req.user;
            website = false;

            if (!user.websites.some(function (website) {
              return website.toString() === req.params.id.toString();
            })) {
              _context11.next = 9;
              break;
            }

            _context11.next = 5;
            return _website.Website.findById(req.params.id);

          case 5:
            website = _context11.sent;
            user.currentWebsite = website;
            _context11.next = 9;
            return user.save();

          case 9:
            if (website) {
              _context11.next = 11;
              break;
            }

            return _context11.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 11:
            pagesObjects = {};
            _context11.next = 14;
            return Promise.all(website.pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref11 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee10(item) {
                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return _page.Page.findById(item.id);

                      case 2:
                        pagesObjects[item.id] = _context10.sent;

                      case 3:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x16) {
                return _ref11.apply(this, arguments);
              };
            }()));

          case 14:
            res.send({
              website: website,
              pagesObjects: pagesObjects
            });

          case 15:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x14, _x15) {
    return _ref10.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=websites.js.map