const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { updateIfCurrentPlugin } = require('mongoose-update-if-current')
const { Website } = require('./website')
const { Resource } = require('./resource')
const { System } = require('./system')
const { generateWebsiteId } = require('./system')
const aws = require('aws-sdk')
const S3_BUCKET = process.env.S3_BUCKET
const AWS_S3_KEY = process.env.AWSAccessKeyId
const AWS_S3_SECRET = process.env.AWSSecretKey

const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })

const userSchema = new mongoose.Schema(
    {
        websites: [{}],
        settings: {
            type: mongoose.Schema.Types.Mixed,
            default: {
                websites: {},
            },
        },
        userid: {
            type: String,
            required: true,
        },
        accountInfo: {},
        platformId: {
            type: String,
            required: true,
        },
        logoutAllDate: {
            type: Number,
            default: 0,
        },
        courses: {},
        __patch__: {},
    },
    { minimize: false }
)
userSchema.plugin(updateIfCurrentPlugin)

userSchema.methods.generateAuthToken = function() {
    try {
        const token = jwt.sign(
            { _id: this._id, issued: new Date().getTime() },
            process.env.jwtPrivateKey,
            {
                expiresIn: '350d',
            }
        )
        return token
    } catch (ex) {}
}

userSchema.methods.createWebsite = async function() {
    try {
        const domainId = await generateWebsiteId()
        let website = new Website({
            name: 'New website',
            domain: 'new-website-' + domainId,
            user: this._id.toString(),
            storage: 0,
            sharing: [
                {
                    userId: this._id.toString(),
                    rights: ['owner', 'admin', 'developer', 'content'],
                    accountInfo: this.accountInfo,
                },
            ],
        })
        const globalSettingsPage = await website.createGlobalSettingsResource(
            'page'
        )
        const globalSettingsTemplate = await website.createGlobalSettingsResource(
            'template'
        )
        if (!globalSettingsPage || !globalSettingsTemplate) return

        website = await website.save()
        return website
    } catch (ex) {
        console.log('Create website failed.')
    }
}

userSchema.methods.deleteWebsite = async function(_id) {
    try {
        const website = await Website.findById(_id)
        if (!website) return
        const websiteObject = website.toObject()
        if (websiteObject.user.toString() === this._id.toString()) {
            // Delete all objects with the user prefix on AWS S3

            const s3Files = websiteObject.filesStructure.map(image => ({
                Key: image.name,
            }))

            const s3 = new aws.S3({
                accessKeyId: AWS_S3_KEY,
                secretAccessKey: AWS_S3_SECRET,
            })

            const emptyS3Directory = async (bucket, dir) => {
                const listParams = {
                    Bucket: bucket,
                    Prefix: dir,
                }

                const listedObjects = await s3
                    .listObjectsV2(listParams)
                    .promise()

                if (listedObjects.Contents.length === 0) return

                const deleteParams = {
                    Bucket: S3_BUCKET,
                    Delete: { Objects: [] },
                }

                listedObjects.Contents.forEach(({ Key }) => {
                    deleteParams.Delete.Objects.push({ Key })
                })

                await s3.deleteObjects(deleteParams).promise()

                if (listedObjects.IsTruncated)
                    await emptyS3Directory(bucket, dir)
            }

            await emptyS3Directory(S3_BUCKET, websiteObject._id + '/')
            if (websiteObject.customDomain && websiteObject.customDomainApp) {
                await heroku.delete(
                    '/apps/' +
                        websiteObject.customDomainApp +
                        '/domains/' +
                        websiteObject.customDomainId
                )
            }

            for (let item of websiteObject.pagesStructure) {
                await Resource.remove({ _id: item.id })
            }

            for (let item of websiteObject.pluginsStructure) {
                await Resource.remove({ _id: item.id })
            }

            for (let item of websiteObject.templatesStructure) {
                await Resource.remove({ _id: item.id })
            }

            await Website.remove({ _id: _id })
        }
        const index = this.websites.findIndex(
            item => item.id.toString() === _id.toString()
        )
        if (index >= 0) this.websites.splice(index, 1)
    } catch (ex) {
        console.log('Delete website failed.')
    }
}

module.exports.User = mongoose.model('User', userSchema)
