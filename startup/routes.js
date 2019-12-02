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
        if (req.subdomains.length > 0) {
            app.get('*', (req, res) => {
                res.sendFile(
                    path.join(__dirname + '/../client/build_client/index.html')
                )
            })
        }
        next()
    })
    app.use(cors())
    app.use(express.json())
    // app.use(vhost('*.logision.com', live))
    app.use('/api/websites', websites)
    app.use('/api/resources', resources)
    app.use('/api/users', users)
    app.use('/api/sign-s3', awsSignS3)
    app.use('/api/awsImage', awsImage)
    app.use('/api/auth', auth)
    app.use(error)
}