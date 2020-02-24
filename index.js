const winston = require('winston')
const express = require('express')
const logging = require('./startup/logging')
const routes = require('./startup/routes')
// const db = require('./startup/db')
const validation = require('./startup/validation')
const prod = require('./startup/prod')
const aws = require('aws-sdk')
const passport = require('passport')
const sslRedirect = require('heroku-ssl-redirect')
const connectSocket = require('./startup/connectSocket')
const rateLimiterMiddleware = require('./middleware/rateLimiter')
const mongoose = require('mongoose')
const WebSocket = require('ws')

const app = express()
app.use(rateLimiterMiddleware)
app.use(sslRedirect())

const apiApp = express()
apiApp.use(passport.initialize())

const liveApp = express()

const myApp = express()
myApp.use(passport.initialize())

aws.config.region = 'us-east-2'

logging()
routes(app, myApp, liveApp, apiApp)
validation()
//db()
const db = process.env.websiter_db
// const db =
//     'mongodb://mainServer:20websiter20@ds321819-a0.mlab.com:21819,ds321819-a1.mlab.com:21819/websiter?replicaSet=rs-ds321819'
mongoose.connect(db).then(async () => {
    // User.update({}, { currentAction: 0 }, { multi: true }, function(
    //     err,
    //     numberAffected
    // ) {
    //     console.log(numberAffected)
    // })
    winston.info(`Connected to ${db}`)
    prod(app)
    prod(liveApp)
    prod(apiApp)
    prod(myApp)

    app.engine('html', require('ejs').renderFile)
    liveApp.engine('html', require('ejs').renderFile)
    apiApp.engine('html', require('ejs').renderFile)
    myApp.engine('html', require('ejs').renderFile)

    app.use(express.static('./public'))
    liveApp.use(express.static('./public'))
    apiApp.use(express.static('./public'))
    myApp.use(express.static('./public'))
    //app.use(express.static(__dirname + '/public'))

    const port = process.env.PORT
    const server = await app.listen(port, () => {
        winston.info(`Listening on port ${port}...`)
    })
    const wss = new WebSocket.Server({ server })
    connectSocket(wss)
})
