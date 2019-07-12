"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePagePublishRevert = exports.validatePageSave = exports.validatePageCreate = exports.Page = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Page = _mongoose["default"].model('Page', new _mongoose["default"].Schema({
  website: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Websites'
  },
  content: {},
  publishedVersion: {}
}));

exports.Page = Page;

var validatePageCreate = function validatePageCreate(data) {
  var schema = {
    currentPageId: _joi["default"].objectId(),
    websiteId: _joi["default"].objectId().required(),
    duplicate: _joi["default"]["boolean"]()
  };
  return _joi["default"].validate(data, schema);
};

exports.validatePageCreate = validatePageCreate;

var validatePageSave = function validatePageSave(data) {
  var schema = {
    pagesStructure: _joi["default"].array(),
    content: _joi["default"].object()
  };
  return _joi["default"].validate(data, schema);
};

exports.validatePageSave = validatePageSave;

var validatePagePublishRevert = function validatePagePublishRevert(data) {
  var schema = {
    currentPageId: _joi["default"].objectId().required(),
    websiteId: _joi["default"].objectId().required(),
    pagesStructure: _joi["default"].array().required(),
    publishOne: _joi["default"]["boolean"]()
  };
  return _joi["default"].validate(data, schema);
}; // export const validatePageUpdate = page => {
//     const schema = {
//         website: Joi.objectId(),
//         content: Joi.object(),
//         publishedVersion: Joi.object(),
//     }
//     return Joi.validate(page, schema)
// }


exports.validatePagePublishRevert = validatePagePublishRevert;
//# sourceMappingURL=page.js.map