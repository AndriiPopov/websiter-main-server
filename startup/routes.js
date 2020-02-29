const express = require('express')
const cors = require('cors')
const path = require('path')
const users = require('../routes/users')
const auth = require('../routes/auth')
const resources = require('../routes/resources')
const tryWebsiter = require('../routes/tryWebsiter')
const awsSignS3 = require('../routes/awsSignS3')
const error = require('../middleware/error')
const vhost = require('vhost')

module.exports = function(app, myApp, liveApp, apiApp) {
    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Frame-Options', 'deny')
        res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE')
        //res.header("Access-Control-Expose-Headers", "x-auth-token");

        //app.use(express.json())
        // console.log('here')
        next()
    })

    app.use(vhost('my.websiter.dev', myApp))
    app.use(vhost('my.websiter.dev:5000', myApp))
    app.use(vhost('api.websiter.dev', apiApp))
    app.use(vhost('api.websiter.dev:5000', apiApp))
    app.use(vhost('api.localwebsiter.dev', apiApp))
    app.use(vhost('live.websiter.dev', liveApp))
    app.use(vhost('*', liveApp))
    app.use(vhost('*.*', liveApp))

    myApp.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Frame-Options', 'deny')
        //res.header("Access-Control-Expose-Headers", "x-auth-token");
        //app.use(cors({ origin: 'https://my.websiter.dev' }))
        // app.use(express.json())
        next()
    })

    apiApp.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Frame-Options', 'deny')
        //res.header("Access-Control-Expose-Headers", "x-auth-token");
        //app.use(cors({ origin: 'https://api.websiter.dev' }))
        // app.use(express.json())
        next()
    })

    liveApp.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.header('X-Frame-Options', 'deny')
        //res.header("Access-Control-Expose-Headers", "x-auth-token");
        //app.use(cors({ origin: 'https://live.websiter.dev' }))
        // app.use(express.json())
        next()
    })

    myApp.use(express.json())
    myApp.use(express.static(path.join(__dirname, '/../client/build_editor')))
    myApp.use('/api/auth', auth)
    myApp.use('/try', tryWebsiter)

    myApp.get('*', (req, res) => {
        res.sendFile(
            path.join(__dirname + '/../client/build_editor/index.html')
        )
    })

    apiApp.use(express.json())
    apiApp.use('/api/users', users)
    apiApp.use('/api/sign-s3', awsSignS3)
    apiApp.use('/api/auth', auth)
    apiApp.use('/api/resources', resources)
    app.use(express.static(path.join(__dirname, '/../client')))
    // apiApp.get('/tinymce.zip', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/../client/tinymce.zip'))
    // })

    liveApp.use(express.json())
    liveApp.use(
        express.static(path.join(__dirname, '/../client/build_client_live'))
    )
    liveApp.get('*', (req, res) => {
        res.sendFile(
            path.join(__dirname + '/../client/build_client_live/index.html')
        )
    })
    app.use(error)
}
