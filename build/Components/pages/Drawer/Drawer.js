"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcDrawer = _interopRequireDefault(require("rc-drawer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Drawer = props => {
  const [state, setState] = (0, _react.useState)();

  const onTouchEnd = () => {
    setState(false);
  };

  const onSwitch = () => {
    setState(!state);
  };

  console.log(props);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.handler && /*#__PURE__*/_react.default.createElement("div", {
    onClick: onSwitch
  }, props.handler), /*#__PURE__*/_react.default.createElement(_rcDrawer.default, {
    open: state,
    onClose: onTouchEnd,
    handler: props.autoHandler,
    level: null,
    width: "200px",
    getContainer: () => props.refinedProperties.container ? document.getElementById(props.refinedProperties.container) || document.body : document.body,
    onHandleClick: onSwitch
  }, props.content));
};

var _default = Drawer;
exports.default = _default;