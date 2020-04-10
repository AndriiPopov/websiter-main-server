"use strict";

const {
  User
} = require('../models/user');

const {
  Website
} = require('../models/website');

const {
  Resource
} = require('../models/resource');

const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);
const validateSchema = Joi.object({
  id: Joi.objectId().required(),
  type: Joi.string().valid('user', 'website', 'resource')
}).unknown();

module.exports.requestResource = async (data, ws) => {
  try {
    const {
      error
    } = validateSchema.validate(data);
    if (error) return;

    if (data.id && data.type) {
      let resource;
      if (data.type === 'user') resource = await User.findById(data.id);else if (data.type === 'website') resource = await Website.findById(data.id);else if (data.type === 'resource') resource = await Resource.findById(data.id);

      if (resource) {
        if (data.type === 'resource') {
          resource = {
            draft: !resource.draft.structure ? resource.published : resource.draft,
            present: {},
            future: [],
            past: [],
            __v: resource.__v,
            _id: resource._id
          };
        }

        ws.resources[data.id] = resource.__v;
        ws.send(JSON.stringify({
          messageCode: 'addResource',
          resource
        }));
      } else {
        ws.send(JSON.stringify({
          messageCode: 'notFoundResource',
          _id: data.id
        }));
      }
    }
  } catch (ex) {}
};