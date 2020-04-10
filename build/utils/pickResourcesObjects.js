"use strict";

const {
  Resource
} = require('../models/resource');

const isEmpty = require('lodash/isEmpty');

module.exports.pickResourcesObjectsLive = async (website, whitelist) => {
  try {
    const result = {};
    const resourcesArray = [...website.pagesStructure, ...website.pluginsStructure, ...website.templatesStructure];
    await Promise.all(resourcesArray.map(async item => {
      if (whitelist.includes(item.id)) {
        const resourceObject = await Resource.findById(item.id, 'published');

        if (resourceObject) {
          result[item.id] = resourceObject.published;
        }
      }
    }));
    return result;
  } catch (ex) {}
};