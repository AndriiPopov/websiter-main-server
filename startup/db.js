const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function() {
    try {
        const db = process.env.websiter_db
        // const db =
        //     'mongodb://mainServer:20websiter20@ds321819-a0.mlab.com:21819,ds321819-a1.mlab.com:21819/websiter?replicaSet=rs-ds321819'
        return mongoose.connect(db).then(() => {
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
