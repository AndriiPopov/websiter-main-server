const express = require('express')
const auth = require('../middleware/auth')
const action = require('../middleware/action')
const aws = require('aws-sdk')
const config = require('config')

const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey
const AWS_S3_MAX_STORAGE = process.env.AWSMaxStorage

const router = express.Router()

router.get('/', auth, (req, res) => {
    const s3 = new aws.S3({
        accessKeyId: AWS_S3_KEY,
        secretAccessKey: AWS_S3_SECRET,
    })
    const fileName = req.query['file-name']
    const fileType = req.query['file-type']
    const fileSize = req.query['file-size']
    if (
        parseFloat(req.user.storage) + parseFloat(fileSize) >
        parseFloat(AWS_S3_MAX_STORAGE)
    )
        return res.status(400).send('Not enough storage. Please upgrade.')

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            return res.end()
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        }
        res.write(JSON.stringify(returnData))
        res.end()
    })
})

module.exports = router
