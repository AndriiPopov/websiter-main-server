const cloneDeep = require('lodash/cloneDeep')
const isEmpty = require('lodash/isEmpty')
const { User } = require('../models/user')
const { Website } = require('../models/website')
const diffpatcher = require('jsondiffpatch/dist/jsondiffpatch.umd.js').create({
    objectHash: obj => obj.id,
    propertyFilter: (name, context) => name !== '__patch__',
})
const { getUserRights } = require('../utils/getUserRights')
const { sendError } = require('./error')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const aws = require('aws-sdk')
const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey
const AWS_S3_MAX_STORAGE = process.env.AWSMaxStorage

const deleteFileSchema = Joi.object({
    _id: Joi.objectId().required(),
    fileId: Joi.string()
        .min(1)
        .required(),
}).unknown()

module.exports.deleteImage = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = deleteFileSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }

        const website = await Website.findById(data._id)
        if (!website) {
            sendError(ws)
            return
        }

        if (
            !(await getUserRights(
                ws.user.toString(),
                website,
                ['content', 'developer'],
                null,
                ws
            ))
        )
            return

        let fileIndex = -1
        const fileItem = website.filesStructure.find((file, index) => {
            if (file.id === data.fileId) {
                fileIndex = index
                return true
            }
            return false
        })
        if (fileIndex < 0 || !fileItem) {
            sendError(ws)
            return
        }

        const s3 = new aws.S3({
            accessKeyId: AWS_S3_KEY,
            secretAccessKey: AWS_S3_SECRET,
        })
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileItem.url,
        }
        if (fileItem.type.indexOf('image') >= 0) {
            const s3ParamsThumbnail = {
                Bucket: S3_BUCKET,
                Key: fileItem.url + '/120',
            }
            s3.deleteObject(s3ParamsThumbnail, async (err, res) => {
                try {
                    if (err) {
                        sendError(ws)
                        // return
                    } else {
                    }
                } catch (ex) {
                    sendError(ws)
                }
            })
        }
        s3.deleteObject(s3Params, async (err, res) => {
            try {
                if (err) {
                    sendError(ws)
                    return
                } else {
                    const oldWebsiteObject = website.toObject()
                    website.filesStructure.splice(fileIndex, 1)
                    website.storage = website.storage - fileItem.size
                    if (website.storage < 0) website.storage = 0
                    website.markModified('filesStructure')
                    const newWebsiteObject = website.toObject()
                    website.__patch__ = diffpatcher.diff(
                        oldWebsiteObject,
                        newWebsiteObject
                    )
                    website.markModified('__patch__')
                    website.save()
                }
            } catch (ex) {
                sendError(ws)
            }
        })
    } catch (ex) {
        sendError(ws)
    }
}
