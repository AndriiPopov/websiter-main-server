const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { Page } = require('../models/page');
const { findDescendants } = require('../utils/pagesStructure')

const websiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 255
  },
  header: { 
    type: String,  
    minlength: 1
  },
  footer: { 
    type: String,  
    minlength: 1
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
  bufferElements: { 
    type: String,  
    minlength: 1
  },
  pagesStructure: []
});

const blankPageContent = {
  sectionsOnPage: ['element_0', 'element_4'],
  currentId: 6,
  element_0: {
      type: 'section',
      height: 200,
      space: 50,
      background: 'rgba(200, 100, 30)',
      header: false,
      footer: false,
      allPages: false,
      children: ['element_3', 'element_1'],
      styles: []
  },
  element_1: {
      type: 'box',
      height: 100,
      width: 100,
      left: 200,
      top: 100,
      background: 'rgba(100, 0, 80)',
      zIndex: 0,
      children: ['element_2'],
      parent: 'element_0',
      styles: ['element_1_element_0_hover']
  },
  element_2: {
      type: 'box',
      height: 50,
      width: 50,
      left: 100,
      top: 200,
      background: 'rgba(10, 200, 90)',
      zIndex: 0,
      children: [],
      parent: 'element_1',
      styles: []
  },
  element_3: {
      type: 'box',
      height: 50,
      width: 50,
      left: 200,
      top: 200,
      background: 'rgba(170, 100, 200)',
      zIndex: 1,
      children: [],
      parent: 'element_0',
      styles: []
  },
  element_1_element_0_hover: {
      type: 'hover',
      influencer: 'element_0',
      left: 0,
      top: 0
  },
  element_4: {
      type: 'section',
      height: 500,
      space: 50,
      background: 'rgba(200, 100, 30)',
      backgroundOn: true,
      header: false,
      footer: false,
      allPages: false,
      children: ['element_5'],
      styles: []
  },
  element_5: {
      type: 'text',
      height: 400,
      width: 400,
      left: 500,
      top: 40,
      background: 'rgba(170, 100, 200)',
      backgroundOn: true,
      zIndex: 1,
      children: [],
      parent: 'element_4',
      styles: [],
      textContent: '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"A line of tsdfdsfsdfdsds;lkfsd;kfsd;lfk.","marks":[]}]}]}]}}'
  }
}

websiteSchema.methods.createPage = async (website, currentPage, duplicate) => {
  let page;
  if (!duplicate) {
    page = new Page();
    page.name = 'New page';
    page.website = website;
    page.isHidden = false;
    page.publishedVersion = {};
    page.content = blankPageContent;
    page.markModified('content');
    page = await page.save();
  } else {
    const currentPageObject = Page.findById(currentPage);
    page = new Page();
    page.name = 'New page';
    page.website = website;
    page.content = {...currentPageObject.content};
    page.markModified('content');
    page = await page.save();
  }

  let newPageStructureElement;
  if(!currentPage) {
    website.pagesStructure.push({ 
      id: page._id, 
      path: [] 
    });
  } else {
    const currentPageObjectArray = website.pagesStructure.filter( page => page.id.toString() === currentPage.toString() );
    if (currentPageObjectArray.length > 0) {
      const currentPageObject = currentPageObjectArray[0];
      const currentIndex = website.pagesStructure.indexOf(currentPageObject);

      const descendants = findDescendants(website.pagesStructure, currentPageObject.id);
      newPageStructureElement = { 
        id: page._id, 
        path: [...currentPageObject.path] 
      };
      website.pagesStructure.splice(currentIndex + descendants.length + 1, 0, newPageStructureElement);
    } else {
      website.pagesStructure.push({
        id: page._id, 
        path: [] 
      });
    }
  }

  website.markModified('pagesStructure');
  return {
    page,
    pagesStructure: website.pagesStructure
  };
};

websiteSchema.methods.deletePage = async (website, pageId) => {
  const descedants = findDescendants(website.pagesStructure, pageId).map( item => 
    item.id);
  descedants.push(pageId);

  await Promise.all(descedants.map(async id => {
    website.pagesStructure = website.pagesStructure.filter(item => 
      item.id.toString() != id.toString());
    await Page.findByIdAndRemove(id);
  }));

  website.markModified('pagesStructure');
};



module.exports.Website = mongoose.model('Website', websiteSchema);

module.exports.validateWebsite = website => {
  const schema = {
    title: Joi.string().min(1).max(50),
    header: Joi.string().min(1),
    footer: Joi.string().min(1),
    domain: Joi.string().min(1).max(255),
    bufferElements: Joi.string(),
    pagesStructure: Joi.array()
  };

  return Joi.validate(website, schema);
};