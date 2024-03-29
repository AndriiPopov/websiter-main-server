"use strict";

const {
  updateIfCurrentPlugin
} = require('mongoose-update-if-current');

const mongoose = require('mongoose');

const {
  Resource
} = require('./resource');

const {
  findDescendants
} = require('../utils/resourcesStructure');

const {
  structureType,
  currentType
} = require('../utils/resourceTypeIndex');

const buildRelUrls = require('../utils/buildRelUrls');

const websiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  domain: {
    type: String,
    minlength: 1,
    maxlength: 255,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true
  },
  sharing: [],
  domainHidden: {
    type: Boolean
  },
  customDomainHidden: {
    type: Boolean
  },
  customDomain: {
    type: String,
    maxlength: 255,
    lowercase: true,
    trim: true,
    sparse: true
  },
  customDomainApp: {
    type: String,
    maxlength: 1000
  },
  customDomainVerified: {
    type: Boolean
  },
  customDomainId: {
    type: String
  },
  cname: {
    type: String
  },
  verifyCode: {
    type: String
  },
  user: {
    type: String
  },
  nextFileId: {
    type: Number
  },
  filesStructure: [],
  pagesStructure: [],
  pluginsStructure: [],
  templatesStructure: [],
  storage: {
    type: Number,
    required: true,
    min: 0
  },
  practiceType: {
    type: Boolean
  },
  __patch__: {}
}, {
  minimize: false
});
websiteSchema.plugin(updateIfCurrentPlugin);
const blankTemplateContent = {
  currentId: 3,
  structure: [{
    id: 'element_02',
    path: [],
    tag: 'CMS variables'
  }, {
    id: 'element_01',
    path: [],
    tag: 'html'
  }, {
    id: 'element_0',
    path: ['element_01'],
    tag: 'head'
  }, {
    id: 'element_1',
    path: ['element_01'],
    tag: 'body'
  }, {
    id: 'element_2',
    path: ['element_01', 'element_1'],
    tag: 'div'
  }],
  values: {
    element_02: {
      properties: {},
      style: ''
    },
    element_01: {
      properties: {},
      style: ''
    },
    element_0: {
      properties: {},
      style: ''
    },
    element_1: {
      properties: {},
      style: ''
    },
    element_2: {
      properties: {},
      style: 'height: 100px;width: 100px;left: 200px;top: 100px;z-index: 0;background: rgba(100, 0, 80);'
    }
  },
  connectedResources: []
};
const blankTemplateContentGlobal = {
  currentId: 3,
  structure: [{
    id: 'element_02',
    path: [],
    tag: 'CMS variables'
  }],
  values: {
    element_02: {
      properties: {},
      style: ''
    }
  },
  connectedResources: []
};
const blankPageContent = {
  structure: [],
  values: {},
  connectedResources: []
};
const blankPluginContent = {
  currentId: 1,
  structure: [{
    id: 'element_0',
    path: [],
    tag: 'Main element'
  }],
  values: {
    element_0: {
      properties: {}
    }
  },
  connectedResources: []
};

websiteSchema.methods.createResource = async function (currentResource, type, duplicate, resourceData, newResourceName) {
  try {
    const generateNewName = (name, attr, divider, i) => {
      let currentName = i ? name + divider + i : name;

      while (this[structureType[type]].some(item => item[attr] === currentName)) {
        i++;
        currentName = name + divider + i;
      }

      return i;
    };

    const getNewNameAndUrl = (name, url) => {
      let max = 0,
          nameIndex = 0,
          urlIndex = 0;

      do {
        nameIndex = generateNewName(name, 'name', ' ', max);
        urlIndex = generateNewName(url, 'url', '-', max);
        max = Math.max(nameIndex, urlIndex);
      } while (nameIndex !== urlIndex);

      let nameAdd = '';
      let urlAdd = '';

      if (max > 0) {
        nameAdd = ' ' + max;
        urlAdd = '-' + max;
      }

      return {
        nameAdd,
        urlAdd
      };
    };

    const prepareDataCreteNewResource = async () => {
      try {
        let resource = new Resource();
        resource.website = this._id.toString();
        resource.draft = {};

        if (!resourceData) {
          resource.published = type === 'page' ? blankPageContent : type === 'plugin' ? blankPluginContent : blankTemplateContent;
        } else {
          resource.published = resourceData;
        }

        resource.markModified('draft');
        resource.markModified('published');
        resource = await resource.save();
        this[currentType[type]] = resource._id.toString();
        let data = {};

        if (type === 'page') {
          let {
            nameAdd,
            urlAdd
          } = getNewNameAndUrl('New page', 'new-page');
          data.name = 'New page' + nameAdd;
          data.url = 'new-page' + urlAdd;
          data.hidden = true;
          return {
            resource,
            data
          };
        } else {
          const nameIndex = generateNewName('New ' + type, 'name', ' ', 0);
          let nameAdd = '';

          if (nameIndex > 0) {
            nameAdd = ' ' + nameIndex;
          }

          data.name = newResourceName || 'New ' + type + nameAdd;
          return {
            resource,
            data
          };
        }
      } catch (ex) {
        return;
      }
    };

    const prepareDataDuplicate = async () => {
      try {
        const currentResourceObject = await Resource.findById(currentResource);
        const currentResourceDataArray = this[structureType[type]].filter(item => item.id.toString() === currentResource);

        if (!currentResourceObject || currentResourceDataArray.length !== 1) {
          return {
            resource: null,
            data: null
          };
        }

        let currentResourceData;
        currentResourceData = currentResourceDataArray[0];
        if (currentResourceData.generalSettings) return {
          resource: null,
          data: null
        };
        let resource = new Resource();
        resource.website = this._id.toString();
        resource.published = currentResourceObject.published;
        resource.draft = currentResourceObject.draft;
        resource.markModified('draft');
        resource.markModified('published');
        resource = await resource.save();
        this[currentType[type]] = resource._id.toString();
        let data = {};

        if (type === 'page') {
          let {
            nameAdd,
            urlAdd
          } = getNewNameAndUrl(currentResourceData.name, currentResourceData.url);
          if (currentResourceData.name) data.name = currentResourceData.name + nameAdd;
          if (currentResourceData.url) data.url = currentResourceData.url + urlAdd;
          data.template = currentResourceData.template || '';
          data.hidden = true;
          return {
            resource,
            data
          };
        } else {
          const nameIndex = generateNewName(currentResourceData.name, 'name', ' ', 0);
          let nameAdd = '';

          if (nameIndex > 0) {
            nameAdd = ' ' + nameIndex;
          }

          data.name = currentResourceData.name + nameAdd;
          return {
            resource,
            data
          };
        }
      } catch (ex) {
        return;
      }
    };

    const {
      resource,
      data
    } = duplicate ? await prepareDataDuplicate() : await prepareDataCreteNewResource();
    if (!resource || !data) return;
    data.published = true;

    if (type === 'page') {
      if (this.pagesStructure.length > 0) {
        data.homepage = false;
      } else {
        data.homepage = true;
      }
    }

    let newResourceStructureElement;

    if (!currentResource) {
      this[structureType[type]].push({
        id: resource._id.toString(),
        path: [],
        ...data
      });
    } else {
      const currentResourceObjectArray = this[structureType[type]].filter(resource => resource.id.toString() === currentResource.toString());

      if (currentResourceObjectArray.length > 0) {
        const currentResourceObject = currentResourceObjectArray[0];
        const currentIndex = this[structureType[type]].indexOf(currentResourceObject);
        const descendants = findDescendants(this[structureType[type]], currentResourceObject.id);

        if (duplicate && currentResourceObject.connectedResources) {
          data.connectedResources = currentResourceObject.connectedResources;
        }

        newResourceStructureElement = {
          id: resource._id.toString(),
          path: [...currentResourceObject.path],
          ...data
        };
        this[structureType[type]].splice(currentIndex + descendants.length + 1, 0, newResourceStructureElement);
      } else {
        this[structureType[type]].push({
          id: resource._id.toString(),
          path: [],
          ...data
        });
      }
    }

    if (type === 'page') this[structureType[type]] = buildRelUrls(this[structureType[type]], true);
    this.markModified(structureType[type]);
    return {
      resource,
      data
    };
  } catch (ex) {
    return;
  }
};

websiteSchema.methods.createGlobalSettingsResource = async function (type) {
  try {
    let resource = new Resource();
    resource.website = this._id.toString();
    resource.draft = {};
    resource.published = type === 'page' ? blankPageContent : blankTemplateContentGlobal;
    resource.markModified('draft');
    resource.markModified('published');
    resource = await resource.save();
    if (!resource) return;
    this[currentType[type]] = resource._id.toString();
    this[structureType[type]].unshift({
      id: resource._id.toString(),
      name: 'Global website settings',
      url: '__general__settings__',
      hidden: true,
      path: [],
      published: true,
      generalSettings: true,
      ...(type === 'page' ? {
        template: 'Global website settings'
      } : {})
    });
    this.markModified(structureType[type]);
    return resource;
  } catch (ex) {
    console.log(ex);
  }
};

websiteSchema.methods.deleteResource = async function (resourceId, type) {
  const itemInStructure = this[structureType[type]].find(item => item.id.toString() === resourceId.toString());
  if (!itemInStructure) return;
  if (itemInStructure.generalSettings) return;
  const descedants = findDescendants(this[structureType[type]], resourceId).map(item => item.id);
  descedants.push(resourceId);
  const thisObject = this.toObject();

  for (let id of descedants) {
    this[structureType[type]] = thisObject[structureType[type]].filter(item => item.id.toString() !== id.toString());
    await Resource.findByIdAndRemove(id);
  }

  if (type === 'page') {
    if (!this.pagesStructure.some(item => item.isHomePage)) {
      if (this.pagesStructure.length > 0) {
        this.pagesStructure[0].isHomePage = true;
      }
    }

    this.pagesStructure = buildRelUrls(this.pagesStructure, true);
  }

  this.markModified(structureType[type]);
  return true;
};

module.exports.Website = mongoose.model('Website', websiteSchema);