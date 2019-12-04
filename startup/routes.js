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
const vhost = require('vhost')

module.exports = function(app, myApp, liveApp, apiApp) {
    app.all('/', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        //res.header("Access-Control-Expose-Headers", "x-auth-token");
        app.use(cors())
        app.use(express.json())
        next()
    })
    app.use(vhost('my.websiter.dev', myApp))
    app.use(vhost('api.websiter.dev', apiApp))
    app.use(vhost('live.websiter.dev', liveApp))
    app.use(error)

    myApp.use(express.static(path.join(__dirname, '/../client/build_editor')))
    myApp.use('/api/auth', auth)
    myApp.get('*', (req, res) => {
        res.sendFile(
            path.join(__dirname + '/../client/build_editor/index.html')
        )
    })

    apiApp.use('/api/websites', websites)
    apiApp.use('/api/resources', resources)
    apiApp.use('/api/users', users)
    apiApp.use('/api/sign-s3', awsSignS3)
    apiApp.use('/api/awsImage', awsImage)
    apiApp.use('/api/auth', auth)

    liveApp.use(
        express.static(path.join(__dirname, '/../client/build_client_live'))
    )
    liveApp.get('*', (req, res) => {
        res.sendFile(
            path.join(__dirname + '/../client/build_client_live/index.html')
        )
    })
}
