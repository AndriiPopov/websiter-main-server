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

const deleteImageSchema = Joi.object({
    _id: Joi.objectId().required(),
    url: Joi.string()
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
        const { error } = deleteImageSchema.validate(data)
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

        const imageIndex = website.images.findIndex(
            image => image.name === data.url
        )
        if (imageIndex < 0) {
            sendError(ws)
            return
        }

        const imageSize = website.images[imageIndex].size
        const s3 = new aws.S3({
            accessKeyId: AWS_S3_KEY,
            secretAccessKey: AWS_S3_SECRET,
        })
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: data.url,
        }
        s3.deleteObject(s3Params, async (err, res) => {
            try {
                if (err) {
                    sendError(ws)
                    return
                } else {
                    const oldWebsiteObject = website.toObject()
                    website.images.splice(imageIndex, 1)

                    website.storage = website.storage - imageSize
                    if (website.storage < 0) website.storage = 0
                    website.markModified('images')
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

const renameImageSchema = Joi.object({
    _id: Joi.objectId().required(),
    url: Joi.string()
        .min(1)
        .required(),
    label: Joi.string()
        .min(1)
        .required(),
}).unknown()

module.exports.renameImage = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = renameImageSchema.validate(data)
        if (error) sendError(ws)

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

        const imageIndex = website.images.findIndex(
            image => image.name === data.url
        )
        if (imageIndex < 0) {
            sendError(ws)
            return
        }

        const oldWebsiteObject = website.toObject()

        website.images[imageIndex].label = data.label
        website.markModified('images')

        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        website.save()
    } catch (ex) {
        sendError(ws)
    }
}

const addSizeSchema = Joi.object({
    _id: Joi.objectId().required(),
    size: Joi.number()
        .min(0)
        .required(),
    name: Joi.string()
        .required()
        .allow('')
        .max(250),
    label: Joi.string()
        .required()
        .allow('')
        .max(250),
    url: Joi.string()
        .required()
        .allow('')
        .max(350),
}).unknown()

module.exports.addImage = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = addSizeSchema.validate(data)
        if (error) sendError(ws)

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

        const oldWebsiteObject = website.toObject()

        website.storage = website.storage + data.size

        website.images.push({
            name: data.name,
            label: data.label,
            url: data.url,
            size: data.size,
            type: data.type,
        })
        website.markModified('images')

        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        website.save()
    } catch (ex) {
        sendError(ws)
    }
}
