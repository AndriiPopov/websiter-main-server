"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUser = exports.User = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _website = require("./website");

var _page = require("./page");

var _joiObjectid = _interopRequireDefault(require("joi-objectid"));

_joi["default"].objectId = (0, _joiObjectid["default"])(_joi["default"]);
var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  websites: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Website'
  }],
  currentWebsite: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Websites'
  },
  currentAction: {
    type: Number,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  var token = _jsonwebtoken["default"].sign({
    _id: this._id,
    isAdmin: this.isAdmin
  }, _config["default"].get('jwtPrivateKey'));

  return token;
};

userSchema.methods.createWebsite =
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var website;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          website = new _website.Website({
            title: 'New website'
          });
          _context.next = 3;
          return website.createPage(website);

        case 3:
          _context.next = 5;
          return website.save();

        case 5:
          website = _context.sent;
          this.currentWebsite = website;
          _context.next = 9;
          return this.save();

        case 9:
          return _context.abrupt("return", website);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

userSchema.methods.deleteWebsite =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(_id, res) {
    var website, index;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _website.Website.findById(_id);

          case 2:
            website = _context3.sent;

            if (website) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(404).send('The website with the given ID was not found.'));

          case 5:
            _context3.next = 7;
            return Promise.all(website.pagesStructure.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(item) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _page.Page.findByIdAndRemove(item.id);

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 7:
            _context3.next = 9;
            return _website.Website.findByIdAndRemove(_id);

          case 9:
            index = this.websites.indexOf(_id);
            this.websites.splice(index, 1);

            if (this.websites.length > 0) {
              this.currentWebsite = this.websites[0];
            } else {
              this.currentWebsite = null;
            }

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var User = _mongoose["default"].model('User', userSchema);

exports.User = User;

var validateUser = function validateUser(user) {
  var schema = {
    email: _joi["default"].string().min(5).max(255).required().email({
      minDomainAtoms: 2
    }),
    password: _joi["default"].string().min(5).max(255).required()
  };
  return _joi["default"].validate(user, schema);
};

exports.validateUser = validateUser;
//# sourceMappingURL=user.js.map