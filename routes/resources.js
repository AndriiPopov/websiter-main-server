const action = require('../middleware/action')
const auth = require('../middleware/auth')
const Url = require('url-parse')

const {
    resourceIsInUser,
    resourceIsInWebsite,
    websiteIsInUser,
    structureIsWrong,
} = require('../utils/checkDescedant')
const { cloneDeep, isEmpty } = require('lodash')
const {
    Resource,
    validateResourceCreate,
    validateResourceSave,
    validateResourcePublishRevert,
    validateResourceLive,
} = require('../models/resource')
const { structureType, currentType } = require('../utils/resourceTypeIndex')
const { Website } = require('../models/website')
const express = require('express')
const router = express.Router()
const diffpatcher = require('jsondiffpatch/dist/jsondiffpatch.umd.js').create({
    objectHash: obj => obj.id,
})
const { pickResourcesObjectsLive } = require('../utils/pickResourcesObjects')

router.post('/', [auth, action], async (req, res) => {
    const { error } = validateResourceCreate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    if (await websiteIsInUser(req.body.websiteId, req.user, res)) return
    if (req.body.currentResourceId) {
        if (
            await resourceIsInWebsite(
                req.body.currentResourceId,
                req.body.websiteId,
                res,
                req.body.type
            )
        ) {
            return
        }
    }

    const website = await Website.findById(req.body.websiteId)

    const oldStructure = cloneDeep(this[structureType[req.body.type]])

    const result = await website.createResource(
        req.body.currentResourceId,
        req.body.type,
        req.body.duplicate,
        req.body.resourceData
    )
    await website.save()

    const structurePatch = diffpatcher.diff(
        oldStructure,
        website[structureType[req.body.type]]
    )
    res.send({
        structurePatch,
        resource: {
            draft: isEmpty(result.resource.draft)
                ? result.resource.published
                : result.resource.draft,
            present: {},
            future: [],
            past: [],
        },
        _id: result.resource._id,
        newResourceName: result.data.name,
    })
})

router.put('/:id', [auth, action], async (req, res) => {
    const { error } = validateResourceSave(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (await resourceIsInUser(req.params.id, req.user, res)) return

    const resource = await Resource.findById(req.params.id)
    if (!resource) {
        return res
            .status(404)
            .send('The resource with the given ID was not found.')
    }

    if (
        await structureIsWrong(
            req.body.structure,
            resource.website,
            res,
            req.body.type
        )
    ) {
        return
    }
    const draftSource = isEmpty(resource.draft)
        ? resource.published
        : resource.draft
    resource.draft = diffpatcher.patch(draftSource, req.body.resourcePatch)
    resource.markModified('draft')

    await resource.save()
    await Website.findByIdAndUpdate(resource.website, {
        [structureType[req.body.type]]: req.body.structure,
    })
    res.send({ status: true })
})

router.delete('/:id', [auth, action], async (req, res) => {
    const resource = await Resource.findById(req.params.id)
    if (!resource)
        return res
            .status(404)
            .send('The resource with the given ID was not found.')
    if (await resourceIsInUser(req.params.id, req.user, res)) return
    const type = req.query.type

    let website = await Website.findById(resource.website)
    if (!website)
        return res
            .status(404)
            .send('The website with the given ID was not found.')

    const oldStructure = cloneDeep(website[structureType[type]])
    const deletedResources = await website.deleteResource(resource._id, type)
    website = await website.save()
    const structurePatch = diffpatcher.diff(
        oldStructure,
        website[structureType[type]]
    )
    const resourceCurrent = currentType[type]
    res.send({
        structurePatch,
        current: website[resourceCurrent],
        deletedResources,
    })
})

router.put('/publish/:id', [auth, action], async (req, res) => {
    const { error } = validateResourcePublishRevert(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (await resourceIsInUser(req.params.id, req.user, res)) return

    const resource = await Resource.findById(req.params.id)
    if (!resource) {
        return res
            .status(404)
            .send('The resource with the given ID was not found.')
    }

    if (
        await structureIsWrong(
            req.body.structure,
            resource.website,
            res,
            req.body.type
        )
    ) {
        return
    }
    if (!req.body.revert) {
        if (!isEmpty(resource.draft)) {
            resource.published = { ...resource.draft }
        }
    }

    resource.draft = {}
    resource.markModified('draft')
    resource.markModified('published')
    await resource.save()

    await Website.findByIdAndUpdate(resource.website, {
        [structureType[req.body.type]]: req.body.structure,
    })
    if (!req.body.revert) {
        res.send({ status: true })
    } else {
        res.send({ draft: resource.published })
    }
})

router.post('/live', async (req, res) => {
    const { error } = validateResourceLive(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const url = new Url(req.body.url)

    const hostParts = url.hostname.split('.')
    let website, pathname

    if (url.hostname === 'live.websiter.dev') {
        const pathArray = url.pathname.split('/')
        if (pathArray.length < 2) {
            return res.status(400).send('Wrong page')
        }
        website = await Website.findOne({
            domain: pathArray[1],
        })
        pathArray.shift()
        pathArray.shift()
        pathname = pathArray.join('/')
    } else {
        // const dnsTxtRecords = await dns.resolveTxt(url.hostname)
        // const logisionRecord = dnsTxtRecords.find(record => {
        //     if (record.length > 0) {
        //         const fields = record[0].split('=')
        //         if (fields.length > 1) {
        //             if (fields[0] === 'logision-verification-code') return true
        //         }
        //     }
        // })

        website = await Website.findOne({
            customDomain: url.hostname,
            customDomainVerified: true,
        })
        if (!website) {
            website = await Website.findOne({
                customDomain: url.hostname,
            })
        }
        pathname = url.pathname
    }

    if (!website) return res.status(400).send('No website')
    let page
    if (pathname === '') {
        page = website.pagesStructure.find(page => page.homepage === true)
    }
    if (!page) {
        page = website.pagesStructure.find(page => page.url === pathname)
    }

    if (!page) return res.status(400).send('No page')

    if (page.hidden) return res.status(400).send('No page')

    const whitelist = []
    const pickConnectedResources = resource => {
        whitelist.push(resource.id)
        if (resource.connectedResources)
            resource.connectedResources.forEach(connectedResource => {
                let nextResource
                if (connectedResource.type === 'plugin') {
                    nextResource = website.pluginsStructure.find(
                        item => item.name === connectedResource.name
                    )
                }
                if (nextResource) pickConnectedResources(nextResource)
            })
    }
    pickConnectedResources(page)
    const resourcesObjects = await pickResourcesObjectsLive(website, whitelist)
    res.send({
        resourcesObjects,
        page: page.id,
        pagesStructure: website.pagesStructure,
        pluginsStructure: website.pluginsStructure,
        baseUrl:
            url.hostname === 'live.websiter.dev'
                ? (process.env.NODE_ENV === 'production'
                      ? 'https://live.websiter.dev/'
                      : 'http://live.websiter.dev:4000/') +
                  website.domain +
                  '/'
                : '',
    })
})

module.exports = router
