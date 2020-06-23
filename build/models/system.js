"use strict";

const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
  currentWebsiteId: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: 'system'
  },
  courses: {}
});
const System = mongoose.model('System', systemSchema);
module.exports.System = System;

module.exports.generateWebsiteId = async () => {
  try {
    let system = await System.findOne({
      name: 'system'
    });

    if (!system) {
      system = new System({
        currentWebsiteId: 0,
        name: 'system',
        courses: {}
      });
      await system.save();
    }

    const id = system.currentWebsiteId;
    system.currentWebsiteId = system.currentWebsiteId + 1;
    await system.save();
    return id;
  } catch (ex) {
    console.log('Generate website id failed.');
  }
};