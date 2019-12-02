const winston = require('winston')
const express = require('express')
const logging = require('./startup/logging')
const routes = require('./startup/routes')
const db = require('./startup/db')
const validation = require('./startup/validation')
const prod = require('./startup/prod')
const aws = require('aws-sdk')
const passport = require('passport')
const sslRedirect = require('heroku-ssl-redirect')

const app = express()

app.use(sslRedirect())

aws.config.region = 'us-east-2'
app.use(passport.initialize())

logging()
routes(app)
db()
validation()
prod(app)
app.engine('html', require('ejs').renderFile)
app.use(express.static('./public'))

const port = process.env.PORT
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
)

module.exports = server
