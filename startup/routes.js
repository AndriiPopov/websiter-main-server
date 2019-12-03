const express = require('express')
const cors = require('cors')
const path = require('path')
const websites = require('../routes/websites')
const resources = require('../routes/resources')
const users = require('../routes/users')
const live = require('../routes/live')
const auth = require('../routes/auth')
const awsSignS3 = require('../routes/awsSignS3')
const awsImage = require('../routes/awsImage')
const error = require('../middleware/error')

module.exports = function(app) {
    app.all('/', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        //res.header("Access-Control-Expose-Headers", "x-auth-token");
        app.use(cors())
        app.use(express.json())
        if (req.subdomains.length === 1) {
            if (req.subdomains[0] === 'my') {
                app.use(
                    express.static(
                        path.join(__dirname, '/../client/build_editor')
                    )
                )

                app.get('*', (req, res) => {
                    res.sendFile(
                        path.join(
                            __dirname + '/../client/build_editor/index.html'
                        )
                    )
                })
            } else if (req.subdomains[0] === 'api') {
                app.use('/api/websites', websites)
                app.use('/api/resources', resources)
                app.use('/api/users', users)
                app.use('/api/sign-s3', awsSignS3)
                app.use('/api/awsImage', awsImage)
                app.use('/api/auth', auth)
            } else if (req.subdomains[0] === 'live') {
                app.use(
                    express.static(
                        path.join(__dirname, '/../client/build_client_live')
                    )
                )

                app.get('*', (req, res) => {
                    res.sendFile(
                        path.join(
                            __dirname +
                                '/../client/build_client_live/index.html'
                        )
                    )
                })
            } else {
                return res.status(400).send('No page found')
            }
        }
        next()
    })
    app.use(error)
}
