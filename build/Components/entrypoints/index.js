"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _Drawer = _interopRequireDefault(require("../pages/Drawer/Drawer"));

var _Menu = _interopRequireDefault(require("../pages/Menu/Menu"));

var _BasicForm = _interopRequireDefault(require("../pages/BasicForm/BasicForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const getDepth = script => {
  let i = 0;
  let el = script;

  while (el.parentNode) {
    el = el.parentNode;
    i++;
  }

  return i;
};

const scriptsForHydrate = Array.from(document.querySelectorAll('script[websiterforprocessing]')).map(script => ({
  script,
  depth: getDepth(script)
})).sort(function (a, b) {
  return a.depth - b.depth;
});

for (let script of scriptsForHydrate) {
  const scriptDom = script.script;

  switch (scriptDom.getAttribute('websiterforprocessing')) {
    case 'websiterDrawer':
      (0, _reactDom.hydrate)( /*#__PURE__*/_react.default.createElement(_Drawer.default, _extends({}, window['websiterDrawerProps_' + scriptDom.getAttribute('websiterpropsforelement')], {
        inEntry: true
      })), scriptDom.parentNode);
      break;

    case 'websiterMenu':
      (0, _reactDom.hydrate)( /*#__PURE__*/_react.default.createElement(_Menu.default, _extends({}, window['websiterMenuProps_' + scriptDom.getAttribute('websiterpropsforelement')], {
        inEntry: true
      })), scriptDom.parentNode);
      break;

    case 'websiterBasicForm':
      (0, _reactDom.hydrate)( /*#__PURE__*/_react.default.createElement(_BasicForm.default, _extends({}, window['websiterBasicFormProps_' + scriptDom.getAttribute('websiterpropsforelement')], {
        inEntry: true
      })), scriptDom.parentNode);
      break;

    default:
      break;
  }
}