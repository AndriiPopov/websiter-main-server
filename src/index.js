import winston from 'winston'
import express from 'express'
import logging from './startup/logging'
import routes from './startup/routes'
import db from './startup/db'
import config from './startup/config'
import validation from './startup/validation'
import prod from './startup/prod'

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

export default server
