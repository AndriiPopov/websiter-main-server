const express = require('express');
const router = express.Router();
const _ = require('lodash');

const auth = require('../middleware/auth');

const { Website } = require('../models/website');
const { Page, validatePage, validatePageUpdate } = require('../models/page');

// router.get('/', auth, async (req, res) => {
//   const pages = await Website
//     .findById(req.query.website)
//     .populate('pages');
//   res.send(_.pick(pages, 'pages'));
// });

router.post('/publish', auth, async (req, res) => {
  const pagesToPublish = [];
  if(req.body.publishOne) {
    pagesToPublish.push(req.body.currentPageId);
  } else {
    const  website = await Website.findById(req.body.websiteId);
    if(!website) return res.status(404).send('The website with the given ID was not found.');
    pagesToPublish.concat(website.pagesStructure.map(page => page.id));
  }
  await Promise.all(pagesToPublish.map(async pageId => {
    
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).send('The page with the given ID was not found.');
    page.publishedVersion = _.omit(page.toObject(), ['publishedVersion']);
    await page.save();
  }));

  res.send({
    success: true
  });
});

router.post('/revert', auth, async (req, res) => {
  const pagesToRevert = [];
  if(req.body.publishOne) {
    pagesToRevert.push(req.body.currentPageId);
  } else {
    const  website = await Website.findById(req.body.websiteId);
    if(!website) return res.status(404).send('The website with the given ID was not found.');
    pagesToRevert.concat(website.pagesStructure.map(page => page.id));
  }
  const pagesObjects = {};
  await Promise.all(pagesToRevert.map(async pageId => {
    const page = await Page.findById(pageId);
    if (!page) return res.status(404).send('The page with the given ID was not found.');
    page.set(page.publishedVersion);
    pagesObjects[pageId] = page;
    await page.save();
  }));

  res.send({
    pagesObjects
  });
});

router.post('/', auth, async (req, res) => {
  // const { error } = validatePage(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);
  const  website = await Website.findById(req.body.websiteId);
  const { page, pagesStructure } = await website.createPage(website, req.body.currentPageId, req.body.duplicate);
  
  await website.save();
  res.send({
    page,
    pagesStructure
  });
});

router.put('/:id', auth, async (req, res) => {
  // const { error } = validatePageUpdate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  const newPage = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!newPage) return res.status(404).send('The page with the given ID was not found.');
  
  res.send(newPage._id);
});

router.delete('/:id', auth, async (req, res) => {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).send('The page with the given ID was not found.');

    let website = await Website.findById(page.websiteId);
    if (!website) return res.status(404).send('The website with the given ID was not found.');

    await website.deletePage(website, page._id);
    website = await website.save();
    res.send({
      pagesStructure: website.pagesStructure
    });
});

// router.get('/:id', auth, async (req, res) => {
//     const page = await Page.findById(req.params.id);

//     if (!page) return res.status(404).send('The page with the given ID was not found.');

//     res.send(page);
// });

module.exports = router;