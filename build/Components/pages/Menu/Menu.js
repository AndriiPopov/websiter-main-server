"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuModule = _interopRequireWildcard(require("./MenuModule"));

var _buildItemsForMenu = _interopRequireDefault(require("./methods/buildItemsForMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const activeKeys = [];

const MenuElement = props => {
  (0, _react.useEffect)(() => {
    if (!document.getElementById('__menu__popup__container__')) {
      const container = document.createElement('div');
      container.setAttribute('id', '__menu__popup__container__');
      container.setAttribute('style', 'z-index:100000;position: absolute;');
      document.body.appendChild(container);
    }
  });
  const builtItems = (0, _buildItemsForMenu.default)(props);
  activeKeys.length = 0;
  const innerItems = builtItems.map((item, index) => {
    const key = item.id + '_' + index;

    if (item.children.length === 0) {
      if (item.url === props.mD.baseUrl + props.pageInStructure.url || item.url === props.mD.baseUrl && props.pageInStructure.homepage) activeKeys.push(key);
      return /*#__PURE__*/_react.default.createElement(_MenuModule.MenuItem, {
        key: key,
        className: item.properties ? item.properties.itemClass : ''
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        },
        onClick: () => window.location = item.url
      }, item.name));
    } else {
      return /*#__PURE__*/_react.default.createElement(SubMenu1, {
        item: item,
        key: key,
        pageInStructure: props.pageInStructure,
        mD: props.mD
      });
    }
  });
  return /*#__PURE__*/_react.default.createElement(_MenuModule.default, {
    prefixCls: 'systemclass_menu',
    getPopupContainer: () => document.getElementById('__menu__popup__container__'),
    topMenuBlockClasses: props.refinedProperties.topMenuBlockClasses,
    topMenuItemClasses: props.refinedProperties.topMenuItemClasses,
    topMenuItemActiveClasses: props.refinedProperties.topMenuItemActiveClasses,
    popupMenuBlockClasses: props.refinedProperties.popupMenuBlockClasses,
    popupMenuItemClasses: props.refinedProperties.popupMenuItemClasses,
    popupMenuItemActiveClasses: props.refinedProperties.popupMenuItemActiveClasses,
    mode: props.refinedProperties.mode,
    selectable: false,
    triggerSubMenuAction: props.refinedProperties.trigger,
    activeKeys: activeKeys,
    overflowedIndicator: props.overflowIcon
  }, innerItems);
};

const SubMenu1 = props => {
  const { ...other
  } = props;
  return /*#__PURE__*/_react.default.createElement(_MenuModule.SubMenu, _extends({}, other, {
    title: props.item.name,
    mD: props.mD
  }), props.item.children.map((item, index) => {
    const key = item.id + '_' + index;

    if (item.children.length === 0) {
      if (item.url === props.mD.baseUrl + props.pageInStructure.url || item.url === props.mD.baseUrl && props.pageInStructure.homepage) activeKeys.push(key);
      return /*#__PURE__*/_react.default.createElement(_MenuModule.MenuItem, {
        key: key
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        },
        onClick: () => window.location = item.url
      }, item.name));
    } else {
      return /*#__PURE__*/_react.default.createElement(SubMenu2, _extends({}, other, {
        item: item,
        key: key,
        pageInStructure: props.pageInStructure,
        mD: props.mD
      }));
    }
  }));
};

const SubMenu2 = SubMenu1;
var _default = MenuElement;
exports.default = _default;