"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuModule = _interopRequireWildcard(require("./MenuModule"));

var _buildItemsForMenu = _interopRequireDefault(require("./methods/buildItemsForMenu"));

var _hydrateUtils = require("../utils/hydrateUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const activeKeys = [];

const MenuElement = props => {
  (0, _react.useEffect)(() => {
    if (!document.getElementById('__menu__popup__container__' + props.element.id)) {
      const container = document.createElement('div');
      container.setAttribute('id', '__menu__popup__container__' + props.element.id);
      container.setAttribute('style', 'z-index:100000;position: absolute;');
      document.body.appendChild(container);
    }

    (0, _hydrateUtils.returnInnerElements)(['websitermenuoverflow_'], props);
  });
  const builtItems = (0, _buildItemsForMenu.default)(props);
  activeKeys.length = 0;
  const innerItems = builtItems.map((item, index) => {
    const key = item.id + '_' + index;

    if (item.children.length === 0) {
      if (item.url === props.pageInStructure.relUrl || item.url === '' && props.pageInStructure.homepage) activeKeys.push(key);
      return /*#__PURE__*/_react.default.createElement(_MenuModule.MenuItem, {
        key: key,
        className: item.properties ? item.properties.class : '',
        href: item.url,
        target: item.properties && (item.properties.newTab ? '_blank' : '_self')
      }, item.name);
    } else {
      return /*#__PURE__*/_react.default.createElement(SubMenu1, {
        item: item,
        key: key,
        pageInStructure: props.pageInStructure
      });
    }
  });
  (0, _hydrateUtils.migrateInnerChildren)(['websitermenuoverflow_'], props);
  return /*#__PURE__*/_react.default.createElement(_MenuModule.default, _extends({
    prefixCls: 'systemclass_menu',
    getPopupContainer: () => document.getElementById('__menu__popup__container__' + props.element.id),
    selectable: false,
    triggerSubMenuAction: props.refinedProperties.trigger,
    activeKeys: activeKeys,
    overflowedIndicator: (0, _hydrateUtils.getInnerElement)('websitermenuoverflow_', 'overflowIcon', {}, props)
  }, props.refinedProperties, {
    inEntry: props.inEntry
  }), innerItems);
};

const SubMenu1 = props => {
  const { ...other
  } = props;
  return /*#__PURE__*/_react.default.createElement(_MenuModule.SubMenu, _extends({}, other, {
    title: props.item.name
  }), props.item.children.map((item, index) => {
    const key = item.id + '_' + index;

    if (item.children.length === 0) {
      if (item.url === props.pageInStructure.relUrl || item.url === '' && props.pageInStructure.homepage) activeKeys.push(key);
      return /*#__PURE__*/_react.default.createElement(_MenuModule.MenuItem, {
        key: key,
        className: item.properties ? item.properties.class : '',
        href: item.url,
        target: item.properties && (item.properties.newTab ? '_blank' : '_self')
      }, item.name);
    } else {
      return /*#__PURE__*/_react.default.createElement(SubMenu2, _extends({}, other, {
        item: item,
        key: key,
        pageInStructure: props.pageInStructure
      }));
    }
  }));
};

const SubMenu2 = SubMenu1;
var _default = MenuElement;
exports.default = _default;