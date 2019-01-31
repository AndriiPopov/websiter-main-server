const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

const { Page } = require('../models/page');

module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(
      
      () => {
        Page.update(
          {},
          {isHidden: false},
          {multi:true}, 
             function(err, numberAffected){  
               console.log(numberAffected);
             });
        winston.info(`Connected to ${db}`)}
    );
}
