"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBoxProperties = void 0;

var _basic = require("../../utils/basic");

var _camelcase = _interopRequireDefault(require("camelcase"));

var _styleToObject = _interopRequireDefault(require("style-to-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styleToCamelcase = style => {
  const result = {};
  (0, _styleToObject.default)(style, (name, value) => {
    result[(0, _camelcase.default)(name)] = value;
  });
  return result;
};

const setBoxProperties = (ownRefinedProperties, props, elementValues) => {
  const result = {};

  if (elementValues.style) {
    const style = elementValues.style.replace(/\$[A-Za-z0-9_-]*\$/g, match => {
      const inheritedPropertyName = (0, _basic.getInheritedPropertyName)(match);
      return inheritedPropertyName ? props.parentPluginProps[inheritedPropertyName] || '' : '';
    });
    result.style = styleToCamelcase(style);
  }

  for (let attribute in ownRefinedProperties) {
    const attr = attribute.toLowerCase();

    switch (attr) {
      case 'style':
        break;

      case '':
        break;

      case 'class':
        result.className = ownRefinedProperties.class;
        break;

      case 'for':
        result.htmlFor = ownRefinedProperties.for;
        break;
      // case 'href':
      //     if (
      //         ownRefinedProperties[attr].indexOf('http://') > -1 ||
      //         ownRefinedProperties[attr].indexOf('https://') > -1
      //     ) {
      //         result.href = ownRefinedProperties[attr]
      //     } else {
      //         result.href = props.mD.baseUrl + ownRefinedProperties[attr]
      //     }
      //     break

      default:
        result[attr] = ownRefinedProperties[attr];
        break;
    }
  }

  return result;
};

exports.setBoxProperties = setBoxProperties;