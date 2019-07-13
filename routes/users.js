const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const { Page } = require('../models/page')
const { Website } = require('../models/website')
const { User, validateUser } = require('../models/user')
const express = require('express')
const action = require('../middleware/action')

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const user = req.user
    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'title'])
        })
    )

    let website
    if (user.currentWebsite) {
        website = await Website.findById(user.currentWebsite)
    }

    if (!website && user.websites.length > 0) {
        website = await Website.findById(user.websites[0])
        user.currentWebsite = website
        await user.save()
    }

    const pagesObjects = {}
    if (website) {
        await Promise.all(
            website.pagesStructure.map(async item => {
                pagesObjects[item.id] = await Page.findById(item.id)
            })
        )
    } else {
        website = {}
    }

    res.send({
        email: user.email,
        website,
        websites,
        pagesObjects,
        currentAction: user.currentAction,
    })
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email })

    if (user) {
        return res.status(400).send('User already registered.')
    }

    user = new User({
        email: req.body.email,
        password: req.body.password,
        currentAction: 0,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    const website = await user.createWebsite(user)

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

    await user.save()

    req.user = user

    const token = user.generateAuthToken()
    res.set({
        'X-Auth-Token': token,
    }).send({
        ..._.pick(user, ['_id', 'email']),
        token,
        website,
        websites,
        pagesObjects,
        currentAction: user.currentAction,
    })
})

router.delete('/', auth, action, async (req, res) => {
    const user = req.user
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
