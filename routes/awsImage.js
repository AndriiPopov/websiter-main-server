const express = require('express')
const auth = require('../middleware/auth')
const action = require('../middleware/action')
const aws = require('aws-sdk')
const { User } = require('../models/user')

const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey
const AWS_S3_MAX_STORAGE = process.env.AWSMaxStorage

const router = express.Router()

router.post('/deleteimage', auth, (req, res) => {
    const user = req.user
    if (!req.body.url) {
        return res.status(400).send('No url to delete')
    }
    if (req.body.url.length === 0) {
        return res.status(400).send('No url to delete')
    }

    const imageIndex = user.images.findIndex(
        image => image.name === req.body.url
    )

    const imageSize = req.user.images[imageIndex].size

    if (imageIndex < 0) {
        return res.status(400).send('This image does not belong user')
    }

    const s3 = new aws.S3({
        accessKeyId: AWS_S3_KEY,
        secretAccessKey: AWS_S3_SECRET,
    })

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: req.body.url,
    }

    s3.deleteObject(s3Params, async (err, data) => {
        if (err) {
            return res.end()
        } else {
            user.images = user.images.filter(
                image => image.name !== req.body.url
            )
            user.storage = user.storage - imageSize

            user.markModified('images')
            user.markModified('storage')
            await user.save()

            res.send({
                images: user.images,
                storage: user.storage,
            })
        }
    })
})

router.post('/renameimage', auth, async (req, res) => {
    const user = req.user
    if (!req.body.url || !req.body.label) {
        return res.status(400).send('No url or label to rename')
    }
    if (req.body.url.length === 0) {
        return res.status(400).send('No url to delete')
    }

    const imageIndex = user.images.findIndex(
        image => image.name === req.body.url
    )

    if (imageIndex < 0) {
        return res.status(400).send('This image does not belong user')
    }

    user.images[imageIndex].label = req.body.label
    user.markModified('images')
    await user.save()

    res.send({
        images: user.images,
    })
})

module.exports = router
