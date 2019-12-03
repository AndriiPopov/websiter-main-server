const Joi = require('joi')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const action = require('../middleware/action')
const auth = require('../middleware/auth')
const { Website } = require('../models/website')
const { User, validateUser } = require('../models/user')
const express = require('express')
const router = express.Router()
const { pickResourcesObjects } = require('../utils/pickResourcesObjects')
const passport = require('passport')
require('../authStrategies/google')
require('../authStrategies/facebook')
require('../authStrategies/twitter')

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
        return res.status(400).send('Invalid email or password.')

    const websites = await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return _.pick(website, ['_id', 'domain', 'customDomain', 'name'])
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

    const token = user.generateAuthToken()
    res.set({
        'x-auth-token': token,
    }).send({
        ..._.pick(user, ['_id', 'email', 'storage', 'images', 'barSizes']),
        token: token,
        ..._.pick(website, [
            'pagesStructure',
            'filesStructure',
            'pluginsStructure',
            'currentPage',
        ]),
        websites,
        resourcesObjects,
        loadedWebsite: user.loadedWebsite,
        currentAction: user.currentAction,
    })
})

router.post('/logoutall', [auth, action], async (req, res) => {
    req.user.logoutAllDate = Date.now()
    req.user.markModified('logoutAllDate')
    await req.user.save()
    res.send({
        success: true,
    })
})

// GOOGLE
router.get(
    '/google/start',
    passport.authenticate('google', {
        session: false,
        scope: ['openid', 'profile', 'email'],
    })
)

router.get(
    '/google/redirect',
    passport.authenticate('google', { session: false }),
    async (req, res) => {
        const token = req.user.generateAuthToken()
        res.cookie('auth_token', token).redirect('http://localhost:3000/login')
    }
)

// FACEBOOK
router.get(
    '/facebook/start',
    passport.authenticate('facebook', {
        session: false,
    })
)

router.get(
    '/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    async (req, res) => {
        const token = req.user.generateAuthToken()
        res.cookie('auth_token', token).redirect('http://localhost:3000/login')
    }
)

// TWITTER
router.get(
    '/twitter/start',
    passport.authenticate('twitter', {
        session: false,
    })
)

router.get(
    '/twitter/redirect',
    passport.authenticate('twitter', { session: false }),
    async (req, res) => {
        const token = req.user.generateAuthToken()
        res.cookie('auth_token', token).redirect('http://localhost:3000/login')
    }
)

module.exports = router
