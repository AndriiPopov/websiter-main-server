"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateWebsite = exports.Website = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _page = require("./page");

var _pagesStructure = require("../utils/pagesStructure");

var _joiObjectid = _interopRequireDefault(require("joi-objectid"));

_joi["default"].objectId = (0, _joiObjectid["default"])(_joi["default"]);
var websiteSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  header: {},
  footer: {},
  domain: {
    type: String,
    minlength: 1,
    maxlength: 255,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true
  },
  bufferElements: {
    type: String,
    minlength: 1
  },
  pagesStructure: [],
  currentPage: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Pages'
  }
});
var blankPageContent = {
  sectionsOnPage: ['element_0', 'element_4'],
  currentId: 6,
  element_0: {
    type: 'section',
    height: 200,
    space: 50,
    background: 'rgba(200, 100, 30)',
    header: false,
    footer: false,
    allPages: false,
    children: ['element_3', 'element_1', 'element_6'],
    styles: []
  },
  element_1: {
    type: 'box',
    height: 100,
    width: 100,
    left: 200,
    top: 100,
    background: 'rgba(100, 0, 80)',
    zIndex: 0,
    children: ['element_2'],
    parent: 'element_0',
    styles: ['element_1_element_0_hover']
  },
  element_6: {
    type: 'menu',
    height: 50,
    width: 300,
    left: 500,
    top: 100,
    background: 'rgba(100, 0, 80)',
    zIndex: 0,
    children: [],
    parent: 'element_0',
    styles: [],
    itemsList: [{
      id: '0',
      key: '0',
      name: 'Home',
      type: 'page',
      newTab: false,
      hidden: false,
      path: []
    }]
  },
  element_2: {
    type: 'box',
    height: 50,
    width: 50,
    left: 100,
    top: 200,
    background: 'rgba(10, 200, 90)',
    zIndex: 0,
    children: [],
    parent: 'element_1',
    styles: []
  },
  element_3: {
    type: 'box',
    height: 50,
    width: 50,
    left: 200,
    top: 200,
    background: 'rgba(170, 100, 200)',
    zIndex: 1,
    children: [],
    parent: 'element_0',
    styles: []
  },
  element_1_element_0_hover: {
    type: 'hover',
    influencer: 'element_0',
    left: 0,
    top: 0
  },
  element_4: {
    type: 'section',
    height: 500,
    space: 50,
    background: 'rgba(200, 100, 30)',
    backgroundOn: true,
    header: false,
    footer: false,
    allPages: false,
    children: ['element_5'],
    styles: []
  },
  element_5: {
    type: 'text',
    height: 400,
    width: 400,
    left: 500,
    top: 40,
    background: 'rgba(170, 100, 200)',
    backgroundOn: true,
    zIndex: 1,
    children: [],
    parent: 'element_4',
    styles: [],
    textContent: {
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: [{
          object: 'block',
          type: 'paragraph',
          data: {},
          nodes: [{
            object: 'text',
            leaves: [{
              object: 'leaf',
              text: 'A line of tsdfdsfsdfdsds;lkfsd;kfsd;lfk.',
              marks: []
            }]
          }]
        }]
      }
    }
  }
};

websiteSchema.methods.createPage =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(currentPage, duplicate) {
    var _this = this;

    var generateNewPageName, prepareDataCreteNewPage, prepareDataDuplicate, _ref4, page, pageData, newPageStructureElement, currentPageObjectArray, currentPageObject, currentIndex, descendants;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            generateNewPageName = function generateNewPageName(name, attr, divider, i) {
              while (_this.pagesStructure.some(function (item) {
                return item[attr] === name;
              })) {
                i++;
                name = name + divider + i;
              }

              return i;
            };

            prepareDataCreteNewPage =
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee() {
                var page, pageData, max, nameIndex, urlIndex, nameAdd, urlAdd;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        page = new _page.Page();
                        page.website = _this;
                        page.publishedVersion = {};
                        page.content = blankPageContent;
                        page.markModified('content');
                        page.markModified('publishedVersion');
                        _context.next = 8;
                        return page.save();

                      case 8:
                        page = _context.sent;
                        _this.currentPage = page;
                        pageData = {};
                        max = 0, nameIndex = 0, urlIndex = 0;

                        do {
                          nameIndex = generateNewPageName('New page', 'name', ' ', max);
                          urlIndex = generateNewPageName('new-page', 'url', '-', max);
                          max = Math.max(nameIndex, urlIndex);
                        } while (nameIndex !== urlIndex);

                        nameAdd = '';
                        urlAdd = '';

                        if (max > 0) {
                          nameAdd = ' ' + max;
                          urlAdd = '-' + max;
                        }

                        pageData.name = 'New page' + nameAdd;
                        pageData.url = 'new-page' + urlAdd;
                        pageData.isHidden = false;
                        pageData.title = 'New page on my website';
                        pageData.description = 'This my new page description';
                        return _context.abrupt("return", {
                          page: page,
                          pageData: pageData
                        });

                      case 22:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function prepareDataCreteNewPage() {
                return _ref2.apply(this, arguments);
              };
            }();

            prepareDataDuplicate =
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2() {
                var currentPageObject, currentPageDataArray, currentPageData, page, pageData, max, nameIndex, urlIndex;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _page.Page.findById(currentPage);

                      case 2:
                        currentPageObject = _context2.sent;
                        currentPageDataArray = _this.pagesStructure.filter(function (item) {
                          return item.id.toString() === currentPage;
                        });

                        if (!(!currentPageObject || currentPageDataArray.length !== 1)) {
                          _context2.next = 6;
                          break;
                        }

                        return _context2.abrupt("return", {
                          page: null,
                          pageData: null
                        });

                      case 6:
                        currentPageData = currentPageDataArray[0];
                        page = new _page.Page();
                        page.website = _this;
                        page.publishedVersion = currentPageObject.publishedVersion;
                        page.content = currentPageObject.content;
                        page.markModified('content');
                        page.markModified('publishedVersion');
                        _context2.next = 15;
                        return page.save();

                      case 15:
                        page = _context2.sent;
                        _this.currentPage = page;
                        pageData = {};
                        max = 0, nameIndex = 0, urlIndex = 0;

                        do {
                          nameIndex = generateNewPageName(currentPageData.name, 'name', ' ', max);
                          urlIndex = generateNewPageName(currentPageData.url, 'url', '-', max);
                          max = Math.max(nameIndex, urlIndex);
                        } while (nameIndex !== urlIndex);

                        pageData.name = currentPageData.name + ' ' + max;
                        pageData.url = currentPageData.url + '-' + max;
                        pageData.isHidden = currentPageData.isHidden;
                        pageData.title = currentPageData.title;
                        pageData.description = currentPageData.description;
                        return _context2.abrupt("return", {
                          page: page,
                          pageData: pageData
                        });

                      case 26:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function prepareDataDuplicate() {
                return _ref3.apply(this, arguments);
              };
            }();

            if (!duplicate) {
              _context3.next = 9;
              break;
            }

            _context3.next = 6;
            return prepareDataDuplicate();

          case 6:
            _context3.t0 = _context3.sent;
            _context3.next = 12;
            break;

          case 9:
            _context3.next = 11;
            return prepareDataCreteNewPage();

          case 11:
            _context3.t0 = _context3.sent;

          case 12:
            _ref4 = _context3.t0;
            page = _ref4.page;
            pageData = _ref4.pageData;

            if (!(!page || !pageData)) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return");

          case 17:
            if (this.pagesStructure.length > 0) {
              pageData.isHomePage = false;
            } else {
              pageData.isHomePage = true;
            }

            if (!currentPage) {
              this.pagesStructure.push((0, _objectSpread2["default"])({
                id: page._id,
                path: []
              }, pageData));
            } else {
              currentPageObjectArray = this.pagesStructure.filter(function (page) {
                return page.id.toString() === currentPage.toString();
              });

              if (currentPageObjectArray.length > 0) {
                currentPageObject = currentPageObjectArray[0];
                currentIndex = this.pagesStructure.indexOf(currentPageObject);
                descendants = (0, _pagesStructure.findDescendants)(this.pagesStructure, currentPageObject.id);
                newPageStructureElement = (0, _objectSpread2["default"])({
                  id: page._id,
                  path: (0, _toConsumableArray2["default"])(currentPageObject.path)
                }, pageData);
                this.pagesStructure.splice(currentIndex + descendants.length + 1, 0, newPageStructureElement);
              } else {
                this.pagesStructure.push((0, _objectSpread2["default"])({
                  id: page._id,
                  path: []
                }, pageData));
              }
            }

            this.markModified('pagesStructure');
            return _context3.abrupt("return", {
              page: page,
              pagesStructure: this.pagesStructure
            });

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

websiteSchema.methods.deletePage =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(pageId) {
    var _this2 = this;

    var descedants;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            descedants = (0, _pagesStructure.findDescendants)(this.pagesStructure, pageId).map(function (item) {
              return item.id;
            });
            descedants.push(pageId);
            _context5.next = 4;
            return Promise.all(descedants.map(
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee4(id) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _this2.pagesStructure = _this2.pagesStructure.filter(function (item) {
                          return item.id.toString() != id.toString();
                        });
                        _context4.next = 3;
                        return _page.Page.findByIdAndRemove(id);

                      case 3:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x4) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 4:
            if (!this.pagesStructure.some(function (item) {
              return item.isHomePage;
            })) {
              if (this.pagesStructure.length > 0) {
                this.pagesStructure[0].isHomePage = true;
              }
            }

            if (descedants.some(function (page) {
              return page.toString() === _this2.currentPage.toString();
            })) {
              if (this.pagesStructure.length > 0) {
                this.currentPage = this.pagesStructure[0].id;
              } else {
                this.currentPage = null;
              }
            }

            this.markModified('pagesStructure');

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var Website = _mongoose["default"].model('Website', websiteSchema);

exports.Website = Website;

var validateWebsite = function validateWebsite(website) {
  var schema = {
    title: _joi["default"].string().min(1).max(50),
    header: _joi["default"].string().min(1),
    footer: _joi["default"].string().min(1),
    domain: _joi["default"].string().min(1).max(255),
    bufferElements: _joi["default"].string(),
    pagesStructure: _joi["default"].array(),
    currentPage: _joi["default"].objectId()
  };
  return _joi["default"].validate(website, schema);
};

exports.validateWebsite = validateWebsite;
//# sourceMappingURL=website.js.map