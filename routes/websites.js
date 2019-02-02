const express = require('express');
const router = express.Router();
const _ = require('lodash');

const auth = require('../middleware/auth');

const { User } = require('../models/user');
const { Website, validateWebsite } = require('../models/website');
const { Page } = require('../models/page');

router.get('/', auth, async (req, res) => {
  const websites = await User
    .findById(req.user)
    .populate('websites', 'title domain');
  res.send(_.pick(websites, 'websites'));
});

router.post('/', auth, async (req, res) => {
  const user = await User.findById(req.user);

  const website = await user.createWebsite();

  const pagesObjects = {};
  await Promise.all(website.pagesStructure.map( async item => {
    pagesObjects[item.id] = await Page.findById(item.id);
  }));

  user.websites.push(website._id);
  const websites = await Promise.all(user.websites.map( async id => {
    const website = await Website.findById(id);
    return _.pick(website, ['_id', 'domain', 'title']);
  }));

  await user.save();

  res.send({
    website,
    websites,
    pagesObjects
  });
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateWebsite(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const website = await Website.findByIdAndUpdate(req.params.id, req.body , {
    new: true
  });
  if (!website) return res.status(404).send('The website with the given ID was not found.');

  res.send({
    status: true
  });
});

router.delete('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user);
    await user.deleteWebsite(req.params.id, res, user);

    const websites = await Promise.all(user.websites.map( async id => {
      const website = await Website.findById(id);
      return _.pick(website, ['_id', 'domain', 'title']);
    }));
    
    let website = null;
    const pagesObjects = {};
    if (websites.length > 0) {
      chosenWebsite = await Website.findById(websites[0]._id);
      await Promise.all(website.pagesStructure.map( async item => {
        pagesObjects[item.id] = await Page.findById(item.id);
      }));
    }


    res.send({
      website,
      websites,
      pagesObjects
    });
});

router.get('/:id', auth, async (req, res) => {
  const website = await Website.findById(req.params.id);
  if (!website) return res.status(404).send('The website with the given ID was not found.');

  const pagesObjects = {};
  await Promise.all(website.pagesStructure.map( async item => {
    pagesObjects[item.id] = await Page.findById(item.id);
  }));

  res.send({
    website,
    pagesObjects
  });
});

module.exports = router;