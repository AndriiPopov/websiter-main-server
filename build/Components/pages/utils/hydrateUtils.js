"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInnerElement = exports.returnInnerElements = exports.migrateInnerChildren = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const migrateInnerChildren = (tags, props) => {// if (props.inEntry && document && document.body) {
  //     for (let tag of tags) {
  //         const tagPath = tag + props.elementsPath
  //         const oldDiv = document.querySelector(
  //             'div[websiterforprocessing="' + tagPath + '"]'
  //         )
  //         if (!oldDiv) return
  //         let newDiv = document.querySelector(
  //             'div[websiterforprocessing="' + tagPath + '_Temp"]'
  //         )
  //         if (!newDiv) {
  //             newDiv = document.createElement('div')
  //             newDiv.setAttribute('websiterforprocessing', tagPath + '_Temp')
  //             newDiv.setAttribute(
  //                 'style',
  //                 'position:absolute;left:-10000px;top:-10000px;width:0px;height:0px;display:none;'
  //             )
  //             document.body.appendChild(newDiv)
  //         }
  //         while (oldDiv.childNodes.length > 0) {
  //             newDiv.appendChild(oldDiv.childNodes[0])
  //         }
  //     }
  // }
};

exports.migrateInnerChildren = migrateInnerChildren;

const returnInnerElements = (tags, props) => {// if (props.inEntry && document && document.body) {
  //     for (let tag of tags) {
  //         const tagPath = tag + props.elementsPath
  //         const newDiv = document.querySelector(
  //             'div[websiterforprocessing="' + tagPath + '"]'
  //         )
  //         const oldDiv = document.querySelector(
  //             'div[websiterforprocessing="' + tagPath + '_Temp"]'
  //         )
  //         if (!oldDiv || !newDiv) return
  //         while (oldDiv.childNodes.length > 0) {
  //             newDiv.appendChild(oldDiv.childNodes[0])
  //         }
  //         oldDiv.parentElement.removeChild(oldDiv)
  //     }
  // }
};

exports.returnInnerElements = returnInnerElements;

const getInnerElement = (tag, attr, addProps, props) => {
  if (props.inEntry) {
    const element = document.querySelector('div[websiterforprocessing="' + tag + props.elementsPath + '"]');
    console.log('div[websiterforprocessing="' + tag + props.elementsPath + '"]');
    console.log(element);
    if (element) return /*#__PURE__*/_react.default.createElement("div", _extends({
      websiterforprocessing: tag + props.elementsPath,
      dangerouslySetInnerHTML: {
        __html: element.innerHTML
      }
    }, addProps ? addProps : {}));
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      websiterforprocessing: tag + props.elementsPath
    }, props[attr]);
  }

  return null;
};

exports.getInnerElement = getInnerElement;