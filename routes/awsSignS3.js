const express = require('express')
const auth = require('../middleware/auth')
const aws = require('aws-sdk')
const { getUserRights } = require('../utils/getUserRights')
const { Website } = require('../models/website')

const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey
const AWS_S3_MAX_STORAGE = process.env.AWSMaxStorage
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const router = express.Router()

const signImageSchema = Joi.object({
    websiteId: Joi.objectId().required(),
    fileName: Joi.string().required(),
    fileType: Joi.string(),
    fileSize: Joi.number().required(),
})

router.post('/', auth, async (req, res) => {
    try {
        const { error } = signImageSchema.validate(req.body)
        if (error)
            return res.status(400).send('Image upload failed. Wrong data.')

        const website = await Website.findById(req.body.websiteId)
        if (!website)
            return res.status(400).send('Image upload failed. Wrong data.')

        if (
            !(await getUserRights(
                req.user._id,
                website,
                ['content', 'developer'],
                res
            ))
        )
            return

        const s3 = new aws.S3({
            accessKeyId: AWS_S3_KEY,
            secretAccessKey: AWS_S3_SECRET,
        })
        const fileName = req.body.fileName
        const fileType = req.body.fileType
        const fileSize = req.body.fileSize
        if (
            website.storage + parseFloat(fileSize) >
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
    } catch {
        res.status(412).send('Failed')
    }
})

module.exports = router
