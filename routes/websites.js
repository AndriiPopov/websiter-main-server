const express = require('express')
const _ = require('lodash')
const auth = require('../middleware/auth')
const action = require('../middleware/action')
const websiteUserDescedant = require('../middleware/websiteUserDescedant')
const { pagesStructureIsRight } = require('../utils/checkDescedant')
const { User } = require('../models/user')
const { Website, validateWebsite } = require('../models/website')
const { Page } = require('../models/page')

const router = express.Router()

router.post('/', [auth, action], async (req, res) => {
    const user = req.user
    const website = await user.createWebsite()
    const pagesObjects = {}
    await Promise.all(
        website.pagesStructure.map(async item => {
            pagesObjects[item.id] = await Page.findById(item.id)
        })
    )

    user.websites.push(website._id)
    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'title'])
        })
    )
    user.currentWebsite = website
    await user.save()

    res.send({
        website,
        websites,
        pagesObjects,
    })
})

router.put('/:id', [auth, action, websiteUserDescedant], async (req, res) => {
    const user = req.user
    let urlNotOk = false
    const { error } = validateWebsite(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (req.body.pagesStructure) {
        if (
            await pagesStructureIsRight(
                req.body.pagesStructure,
                req.params.id,
                res
            )
        ) {
            return
        }
        req.body.pagesStructure.forEach(item => {
            if (
                req.body.pagesStructure.some(
                    element =>
                        (element.url === item.url && element.id !== item.id) ||
                        !/^([A-Za-z0-9\-\_]+)$/.test(element.url)
                )
            ) {
                urlNotOk = true
            }
        })
    }
    if (urlNotOk) {
        return res.send({ urlNotOk: true })
    }

    const website = await Website.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'title'])
        })
    )
    res.send({
        website,
        websites,
    })
})

router.put(
    '/currentpage/:id',
    [auth, action, websiteUserDescedant],
    async (req, res) => {
        const user = req.user
        const { error } = validateWebsite(req.body)
        if (error) return res.status(400).send(error.details[0].message)

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

        await user.deleteWebsite(req.params.id, res)
        await user.save()

        const websites = await Promise.all(
            user.websites.map(async id => {
                const website = await Website.findById(id)
                return _.pick(website, ['_id', 'domain', 'title'])
            })
        )

        const website = await Website.findById(user.currentWebsite)
        const pagesObjects = {}
        if (website) {
            await Promise.all(
                website.pagesStructure.map(async item => {
                    pagesObjects[item.id] = await Page.findById(item.id)
                })
            )
        }

        res.send({
            website,
            websites,
            pagesObjects,
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
        user.currentWebsite = website
        await user.save()
    }
    if (!website)
        return res
            .status(404)
            .send('The website with the given ID was not found.')

    const pagesObjects = {}
    await Promise.all(
        website.pagesStructure.map(async item => {
            pagesObjects[item.id] = await Page.findById(item.id)
        })
    )

    res.send({
        website,
        pagesObjects,
    })
})

module.exports = router
