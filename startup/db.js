const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')

const { Page } = require('../models/page')
const { User } = require('../models/user')

module.exports = function() {
    const db = config.get('db')
    mongoose.connect(db).then(() => {
        // User.update({}, { currentAction: 0 }, { multi: true }, function(
        //     err,
        //     numberAffected
        // ) {
        //     console.log(numberAffected)
        // })
        winston.info(`Connected to ${db}`)
    })
}
