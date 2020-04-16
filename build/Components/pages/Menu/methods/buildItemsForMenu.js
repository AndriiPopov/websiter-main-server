"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _basic = require("../../utils/basic");

var _default = props => {
  const buildMenuItems = menuItems => {
    let structureAfterVariables = [];
    const structure = [];

    if (menuItems) {
      menuItems.forEach(item => {
        if (item.generatedFrom === 'variable') {
          if (props.parentPluginProps[item.name]) {
            structureAfterVariables = [...structureAfterVariables, ...props.parentPluginProps[item.name]];
          }
        } else {
          structureAfterVariables.push(item);
        }
      });
      structureAfterVariables.forEach(item => {
        if (item.generatedFrom === 'all') {
          props.mD.pagesStructure.forEach(page => {
            if (!page.hidden) {
              structure.push({
                name: page.name,
                properties: item.properties,
                id: item.id + page.id,
                path: [...item.path, ...page.path.map(l => item.id + l)],
                url: props.mD.baseUrl + page.url
              });
            }
          });
        } else if (item.all) {
          props.mD.pagesStructure.forEach(page => {
            if (page.path.includes(item.generatedFrom) && !page.hidden) {
              structure.push({
                id: item.id + page.id,
                name: page.name,
                properties: item.properties,
                path: [...item.path, ...page.path.slice(page.path.indexOf(item.generatedFrom) - 1).map(l => item.id + l)],
                url: props.mD.baseUrl + page.url
              });
            }
          });
        } else if (item.generatedFrom !== 'link') {
          props.mD.pagesStructure.forEach(page => {
            if (page.id === item.generatedFrom && !page.hidden) {
              structure.push({
                id: item.id,
                name: item.name,
                properties: item.properties,
                path: item.path,
                url: props.mD.baseUrl + page.url
              });
            }
          });
        } else if (item.generatedFrom === 'link') {
          structure.push({
            id: item.id,
            name: item.name,
            path: item.path,
            url: item.properties ? item.properties.url || '' : '',
            properties: item.properties
          });
        }
      });
    }

    return structure;
  }; // const hiddenPages = []
  // props.mD.pagesStructure.forEach(page => {
  //     if (page.hidden) hiddenPages.push(page.id)
  // })
  // props.mD.pagesStructure.forEach(page => {
  //     page.path.forEach(id => {
  //         if (hiddenPages.includes(id)) {
  //             hiddenPages.push(page.id)
  //         }
  //     })
  // })


  return (0, _basic.buildTree)(buildMenuItems(props.elementValues.menuItems));
};

exports.default = _default;