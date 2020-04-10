"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BuilderElement = _interopRequireDefault(require("./BuilderElement/BuilderElement"));

var _refineProperties = require("./BuilderElement/methods/refineProperties");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react'); // var Layout = require('./layout')


// Contrived example to show how one might use Flow type annotations
const Index = props => {
  const mD = props.mD;
  const currentPageItemInStructure = mD.pagesStructure.find(item => item.id === mD.page);

  if (mD.structure.length > 0) {
    const bodyElement = mD.structure.filter(item => item.path.length === 1)[1];
    const bodyProps = bodyElement.properties;
    const bodyStyle = bodyElement.style;
    if (bodyStyle) bodyProps.style = bodyStyle; // for (let attr in bodyProps) {
    //     document.body.setAttribute(attr, bodyProps[attr])
    // }

    const htmlElement = mD.structure.filter(item => item.path.length === 0)[0];
    const htmlProps = htmlElement.properties;
    const htmlStyle = htmlElement.style;
    if (htmlStyle) htmlProps.style = htmlStyle; // for (let attr in htmlProps) {
    //     document.documentElement.setAttribute(attr, htmlProps[attr])
    // }

    const refinedProperties = (0, _refineProperties.refinePropertiesFromCMS)({
      resourcesObjects: mD.resourcesObjects,
      pageTemplateFSBDraft: mD.resourcesObjects[mD.template],
      currentPageFSBDraft: mD.resourcesObjects[mD.page],
      globalSettingsPageDraft: mD.resourcesObjects[mD.globalSettingsPageId],
      globalSettingsTemplateDraft: mD.resourcesObjects[mD.globalSettingsTemplateId]
    });
    const pageResult = !props.renderBody ? mD.structure.filter(itemInn => itemInn.id === 'element_01').map((itemInn, index) => {
      const result = /*#__PURE__*/React.createElement(_BuilderElement.default, {
        key: itemInn.id,
        structure: mD.structure,
        element: itemInn,
        resourceDraft: mD.template ? mD.resourcesObjects[mD.template] : {},
        currentResource: mD.template,
        pluginsPathArray: [],
        pageInStructure: currentPageItemInStructure,
        parentPluginProps: refinedProperties,
        mD: mD,
        renderBody: props.renderBody
      });
      return result;
    }) : [...mD.structure.filter(itemInn => itemInn.path.length === 2 && itemInn.path[1] === 'element_1').map((itemInn, index) => {
      const result = /*#__PURE__*/React.createElement(_BuilderElement.default, {
        key: itemInn.id,
        structure: mD.structure,
        element: itemInn,
        resourceDraft: mD.template ? mD.resourcesObjects[mD.template] : {},
        currentResource: mD.template,
        pluginsPathArray: [],
        pageInStructure: currentPageItemInStructure,
        parentPluginProps: refinedProperties,
        mD: mD,
        renderBody: props.renderBody
      });
      return result;
    }), /*#__PURE__*/React.createElement("script", {
      src: "/index.js",
      charset: "utf-8"
    }), /*#__PURE__*/React.createElement("script", {
      src: "/vendor.js",
      charset: "utf-8"
    })];
    return pageResult;
  } else {
    return null;
  }
};

var _default = Index;
exports.default = _default;