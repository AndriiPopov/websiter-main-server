const winston = require('winston');
const mongoose = require('mongoose');

const { Page } = require('../models/page');

module.exports = function() {
  mongoose.connect('mongodb://localhost/websiter')
    .then(
      
      () => {
        Page.update(
          {},
          {isHidden: false},
          {multi:true}, 
             function(err, numberAffected){  
               console.log(numberAffected);
             });
        winston.info('Connected to MongoDB...')}
    );
}
