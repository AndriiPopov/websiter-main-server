"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildItems = exports.findDirectChildren = exports.findDecedants = void 0;

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _omit = _interopRequireDefault(require("lodash/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findDecedants = (items, id) => {
  return items.filter(item => item.path.some(element => element.toString() === id.toString()));
};

exports.findDecedants = findDecedants;

const findDirectChildren = (items, id) => {
  const elements = items.filter(item => item.id === id);

  if (elements.length !== 1) {
    return [];
  } else {
    return items.filter(item => (0, _isEqual.default)(item.path, [...elements[0].path, id]));
  }
};

exports.findDirectChildren = findDirectChildren;

const buildItems = (children, path, result) => {
  const doBuildItems = (children, path) => {
    children.forEach(element => {
      result.push({ ...(0, _omit.default)(element, ['children', 'resourceDraft', 'currentResource', 'mode', 'pluginsStructure']),
        path
      });
      doBuildItems(element.children, [...path, element.id]);
    });
  };

  doBuildItems(children, path);
  return result;
};

exports.buildItems = buildItems;