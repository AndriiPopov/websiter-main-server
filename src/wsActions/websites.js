const cloneDeep = require('lodash/cloneDeep')
const isEmpty = require('lodash/isEmpty')
const { User } = require('../models/user')
const { Website } = require('../models/website')
const diffpatcher = require('jsondiffpatch/dist/jsondiffpatch.umd.js').create({
    objectHash: obj => obj.id,
    propertyFilter: (name, context) => name !== '__patch__',
})
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const { getUserRights } = require('../utils/getUserRights')
const { generateWebsiteId } = require('../models/system')
const dns = require('dns')
const { sendError } = require('./error')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.addWebsite = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const user = await User.findById(ws.user)
        if (!user) {
            sendError(ws)
            return
        }
        const oldUserObject = user.toObject()
        let website
        // if (data.duplicate && data._id) {
        //     website = await Website.findById(data._id)
        //     website._id = mongoose.Types.ObjectId()
        //     website.isNew = true
        //     website.name = 'New website'
        //     const domainId = await generateWebsiteId()
        //     website.domain = 'new-website-' + domainId
        //     website.customDomain = ''
        //     website.domainHidden = false
        //     website.customDomainHidden = false
        //     website.filesStructure = []
        //     website.sharing = []
        //     website.storage = 0
        //     website.markModified('filesStructure')
        //     website.markModified('sharing')

        //     website = await website.save()

        //     const oldResourcesArray = [
        //         ...website.pagesStructure,
        //         ...website.pluginsStructure,
        //         ...website.templateStructure,
        //     ]
        //     const newResourcesIds = []
        //     const oldResourcesIds = []

        //     await Promise.all(
        //         oldResourcesArray.map(async item => {
        //             oldResourcesIds.push(item.id)
        //             let resource = await Resource.findById(item.id)
        //             resource._id = mongoose.Types.ObjectId()
        //             resource.isNew = true
        //             resource.website = website._id.toString()
        //             resource = await resource.save()
        //             newResourcesIds.push(resource._id.toString())
        //         })
        //     )

        //     const updateStructure = structure => {
        //         structure.forEach(item => {
        //             item.id = newResourcesIds[oldResourcesIds.indexOf(item.id)]
        //             item.path = item.path.map(
        //                 id => newResourcesIds[oldResourcesIds.indexOf(id)]
        //             )
        //         })
        //     }
        //     updateStructure(website.pagesStructure)
        //     updateStructure(website.templatesStructure)
        //     updateStructure(website.pluginsStructure)
        //     website.markModified('pagesStructure')
        //     website.markModified('templatesStructure')
        //     website.markModified('pluginsStructure')

        //     if (website.pagesStructure.length > 0)
        //         website.currentPage = website.pagesStructure[0].id
        //     if (website.pluginsStructure.length > 0)
        //         website.currentPlugin = website.pluginsStructure[0].id
        //     if (website.templatesStructure.length > 0)
        //         website.currentTemplate = website.templatesStructure[0].id

        //     website = await website.save()
        // } else {
        website = await user.createWebsite()
        // }

        user.websites.push({ id: website._id })
        user.markModified('websites')
        const newUserObject = user.toObject()
        user.__patch__ = diffpatcher.diff(
            oldUserObject.websites,
            newUserObject.websites
        )

        user.markModified('__patch__')
        await user.save()
    } catch (ex) {
        sendError(ws)
    }
}

module.exports.deleteWebsite = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = Joi.objectId()
            .required()
            .validate(data._id)
        if (error) {
            sendError(ws)
            return
        }
        const user = await User.findById(ws.user)

        if (!user) {
            sendError(ws)
            return
        }
        const oldUserObject = user.toObject()

        if (
            !(await getUserRights(
                user._id,
                data._id.toString(),
                'owner',
                null,
                ws
            ))
        )
            return
        await user.deleteWebsite(data._id)
        user.markModified('websites')
        const newUserObject = user.toObject()
        user.__patch__ = diffpatcher.diff(
            oldUserObject.websites,
            newUserObject.websites
        )
        user.markModified('__patch__')
        await user.save()
    } catch (ex) {
        sendError(ws)
    }
}

module.exports.verifyCustomDomain = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = Joi.objectId()
            .required()
            .validate(data._id)
        if (error) {
            sendError(ws)
            return
        }
        const user = await User.findById(ws.user)
        if (!user) {
            sendError(ws)
            return
        }

        const website = await Website.findById(data._id)
        if (!website.customDomain || !website.verifyCode || !website.cname) {
            sendError(ws)
            return
        }

        if (
            !(await getUserRights(
                user._id,
                website,
                ['developer', 'admin'],
                null,
                ws
            ))
        )
            return

        const records = await new Promise((resolve, reject) => {
            dns.resolveAny(website.customDomain, (err, records) => {
                if (err) reject(err)
                resolve(records)
            })
        })

        let cnameVerified, txtVerified
        records.forEach(record => {
            if (record.type === 'CNAME') {
                if (record.value === website.cname) {
                    cnameVerified = true
                }
            }
            if (record.type === 'TXT') {
                const txtArray = record.entries.split('=')
                if (txtArray.length === 2) {
                    if (txtArray[0] === 'websiter_verification') {
                        if (txtArray[0].toString() === website._id.toString()) {
                            txtVerified = true
                        }
                    }
                }
            }
        })

        if (txtVerified && cnameVerified) {
            const oldWebsiteObject = website.toObject()

            const oldWebsites = await Website.find({
                customDomain: website.customDomain,
            })
            for (let websiteInn of oldWebsites) {
                const oldWebsiteInnObject = websiteInn.toObject()
                websiteInn.customDomain = ''
                websiteInn.customDomainVerified = false
                const newWebsiteInnObject = websiteInn.toObject()
                websiteInn.__patch__ = diffpatcher.diff(
                    oldWebsiteInnObject,
                    newWebsiteInnObject
                )
                websiteInn.markModified('__patch__')
                websiteInn.save()
            }

            website.customDomainVerified = true
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
}

const addUserInSharingSchema = Joi.object({
    _id: Joi.objectId().required(),
    userId: Joi.objectId().required(),
    type: Joi.string().valid('add', 'delete'),
}).unknown()

module.exports.addUserInSharing = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = addUserInSharingSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }
        const user = await User.findById(ws.user)
        if (!user) {
            sendError(ws)
            return
        }

        const website = await Website.findById(data._id)

        if (
            !(await getUserRights(
                user._id,
                website,
                ['owner', 'admin'],
                null,
                ws
            ))
        )
            return

        if (data.userId.trim() === website.user) {
            sendError(ws)
            return
        }

        const editUser = await User.findById(data.userId.trim())
        if (!editUser) {
            sendError(ws)
            return
        }

        const oldWebsiteObject = website.toObject()
        const oldUserObject = editUser.toObject()

        if (data.type === 'add') {
            website.sharing.push({
                userId: data.userId.trim(),
                rights: [],
                accountInfo: editUser.accountInfo,
            })
            editUser.websites.push({ id: website._id })
        } else {
            const index = editUser.websites.findIndex(
                item => item.id.toString() === website._id.toString()
            )
            if (index >= 0) editUser.websites.splice(index, 1)
            website.sharing = website.sharing.filter(
                item => item.userId !== data.userId.trim()
            )
        }

        website.markModified('sharing')
        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        await website.save()

        editUser.markModified('websites')
        const newUserObject = editUser.toObject()
        editUser.__patch__ = diffpatcher.diff(
            oldUserObject.websites,
            newUserObject.websites
        )
        editUser.markModified('__patch__')
        await editUser.save()
    } catch (ex) {
        sendError(ws)
    }
}

const transferWebsiteSchema = Joi.object({
    _id: Joi.objectId().required(),
    userTo: Joi.objectId().required(),
}).unknown()

module.exports.transferWebsite = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = transferWebsiteSchema.validate(data)
        if (error) {
            console.log(error)
            sendError(ws, 'validation')
            return
        }
        const user = await User.findById(ws.user)
        if (!user) {
            console.log(ws.user)
            sendError(ws, 'no user')
            return
        }

        const userTo = await User.findById(data.userTo.trim())
        if (!userTo) {
            console.log(data.userTo.trim())
            sendError(ws, 'userto')
            return
        }

        const website = await Website.findById(data._id)
        if (!website) {
            console.log(data._id)
            sendError(ws, 'website')
            return
        }

        if (user._id.toString() !== website.user.toString()) {
            console.log('eq')
            sendError(ws, 'eq')
            return
        }

        if (!(await getUserRights(user._id, website, ['owner'], null, ws)))
            return
        const oldWebsiteObject = website.toObject()
        const oldUserObject = user.toObject()
        const oldUserToObject = userTo.toObject()

        website.user = userTo._id.toString()
        website.sharing = [
            {
                userId: userTo._id.toString(),
                rights: ['owner', 'admin', 'developer', 'content'],
            },
        ]
        website.markModified('sharing')
        user.websites = user.websites.filter(
            item => item.id.toString() !== website.id.toString()
        )

        userTo.websites = userTo.websites.filter(
            item => item.id.toString() !== website._id.toString()
        )

        userTo.websites.push({ id: website._id.toString() })

        website.markModified('sharing')
        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        await website.save()

        userTo.markModified('websites')
        const newUserToObject = userTo.toObject()
        userTo.__patch__ = diffpatcher.diff(
            oldUserToObject.websites,
            newUserToObject.websites
        )
        userTo.markModified('__patch__')
        await userTo.save()

        user.markModified('websites')
        const newUserObject = user.toObject()
        user.__patch__ = diffpatcher.diff(
            oldUserObject.websites,
            newUserObject.websites
        )
        user.markModified('__patch__')
        await user.save()
    } catch (ex) {
        console.log(ex)
        sendError(ws, 'exception')
    }
}

const saveDomainNameSchema = Joi.object({
    _id: Joi.objectId().required(),
    name: Joi.string()
        .max(250)
        .allow('')
        .required(),
    type: Joi.string()
        .valid('domain', 'customDomain')
        .required(),
}).unknown()

module.exports.saveDomainName = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = saveDomainNameSchema.validate(data)
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
                ['owner', 'admin', 'developer'],
                null,
                ws
            ))
        )
            return

        const oldWebsiteObject = website.toObject()
        website[data.type] = data.name.toLowerCase().trim()

        if (data.type === 'domain') {
            if (data.name.trim().length < 5) {
                sendError(ws, 'Domain cannot be less than 5 symbols long.')
                return
            }
            if (data.name.trim().length < 5) {
                sendError(ws, 'Domain cannot be less than 5 symbols long.')
                return
            }
            if (data.name.trim().indexOf('new-website') >= 0) {
                sendError(ws, 'Domain cannot contain "new-website".')
                return
            }
            const websitesWithThisDomain = await Website.find({
                domain: data.name.trim(),
            })
            if (websitesWithThisDomain.length > 0) {
                sendError(ws, 'This name is taken. Please try another name.')
                return
            }
        } else {
            if (
                website.customDomain.toLowerCase() !==
                oldWebsiteObject.customDomain.toLowerCase()
            ) {
                if (website.customDomain !== '__delete__') {
                    if (website.customDomain.indexOf('wildcard') > -1) {
                        sendError(ws, 'Domain name can not contain "wildcard".')
                        return
                    }
                    const pat = /(?:\w+\.)+\w+/gm
                    if (!pat.test(website.customDomain)) {
                        sendError(ws, 'Domain name is not correct.')
                        return
                    }
                    if (
                        !website.customDomainApp ||
                        website.customDomainApp === ''
                    ) {
                        website.customDomainApp =
                            process.env.HEROKU_CUSTOM_DOMAIN_APP
                    } else {
                        if (website.customDomainId) {
                            try {
                                await heroku.delete(
                                    '/apps/' +
                                        website.customDomainApp +
                                        '/domains/' +
                                        website.customDomainId
                                )
                            } catch (ex) {}
                        }
                    }
                    const addDomainData = await heroku.post(
                        '/apps/' + website.customDomainApp + '/domains',
                        { body: { hostname: website.customDomain } }
                    )
                    website.cname = addDomainData.cname
                    website.customDomainId = addDomainData.id
                    website.customDomainVerified = false
                } else {
                    // delete domain
                    if (website.customDomainApp && website.customDomainId) {
                        try {
                            await heroku.delete(
                                '/apps/' +
                                    website.customDomainApp +
                                    '/domains/' +
                                    website.customDomainId
                            )
                        } catch (ex) {}
                    }
                    website.cname = ''
                    website.customDomainId = ''
                    website.customDomainVerified = false
                    website.customDomainApp = ''
                    website.customDomain = ''
                }
            }
        }

        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        website.save()
    } catch (ex) {
        sendError(ws)
    }
}
