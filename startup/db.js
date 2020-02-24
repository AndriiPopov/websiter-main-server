const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function() {
    try {
        // const db = process.env.websiter_db
        const db = 'mongodb://new:new421@ds117145.mlab.com:17145/websiter'
        mongoose.connect(db).then(() => {
            // User.update({}, { currentAction: 0 }, { multi: true }, function(
            //     err,
            //     numberAffected
            // ) {
            //     console.log(numberAffected)
            // })
            winston.info(`Connected to ${db}`)
        })
    } catch (ex) {}
}
