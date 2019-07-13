const winston = require('winston')
const express = require('express')
const logging = require('./startup/logging')
const routes = require('./startup/routes')
const db = require('./startup/db')
const config = require('./startup/config')
const validation = require('./startup/validation')
const prod = require('./startup/prod')

const app = express()

logging()
routes(app)
db()
config()
validation()
prod(app)

const port = process.env.PORT || 5000
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
)

module.exports = server
