"use strict";

module.exports.fireCallback = (ws, callbackId) => {
  try {
    ws.send(JSON.stringify({
      messageCode: 'fireCallback',
      callbackId
    }));
  } catch (ex) {}
};