"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSidebar = _interopRequireDefault(require("react-sidebar"));

var _hydrateUtils = require("../utils/hydrateUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Drawer = props => {
  const [state, setState] = (0, _react.useState)();
  const innerElements = ['websiterdrawercontent_', 'websiterdrawerhandler_'];
  (0, _hydrateUtils.migrateInnerChildren)(innerElements, props);

  const onSwitch = () => {
    setState(!state);
  };

  (0, _react.useEffect)(() => {
    (0, _hydrateUtils.returnInnerElements)(innerElements, props);
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactSidebar.default, {
    sidebar: (0, _hydrateUtils.getInnerElement)('websiterdrawercontent_', 'content', {}, props),
    open: state,
    onSetOpen: () => setState(),
    styles: {
      sidebar: {
        background: 'white'
      }
    }
  }, (0, _hydrateUtils.getInnerElement)('websiterdrawerhandler_', 'handler', {
    onClick: onSwitch
  }, props)));
};

var _default = Drawer;
exports.default = _default;