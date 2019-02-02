const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const { Website } = require('../models/website');
const { Page } = require('../models/page');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  websites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Website'
  }]
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: !this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
};

userSchema.methods.createWebsite = async function() { 
  let website = new Website({title: 'New website'});
  await website.createPage(website, website);
  website = await website.save();
  return website;
};

userSchema.methods.deleteWebsite = async (_id, res, user) => { 
  const website = await Website.findById(_id);
  if (!website) return res.status(404).send('The website with the given ID was not found.');

  await Promise.all(website.pagesStructure.map( async item => {
    await Page.findByIdAndRemove(item.id)
  }));
  await Website.findByIdAndRemove(_id);
  const index = user.websites.indexOf(_id);
  user.websites.splice(index, 1);
  await user.save();
};

module.exports.User = mongoose.model('User', userSchema);

module.exports.validateUser = user => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
    websites: Joi.array().items(Joi.objectId())
  };

  return Joi.validate(user, schema);
}