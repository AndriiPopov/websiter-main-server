const express = require('express')
const _ = require('lodash')
const auth = require('../middleware/auth')
const action = require('../middleware/action')
const websiteUserDescedant = require('../middleware/websiteUserDescedant')
const { structureIsWrong } = require('../utils/checkDescedant')
const { User } = require('../models/user')
const { Resource } = require('../models/resource')
const mongoose = require('mongoose')
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const {
    Website,
    validateWebsite,
    validateWebsiteStructure,
    validateCreateWebsite,
} = require('../models/website')
const { pickResourcesObjects } = require('../utils/pickResourcesObjects')
const { structureType, currentType } = require('../utils/resourceTypeIndex')
const diffpatcher = require('jsondiffpatch/dist/jsondiffpatch.umd.js').create({
    objectHash: obj => obj.id,
})
const { websiteIsInUser } = require('../utils/checkDescedant')
const { generateWebsiteId } = require('../models/system')
const dns = require('dns')
const { getWebsites } = require('../utils/lists')

const router = express.Router()

router.post('/', [auth, action], async (req, res) => {
    const { error } = validateCreateWebsite(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = req.user
    let website
    if (req.body.duplicate && req.body.currentWebsite) {
        if (await websiteIsInUser(req.body.currentWebsite, req.user, res))
            return
        website = await Website.findById(req.body.currentWebsite)
        website._id = mongoose.Types.ObjectId()
        website.isNew = true
        website.name = 'New website'
        const domainId = await generateWebsiteId()
        website.domain = 'new-website-' + domainId
        website.customDomain = ''
        website.domainHidden = false
        website.customDomainHidden = false
        website.currentPage = null
        website.currentPlugin = null
        website = await website.save()

        const oldResourcesArray = [
            ...website.pagesStructure,
            ...website.pluginsStructure,
        ]
        const newResourcesIds = []
        const oldResourcesIds = []

        await Promise.all(
            oldResourcesArray.map(async item => {
                oldResourcesIds.push(item.id)
                let resource = await Resource.findById(item.id)
                resource._id = mongoose.Types.ObjectId()
                resource.isNew = true
                resource.website = website._id
                resource = await resource.save()
                newResourcesIds.push(resource._id.toString())
            })
        )

        const updateStructure = structure => {
            structure.forEach(item => {
                item.id = newResourcesIds[oldResourcesIds.indexOf(item.id)]
                item.path = item.path.map(
                    id => newResourcesIds[oldResourcesIds.indexOf(id)]
                )
            })
        }
        updateStructure(website.pagesStructure)
        updateStructure(website.pluginsStructure)
        website.markModified('pagesStructure')
        website.markModified('pluginsStructure')

        if (website.pagesStructure.length > 0)
            website.currentPage = website.pagesStructure[0].id
        if (website.pluginsStructure.length > 0)
            website.currentPlugin = website.pluginsStructure[0].id

        website = await website.save()
    } else {
        website = await user.createWebsite()
    }

    user.websites.push(website._id)

    const websites = await getWebsites(user)

    let websiteData = {}
    if (user.websites.length === 1) {
        user.loadedWebsite = website
        const resourcesObjects = await pickResourcesObjects(website)
        websiteData = {
            ..._.pick(website, [
                'pagesStructure',
                'pluginsStructure',
                'currentPage',
                'currentPlugin',
            ]),
            resourcesObjects,
        }
    }

    await user.save()
    res.send({
        ...websiteData,
        websites,
        loadedWebsite: user.loadedWebsite,
    })
})

router.post(
    '/verify/:id',
    [auth, action, websiteUserDescedant],
    async (req, res) => {
        const user = req.user

        const website = await Website.findById(req.params.id)
        if (!website.customDomain || !website.verifyCode || !website.cname)
            return res.status(400).send('No custom domain')

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
                        if (txtArray[0] === website.verifyCode) {
                            txtVerified = true
                        }
                    }
                }
            }
        })

        if (txtVerified && cnameVerified) {
            await Website.updateMany(
                { customDomain: website.customDomain },
                { customDomainVerified: false }
            )
            website.customDomainVerified = true
            await website.save()

            const websites = await getWebsites(user)
            res.send({
                websites,
            })
        } else {
            res.status(400).send('Wrong records')
        }
    }
)

router.put('/:id', [auth, action, websiteUserDescedant], async (req, res) => {
    const user = req.user
    const { error } = validateWebsite(req.body)
    let website
    if (error) return res.status(400).send(error.details[0].message)

    if (req.body.domain) {
        if (req.body.domain.includes('new-website-')) {
            return res.send({ domainNotOk: true })
        }

        let websiteWithThisUrl = await Website.findOne({
            domain: req.body.domain,
        })
        if (websiteWithThisUrl) {
            if (
                websiteWithThisUrl._id.toString() !== req.params.id.toString()
            ) {
                return res.send({ domainNotOk: true })
            }
        }
    }

    if (req.body.customDomain) {
        if (req.body.customDomain !== '__delete__') {
            if (req.body.customDomain === 'wildcard') {
                return res.send({ customDomainNotOk: true })
            }
            const customDomain = req.body.customDomain.trim()
            if (customDomain.indexOf('wildcard') > -1) {
                return res.send({ customDomainNotOk: true })
            }
            const pat = /(?:\w+\.)+\w+/gm
            if (!pat.test(customDomain)) {
                return res.send({ customDomainNotOk: true })
            }
            websiteWithThisUrl = await Website.findOne({
                customDomain,
            })
            if (websiteWithThisUrl) {
                if (
                    websiteWithThisUrl._id.toString() !==
                    req.params.id.toString()
                ) {
                    return res.send({ customDomainNotOk: true })
                }
            }

            website = await Website.findById(req.params.id)
            if (website) {
                if (website.customDomain && website.customDomainApp) {
                    await heroku.delete(
                        '/apps/' +
                            website.customDomainApp +
                            '/domains/' +
                            website.customDomain
                    )
                }
            }

            const customDomainRegistered = await heroku.post(
                '/apps/' + process.env.HEROKU_CUSTOM_DOMAIN_APP + '/domains',
                { body: { hostname: customDomain } }
            )

            if (!customDomainRegistered) {
                if (error) return res.status(400).send('Try again')
            } else {
                req.body.customDomainApp = process.env.HEROKU_CUSTOM_DOMAIN_APP
                req.body.customDomain = customDomain
                req.body.cname = customDomainRegistered.cname
                req.body.customDomainVerified = false
                req.body.verifyCode =
                    req.params.id + Math.floor(Math.random() * 100000)
            }
        } else {
            // delete domain
            website = await Website.findById(req.params.id)
            if (website) {
                if (website.customDomain && website.customDomainApp) {
                    await heroku.delete(
                        '/apps/' +
                            website.customDomainApp +
                            '/domains/' +
                            website.customDomain
                    )
                }
                req.body.customDomainApp = ''
                req.body.customDomain = ''
            }
        }
    }

    website = await Website.findByIdAndUpdate(req.params.id, {
        ...req.body,
    })

    const websites = await getWebsites(user)
    res.send({
        websites,
    })
})

router.put(
    '/structure/:id',
    [auth, action, websiteUserDescedant],
    async (req, res) => {
        const user = req.user
        const { error } = validateWebsiteStructure(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        if (await websiteIsInUser(req.params.id, req.user, res)) return

        const website = await Website.findById(req.params.id)

        const newStructure = diffpatcher.patch(
            website[structureType[req.body.type]],
            req.body.structurePatch
        )
        if (
            await structureIsWrong(
                newStructure,
                req.params.id,
                res,
                req.body.type
            )
        ) {
            return res.status(400).send('Structure is wrong or type is missing')
        } else {
            website[structureType[req.body.type]] = newStructure
            website.markModified(structureType[req.body.type])
            await website.save()
        }
        // req.body.pagesStructure.forEach(item => {
        //     if (
        //         req.body.pagesStructure.some(
        //             element =>
        //                 (element.url === item.url && element.id !== item.id) ||
        //                 !/^([A-Za-z0-9\-\_]+)$/.test(element.url)
        //         )
        //     ) {
        //         return res.send({ urlNotOk: true })
        //     }
        // })
        res.send({
            success: true,
        })
    }
)

router.put(
    '/currentpage/:id',
    [auth, action, websiteUserDescedant],
    async (req, res) => {
        const user = req.user
        const { error } = validateWebsite(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        if (await websiteIsInUser(req.params.id, req.user, res)) return

        await Website.findByIdAndUpdate(
            req.params.id,
            { currentPage: req.body.currentPage },
            { new: true }
        )
        res.send({
            status: true,
        })
    }
)

router.delete(
    '/:id',
    [auth, action, websiteUserDescedant],
    async (req, res) => {
        const user = req.user

        if (await websiteIsInUser(req.params.id, req.user, res)) return

        await user.deleteWebsite(req.params.id, res)
        await user.save()

        const websites = await getWebsites(user)

        let website = await Website.findById(user.loadedWebsite)
        const resourcesObjects = await pickResourcesObjects(website)
        if (!website) {
            website = {
                pagesStructure: [],
                pluginsStructure: [],
                currentPage: '',
                currentPlugin: '',
            }
        }

        res.send({
            ..._.pick(website, [
                'pagesStructure',
                'pluginsStructure',
                'currentPage',
                'currentPlugin',
            ]),
            websites,
            resourcesObjects,
            loadedWebsite: user.loadedWebsite || '',
        })
    }
)

router.get('/:id', [auth, action, websiteUserDescedant], async (req, res) => {
    const user = req.user
    let website = false
    if (
        user.websites.some(
            website => website.toString() === req.params.id.toString()
        )
    ) {
        website = await Website.findById(req.params.id)
        user.loadedWebsite = website
        await user.save()
    }
    if (!website)
        return res
            .status(404)
            .send('The website with the given ID was not found.')

    const resourcesObjects = await pickResourcesObjects(website)

    res.send({
        ..._.pick(website, [
            'pagesStructure',
            'pluginsStructure',
            'currentPage',
            'currentPlugin',
        ]),
        resourcesObjects,
        loadedWebsite: user.loadedWebsite,
    })
})

module.exports = router
