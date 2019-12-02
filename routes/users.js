const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
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

const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const user = req.user
    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'name'])
        })
    )

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
        ..._.pick(user, [
            'email',
            'storage',
            'images',
            'loadedWebsite',
            'currentAction',
            'barSizes',
        ]),
        ..._.pick(website, [
            'pagesStructure',
            'filesStructure',
            'pluginsStructure',
            'currentPage',
        ]),
        websites,
        resourcesObjects,
    })
})

// router.post('/', async (req, res) => {
//     const { error } = validateUser(req.body)
//     if (error) {
//         return res.status(400).send(error.details[0].message)
//     }

//     let user = await User.findOne({ email: req.body.email })

//     if (user) {
//         return res.status(400).send('User already registered.')
//     }

//     user = new User({
//         email: req.body.email,
//         password: req.body.password,
//         currentAction: 0,
//         images: [],
//         storage: 0,
//         loadedWebsite: '',
//     })

//     const salt = await bcrypt.genSalt(10)
//     user.password = await bcrypt.hash(user.password, salt)

//     const website = await user.createWebsite(user)

//     const resourcesObjects = await pickResourcesObjects(website)
//     user.websites.push(website._id)
//     const websites = await Promise.all(
//         user.websites.map(async id => {
//             const website = await Website.findById(id)
//             return _.pick(website, ['_id', 'domain', 'name'])
//         })
//     )
//     await user.save()
//     req.user = user
//     const token = user.generateAuthToken()
//     res.set({
//         'x-auth-token': token,
//     }).send({
//         ..._.pick(user, ['_id', 'email', 'storage', 'images', 'loadedWebsite']),
//         token,
//         ..._.pick(website, [
//             'pagesStructure',
//             'filesStructure',
//             'pluginsStructure',
//             'currentPage',
//         ]),
//         websites,
//         resourcesObjects,
//         currentAction: user.currentAction,
//         barSizes: user.barSizes,
//     })
// })

router.put('/', auth, async (req, res) => {
    const user = req.user
    const { error } = validateUserData(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    await User.findByIdAndUpdate(user._id, {
        ...req.body,
    })

    res.send({
        status: true,
    })
})

router.delete('/', auth, action, async (req, res) => {
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
