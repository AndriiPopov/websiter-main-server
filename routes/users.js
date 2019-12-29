const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const { pick, omit } = require('lodash')
const { Website } = require('../models/website')
const {
    User,
    validateUser,
    validateUserData,
    validateToken,
} = require('../models/user')
const express = require('express')
const action = require('../middleware/action')
const aws = require('aws-sdk')
const { pickResourcesObjects } = require('../utils/pickResourcesObjects')
const { getWebsites } = require('../utils/lists')

const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey

const router = express.Router()

router.get('/', [auth, action], async (req, res) => {
    const user = req.user
    const websites = await getWebsites(user)

    let website
    if (user.loadedWebsite) {
        website = await Website.findById(user.loadedWebsite)
    }

    if (!website && user.websites.length > 0) {
        website = await Website.findById(user.websites[0])
        user.loadedWebsite = website
        await user.save()
    }

    const resourcesObjects = await pickResourcesObjects(website)
    res.send({
        ...pick(user, [
            'email',
            'storage',
            'images',
            'loadedWebsite',
            // 'currentAction',
            'barSizes',
            'tooltipsOn',
        ]),
        ...pick(website, [
            'pagesStructure',
            'pluginsStructure',
            'currentPage',
            'currentPlugin',
        ]),
        websites,
        resourcesObjects,
    })
})

router.put('/', auth, async (req, res) => {
    const user = req.user
    const { error } = validateUserData(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    await User.findByIdAndUpdate(user._id, {
        ...omit(req.body, ['currentPage', 'currentPlugin']),
    })

    if (
        (req.body.currentPage || req.body.currentPlugin) &&
        user.loadedWebsite
    ) {
        await Website.findByIdAndUpdate(user.loadedWebsite, {
            currentPage: req.body.currentPage,
            currentPlugin: req.body.currentPlugin,
        })
    }

    res.send({
        status: true,
    })
})

router.delete('/', [auth, action], async (req, res) => {
    const user = req.user

    // Delete all objects with the user prefix on AWS S3
    const s3Files = user.images.map(image => {
        return { Key: image.name }
    })

    const s3 = new aws.S3({
        accessKeyId: AWS_S3_KEY,
        secretAccessKey: AWS_S3_SECRET,
    })

    const emptyS3Directory = async (bucket, dir) => {
        const listParams = {
            Bucket: bucket,
            Prefix: dir,
        }

        const listedObjects = await s3.listObjectsV2(listParams).promise()

        if (listedObjects.Contents.length === 0) return

        const deleteParams = {
            Bucket: S3_BUCKET,
            Delete: { Objects: [] },
        }

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key })
        })

        await s3.deleteObjects(deleteParams).promise()

        if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir)
    }

    await emptyS3Directory(S3_BUCKET, user._id + '/')

    // Delete user
    await Promise.all(
        user.websites.map(async websiteId => {
            await user.deleteWebsite(websiteId, res)
        })
    )
    await User.findByIdAndRemove(user._id)

    res.send({
        status: true,
    })
})

module.exports = router
