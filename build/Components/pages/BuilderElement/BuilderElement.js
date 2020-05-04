"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));

var _server = require("react-dom/server");

var _Menu = _interopRequireDefault(require("../Menu/Menu"));

var _Drawer = _interopRequireDefault(require("../Drawer/Drawer"));

var _reactSlick = _interopRequireDefault(require("react-slick"));

var _htmlEntities = require("html-entities");

var _basic = require("../utils/basic");

var _useEffect = require("./methods/useEffect");

var _refineProperties = _interopRequireDefault(require("./methods/refineProperties"));

var _modulesIndex = require("../utils/modulesIndex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const entities = new _htmlEntities.AllHtmlEntities();

var serialize = require('serialize-javascript');

const _BuilderElement = props => {
  const elementValues = props.mD.resourcesObjects[props.currentResource].values[props.element.id] || {};

  if (!elementValues) {
    return null;
  }

  const {
    refinedProperties,
    ownRefinedProperties
  } = (0, _refineProperties.default)({ ...props
  }, elementValues);
  const attributes = (0, _useEffect.setBoxProperties)(ownRefinedProperties, props, elementValues);
  const currentPath = [...props.element.path, props.element.id];
  let Tag = props.element.tag || 'div';
  /* Tag = Tag.replace(/[^a-zA-Z]/g, '') */

  Tag = Tag.length > 0 ? Tag : 'div';

  const getModulePropertiesNodes = tag => {
    const nodes = {};
    const possibleNodes = _modulesIndex.modulesPropertyNodes[tag] || [];

    for (let el of possibleNodes) {
      const nodeItem = props.structure.find(item => item.forModule === props.element.id && item.childrenTo === el.id);
      let node;

      if (nodeItem) {
        node = props.structure.filter(item => (0, _isEqual.default)(item.path, [...nodeItem.path, nodeItem.id])).map(item => /*#__PURE__*/_react.default.createElement(BuilderElement, {
          key: item.id,
          structure: props.structure.filter(itemInn => itemInn.path.includes(item.id)),
          element: item // document={props.document}
          ,
          pluginsPathArray: props.pluginsPathArray,
          sourcePlugin: props.sourcePlugin,
          routePlugin: props.routePlugin,
          parentPluginProps: props.parentPluginProps,
          childrenForPlugin: props.childrenForPlugin,
          currentResource: props.currentResource,
          pageInStructure: props.pageInStructure,
          mD: props.mD,
          isLocal: props.isLocal,
          inEntry: props.inEntry
        }));
      }

      if (node) nodes[el.id] = node;
    }

    return nodes;
  };

  let result = null;

  if (props.element.childrenTo) {
    result = null;
  } else if (props.element.isChildren) {
    const childrenMainElement = props.childrenForPlugin.find(itemInn => itemInn.childrenTo === props.element.id && itemInn.forPlugin === props.sourcePlugin);

    if (childrenMainElement) {
      const newStructure = props.childrenForPlugin.filter(itemInn => itemInn.path.includes(childrenMainElement.id));
      result = newStructure.filter(itemInn => {
        if (itemInn.path.length > 0) {
          if (itemInn.path[itemInn.path.length - 1] === childrenMainElement.id) return true;
        }

        return false;
      }).map(item => /*#__PURE__*/_react.default.createElement(BuilderElement, {
        key: item.id,
        structure: newStructure,
        element: item,
        pluginsPathArray: props.pluginsPathArray,
        sourcePlugin: childrenMainElement.sourcePlugin,
        routePlugin: props.routePlugin,
        currentResource: item.fromResource,
        parentPluginProps: props.parentPluginProps,
        childrenForPlugin: props.childrenForPlugin,
        pageInStructure: props.pageInStructure,
        mD: props.mD,
        isLocal: props.isLocal,
        inEntry: props.inEntry
      }));
    }
  } else if (props.element.isElementFromCMSVariable) {
    const inheritedPropertyName = props.element.tag;
    let parseText = '';

    if (inheritedPropertyName) {
      if (props.parentPluginProps[inheritedPropertyName]) {
        parseText = props.parentPluginProps[inheritedPropertyName];
      }
    }

    return (0, _htmlReactParser.default)((0, _sanitizeHtml.default)(parseText, {
      allowedTags: false,
      allowedAttributes: false
    }));
  } else if ((0, _basic.checkIfCapital)(Tag.charAt(0))) {
    const plugin = props.mD.pluginsStructure.find(item => item.name === Tag && !item.hidden);

    if (plugin) {
      if (!plugin.hidden) {
        const pluginResource = props.mD.resourcesObjects[plugin.id]; //Pass children to plugin

        const childrenForPlugin = [...props.structure.filter(itemInn => itemInn.path.includes(props.element.id)).map(itemInn => ({ ...itemInn,
          fromResource: props.currentResource
        })), ...(props.childrenForPlugin ? props.childrenForPlugin : [])];
        if (!pluginResource.structure) return;

        if (plugin.propagating) {
          result = Array.isArray(refinedProperties.items) ? refinedProperties.items.map(item => pluginResource.structure.filter(itemInn => (0, _isEqual.default)(itemInn.path, ['element_0'])).map(itemInn => {
            if (props.pluginsPathArray.find(item => item.plugin === plugin.id)) {
              return null;
            }

            return /*#__PURE__*/_react.default.createElement(BuilderElement, {
              key: itemInn.id,
              structure: pluginResource.structure,
              element: itemInn,
              sourcePlugin: plugin.id,
              routePlugin: props.routePlugin || props.element.id,
              pluginsPathArray: [...props.pluginsPathArray, {
                id: props.element.id,
                plugin: plugin.id
              }],
              currentResource: plugin.id,
              parentPluginProps: {
                refinedProperties,
                ...item
              },
              childrenForPlugin: childrenForPlugin,
              pageInStructure: props.pageInStructure,
              mD: props.mD,
              isLocal: props.isLocal,
              inEntry: props.inEntry
            });
          })) : null;
        } else {
          result = pluginResource.structure.filter(itemInn => (0, _isEqual.default)(itemInn.path, ['element_0'])).map(itemInn => {
            if (props.pluginsPathArray.find(item => item.plugin === plugin.id)) {
              return null;
            }

            return /*#__PURE__*/_react.default.createElement(BuilderElement, {
              key: itemInn.id,
              structure: pluginResource.structure,
              element: itemInn,
              sourcePlugin: plugin.id,
              routePlugin: props.routePlugin || props.element.id,
              pluginsPathArray: [...props.pluginsPathArray, {
                id: props.element.id,
                plugin: plugin.id
              }],
              currentResource: plugin.id,
              parentPluginProps: refinedProperties,
              childrenForPlugin: childrenForPlugin,
              pageInStructure: props.pageInStructure,
              mD: props.mD,
              isLocal: props.isLocal,
              inEntry: props.inEntry
            });
          });
        }
      }
    }
  } else {
    if (Tag === 'websiterMenu') {
      result = /*#__PURE__*/_react.default.createElement("div", _extends({}, attributes, {
        style: !props.inEntry ? {
          visibility: hidden
        } : {}
      }), /*#__PURE__*/_react.default.createElement(_Menu.default, _extends({
        element: props.element,
        elementValues: elementValues,
        refinedProperties: refinedProperties,
        parentPluginProps: props.parentPluginProps,
        childrenForPlugin: props.childrenForPlugin,
        pageInStructure: props.pageInStructure,
        mD: props.mD
      }, getModulePropertiesNodes(Tag), {
        inEntry: props.inEntry
      })));
    } else if (Tag === 'websiterDrawer') {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Drawer.default, _extends({
        element: props.element,
        refinedProperties: refinedProperties,
        parentPluginProps: props.parentPluginProps,
        childrenForPlugin: props.childrenForPlugin,
        pageInStructure: props.pageInStructure
      }, getModulePropertiesNodes(Tag), {
        inEntry: props.inEntry
      })));
    } else if (Tag === 'websiterGallery') {
      let items = refinedProperties.items || [];

      if (refinedProperties.originalClass) {
        items = items.map(item => ({ ...item,
          originalClass: refinedProperties.originalClass
        }));
      }

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactSlick.default // element={props.element}
      // elementValues={props.elementValues}
      // document={props.document}
      // parentPluginProps={props.parentPluginProps}
      // childrenForPlugin={props.childrenForPlugin}
      , _extends({}, settings, refinedProperties, getModulePropertiesNodes(Tag), {
        inEntry: props.inEntry
      }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '100px',
          height: '100px',
          background: 'red'
        }
      }, "sdfsdf")), props.currentWebsiteObject && props.filesStructure ? items.map((item, index) => {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: index
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: item.original
        }));
      }) : null));
    } else if (Tag === 'richEditor') {
      return (0, _htmlReactParser.default)((0, _sanitizeHtml.default)(elementValues.textContent, {
        allowedTags: false,
        allowedAttributes: false
      }));
    } else if (props.element.text) {
      if (elementValues.textContent) {
        result = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, elementValues.textContent.replace(/\$[^:;\$\s]*\$/g, match => {
          const inheritedPropertyName = (0, _basic.getInheritedPropertyName)(match);
          return inheritedPropertyName ? props.parentPluginProps[inheritedPropertyName] || '' : '';
        }));
      }
    } else {
      const innerResult = [...props.structure.filter(item => (0, _isEqual.default)(item.path, currentPath)).map(item => /*#__PURE__*/_react.default.createElement(BuilderElement, {
        key: item.id,
        structure: props.structure,
        element: item,
        pluginsPathArray: props.pluginsPathArray,
        sourcePlugin: props.sourcePlugin,
        routePlugin: props.routePlugin,
        currentResource: props.currentResource,
        parentPluginProps: props.parentPluginProps,
        childrenForPlugin: props.childrenForPlugin,
        pageInStructure: props.pageInStructure,
        mD: props.mD,
        isLocal: props.isLocal,
        inEntry: props.inEntry
      })), ...(props.element.id === 'element_0' && props.renderBodyAndHead ? [props.isLocal ? /*#__PURE__*/_react.default.createElement("meta", {
        key: "sys0",
        name: "robots",
        content: "noindex, follow"
      }) : null, /*#__PURE__*/_react.default.createElement("base", {
        href: props.mD.base
      }), /*#__PURE__*/_react.default.createElement("link", {
        key: "sys1",
        rel: "stylesheet",
        type: "text/css",
        href: "https://websiter.s3.us-east-2.amazonaws.com/systemClasses.css"
      }), /*#__PURE__*/_react.default.createElement("script", {
        key: "sys2",
        dangerouslySetInnerHTML: {
          __html: ` window.__MD__ = ${serialize(props.mD)};`
        }
      })] : []), ...(props.element.id === 'element_1' && props.renderBodyAndHead && !props.inEntry ? [/*#__PURE__*/_react.default.createElement("script", {
        key: "sys3",
        src: "/index.js",
        charSet: "utf-8"
      }), /*#__PURE__*/_react.default.createElement("script", {
        key: "sys4",
        src: "/vendor.js",
        charSet: "utf-8"
      }), /*#__PURE__*/_react.default.createElement("a", {
        href: "https://websiter.dev",
        style: {
          transform: 'rotate(-90deg) !important',
          color: 'white !important',
          position: 'fixed !important',
          right: '0px !important',
          bottom: '300px !important',
          zIndex: '2147483647 !important',
          display: 'block !important',
          padding: '5px 10px !important',
          borderRadius: '5px !important',
          background: 'black !important',
          transformOrigin: 'bottom right !important',
          cursor: 'pointer  !important'
        }
      }, "Created with Websiter.dev")] : [])]; // Tag = Tag.replace(/[^a-z0-9]/g, '')

      Tag = Tag.trim();

      if (/^([a-zA-Z][a-zA-Z0-9]*)$/.test(Tag)) {
        if (['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(Tag)) {
          result = /*#__PURE__*/_react.default.createElement(Tag, attributes);
        } else if (Tag === 'style') {
          result = /*#__PURE__*/_react.default.createElement(Tag, _extends({}, attributes, {
            dangerouslySetInnerHTML: {
              __html: entities.decode((0, _server.renderToString)(innerResult))
            }
          }));
        } else {
          result = /*#__PURE__*/_react.default.createElement(Tag, attributes, innerResult);
        }
      } // }

    }
  }

  return result;
};

const BuilderElement = _BuilderElement;
var _default = BuilderElement;
exports.default = _default;