const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { Page } = require('../models/page');
const { Website } = require('../models/website');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const websites = await Promise.all(user.websites.map( async id => {
    const website = await Website.findById(id);
    return _.pick(website, ['_id', 'domain', 'title']);
  }));

  const website = await Website.findById(user.websites[0]);

  const pagesObjects = {};
  await Promise.all(website.pagesStructure.map( async item => {
    pagesObjects[item.id] = await Page.findById(item.id);
  }));

  const token = user.generateAuthToken();
  res
    .header('X-Auth-Token', token)
    .send({
      ..._.pick(user, ['_id', 'email', 'websites']) ,
      token: token,
      expiresIn: 3600000,
      websites,
      website,
      pagesObjects
    });
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
