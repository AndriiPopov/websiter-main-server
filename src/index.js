const winston = require('winston')
const express = require('express')
const logging = require('./startup/logging')
const routes = require('./startup/routes')
const db = require('./startup/db')
const validation = require('./startup/validation')
const prod = require('./startup/prod')
const aws = require('aws-sdk')
const passport = require('passport')
const connectSocket = require('./startup/connectSocket')
const rateLimiterMiddleware = require('./middleware/rateLimiter')
const oneOffTask = require('./startup/oneOffTask')

const app = express()
// app.use(rateLimiterMiddleware)

const apiApp = express()
apiApp.use(passport.initialize())

const liveApp = express()

const logisionApp = express()

const myApp = express()
myApp.use(passport.initialize())

aws.config.region = 'us-east-2'

logging()
routes(app, myApp, liveApp, apiApp, logisionApp)
db()
// sedtTimeout(oneOffTask, 3000)
validation()

prod(app)
prod(liveApp)
prod(apiApp)
prod(myApp)
prod(logisionApp)

// app.engine('html', require('ejs').renderFile)
// liveApp.engine('html', require('ejs').renderFile)
// apiApp.engine('html', require('ejs').renderFile)
// myApp.engine('html', require('ejs').renderFile)

app.use(express.static('./public'))
liveApp.use(express.static('./public'))
apiApp.use(express.static('./public'))
myApp.use(express.static('./public'))
//app.use(express.static(__dirname + '/public'))

const port = process.env.PORT
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
)
connectSocket(server)
module.exports = server
