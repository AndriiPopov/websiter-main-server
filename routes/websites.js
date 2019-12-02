const express = require('express')
const _ = require('lodash')
const auth = require('../middleware/auth')
const action = require('../middleware/action')
const websiteUserDescedant = require('../middleware/websiteUserDescedant')
const { structureIsWrong } = require('../utils/checkDescedant')
const { User } = require('../models/user')
const { Resource } = require('../models/resource')
const mongoose = require('mongoose')
const axios = require('axios')
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
        website.currentPage = null
        website.currentFile = null
        website.currentPlugin = null
        website = await website.save()

        const oldResourcesArray = [
            ...website.pagesStructure,
            ...website.filesStructure,
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
        updateStructure(website.filesStructure)
        updateStructure(website.pluginsStructure)
        website.markModified('pagesStructure')
        website.markModified('filesStructure')
        website.markModified('pluginsStructure')

        if (website.pagesStructure.length > 0)
            website.currentPage = website.pagesStructure[0].id
        if (website.filesStructure.length > 0)
            website.currentFile = website.filesStructure[0].id
        if (website.pluginsStructure.length > 0)
            website.currentPlugin = website.pluginsStructure[0].id

        website = await website.save()
    } else {
        website = await user.createWebsite()
    }

    user.websites.push(website._id)

    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'name'])
        })
    )

    let websiteData = {}
    if (user.websites.length === 1) {
        user.loadedWebsite = website
        const resourcesObjects = await pickResourcesObjects(website)
        websiteData = {
            ..._.pick(website, [
                'pagesStructure',
                'filesStructure',
                'pluginsStructure',
                'currentPage',
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

router.put('/:id', [auth, action, websiteUserDescedant], async (req, res) => {
    const user = req.user
    const { error } = validateWebsite(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (await websiteIsInUser(req.params.id, req.user, res)) return

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
        websiteWithThisUrl = await Website.findOne({
            domain: req.body.customDomain,
        })
        if (websiteWithThisUrl) {
            if (
                websiteWithThisUrl._id.toString() !== req.params.id.toString()
            ) {
                return res.send({ customDomainNotOk: true })
            }
        }
        const customDomainRegistered = await axios.post(
            'https://router.websiter.dev/newdomain',
            {
                url: req.body.customDomain,
            }
        )

        if (!customDomainRegistered.data.success) {
            if (error) return res.status(400).send('Try again')
        }
    }

    const website = await Website.findByIdAndUpdate(req.params.id, {
        ...req.body,
    })

    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'name'])
        })
    )
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

        const websites = await Promise.all(
            user.websites.map(async id => {
                const website = await Website.findById(id)
                return _.pick(website, ['_id', 'domain', 'name'])
            })
        )

        let website = await Website.findById(user.loadedWebsite)
        const resourcesObjects = await pickResourcesObjects(website)
        if (!website) {
            website = {
                pagesStructure: [],
                filesStructure: [],
                pluginsStructure: [],
                currentPage: '',
            }
        }

        res.send({
            ..._.pick(website, [
                'pagesStructure',
                'filesStructure',
                'pluginsStructure',
                'currentPage',
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
            'filesStructure',
            'pluginsStructure',
            'currentPage',
        ]),
        resourcesObjects,
        loadedWebsite: user.loadedWebsite,
    })
})

module.exports = router
