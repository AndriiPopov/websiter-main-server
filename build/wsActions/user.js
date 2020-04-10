"use strict";

const cloneDeep = require('lodash/cloneDeep');

const isEmpty = require('lodash/isEmpty');

const {
  User
} = require('../models/user');

const {
  Website
} = require('../models/website');

const {
  sendError
} = require('./error');

const {
  getUserRights
} = require('../utils/getUserRights');

module.exports.deleteUser = async ws => {
  try {
    if (ws.tryWebsiter) {
      sendError(ws, 'This action is not allowed in test mode. Please login or create a new account.');
      return;
    }

    const user = await User.findById(ws.user);

    if (!user) {
      sendError(ws);
      return;
    }

    await Promise.all(user.websites.map(async website => {
      await user.deleteWebsite(website.id);
    }));
    await User.findByIdAndRemove(user._id);
    ws.send(JSON.stringify({
      messageCode: 'logout'
    }));
    ws.terminate();
  } catch (ex) {
    sendError(ws);
  }
};

module.exports.logoutAll = async (ws, wss) => {
  try {
    if (ws.tryWebsiter) {
      sendError(ws, 'This action is not allowed in test mode. Please login or create a new account.');
      return;
    }

    const user = await User.findById(ws.user);

    if (!user) {
      sendError(ws);
      return;
    }

    user.logoutAllDate = new Date().getTime();
    await user.save();
    wss.clients.forEach(client => {
      if (client.isAlive) {
        if (client.user.toString() === ws.user.toString()) {
          ws.send(JSON.stringify({
            messageCode: 'logout'
          }));
          ws.terminate();
        }
      }
    });
  } catch (ex) {
    sendError(ws);
  }
};