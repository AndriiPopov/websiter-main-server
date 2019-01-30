const Joi = require('joi');
const mongoose = require('mongoose');

module.exports.Page = mongoose.model('Page', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 50
  },
  title: {
    type: String,
    trim: true, 
    maxlength: 255
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  website: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Websites'
  },
  content: {},
  isHidden: Boolean,
  publishedVersion: {}
}));

module.exports.validatePage = page => {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    title: Joi.string().max(255),
    description: Joi.string().max(2000),
    website: Joi.objectId().required(),
    content: Joi.object(),
    isVisible: Joi.bool(),
    publishedVersion: Joi.object(),
  };

  return Joi.validate(page, schema);
};

module.exports.validatePageUpdate = page => {
  const schema = {
    title: Joi.string().min(1).max(50),
    website: Joi.objectId(),
    content: Joi.object(),
    isVisible: Joi.bool(),
    publishedVersion: Joi.object(),
  };

  return Joi.validate(page, schema);
};