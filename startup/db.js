const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function() {
    const db = process.env.db
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
