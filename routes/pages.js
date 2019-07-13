const action = require('../middleware/action')
const auth = require('../middleware/auth')
const {
    pageIsInUser,
    pageIsInWebsite,
    websiteIsInUser,
    pagesStructureIsRight,
} = require('../utils/checkDescedant')
const _ = require('lodash')
const {
    Page,
    validatePageCreate,
    validatePageSave,
    validatePagePublishRevert,
} = require('../models/page')
const { Website } = require('../models/website')
const express = require('express')
const router = express.Router()

// $FlowFixMe
router.post('/publish', [auth, action], async (req, res) => {
    const { error } = validatePagePublishRevert(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (await websiteIsInUser(req.body.websiteId, req.user, res)) return

    if (await pageIsInWebsite(req.body.currentPageId, req.body.websiteId, res))
        return

    if (
        await pagesStructureIsRight(
            req.body.pagesStructure,
            req.body.websiteId,
            res
        )
    )
        return

    await Website.findByIdAndUpdate(req.body.websiteId, {
        pagesStructure: req.body.pagesStructure,
    })

    let pagesToPublish = []
    if (req.body.publishOne) {
        pagesToPublish.push(req.body.currentPageId)
    } else {
        const website = await Website.findById(req.body.websiteId)
        if (!website)
            return res
                .status(404)
                .send('The website with the given ID was not found.')
        pagesToPublish = pagesToPublish.concat(
            website.pagesStructure.map(page => page.id)
        )
    }
    await Promise.all(
        pagesToPublish.map(async pageId => {
            const page = await Page.findById(pageId)
            if (!page)
                return res
                    .status(404)
                    .send('The page with the given ID was not found.')
            page.publishedVersion.content = page.toObject().content
            page.markModified('publishedVersion')
            await page.save()
        })
    )

    res.send({
        success: true,
    })
})

// $FlowFixMe
router.post('/revert', [auth, action], async (req, res) => {
    const { error } = validatePagePublishRevert(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (await websiteIsInUser(req.body.websiteId, req.user, res)) return

    if (await pageIsInWebsite(req.body.currentPageId, req.body.websiteId, res))
        return

    if (
        await pagesStructureIsRight(
            req.body.pagesStructure,
            req.body.websiteId,
            res
        )
    )
        return

    await Website.findByIdAndUpdate(req.body.websiteId, {
        pagesStructure: req.body.pagesStructure,
    })

    let pagesToRevert = []
    if (req.body.publishOne) {
        pagesToRevert.push(req.body.currentPageId)
    } else {
        const website = await Website.findById(req.body.websiteId)
        if (!website)
            return res
                .status(404)
                .send('The website with the given ID was not found.')
        pagesToRevert = pagesToRevert.concat(
            website.pagesStructure.map(page => page.id)
        )
    }
    const pagesObjects = {}
    await Promise.all(
        pagesToRevert.map(async pageId => {
            const page = await Page.findById(pageId)
            if (!page)
                return res
                    .status(404)
                    .send('The page with the given ID was not found.')
            page.content = page.publishedVersion.content
            page.markModified('publishedVersion')
            pagesObjects[pageId] = page
            await page.save()
        })
    )

    res.send({
        pagesObjects,
    })
})

router.post('/', [auth, action], async (req, res) => {
    const { error } = validatePageCreate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    if (await websiteIsInUser(req.body.websiteId, req.user, res)) return
    if (req.body.currentPageId) {
        if (
            await pageIsInWebsite(
                req.body.currentPageId,
                req.body.websiteId,
                res
            )
        ) {
            return
        }
    }
    const website = await Website.findById(req.body.websiteId)
    const { page, pagesStructure } = await website.createPage(
        req.body.currentPageId,
        req.body.duplicate
    )
    await website.save()
    res.send({
        page,
        pagesStructure,
    })
})

router.put('/:id', [auth, action], async (req, res) => {
    const { error } = validatePageSave(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (await pageIsInUser(req.params.id, req.user, res)) return

    const page = await Page.findById(req.params.id)
    if (!page) {
        return res.status(404).send('The page with the given ID was not found.')
    }

    if (req.body.pagesStructure) {
        if (
            await pagesStructureIsRight(
                req.body.pagesStructure,
                page.website,
                res
            )
        )
            return
    }
    page.content = req.body.content
    await page.save()

    if (req.body.pagesStructure) {
        await Website.findByIdAndUpdate(page.website, {
            pagesStructure: req.body.pagesStructure,
        })
    }
    res.send({ status: true })
})

router.delete('/:id', [auth, action], async (req, res) => {
    const page = await Page.findById(req.params.id)
    if (!page)
        return res.status(404).send('The page with the given ID was not found.')

    if (await pageIsInUser(req.params.id, req.user, res)) return

    let website = await Website.findById(page.website)
    if (!website)
        return res
            .status(404)
            .send('The website with the given ID was not found.')

    await website.deletePage(page._id)

    website = await website.save()
    res.send({
        pagesStructure: website.pagesStructure,
        currentPage: website.currentPage,
    })
})

module.exports = router
