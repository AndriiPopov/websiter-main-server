const pick = require('lodash/pick')
const { Website } = require('../models/website')
const {
    User,
    validateUser,
    validateUserData,
    validateToken,
} = require('../models/user')
const express = require('express')
const { pickResourcesObjects } = require('../utils/pickResourcesObjects')

const router = express.Router()

router.get('/', async (req, res, next) => {
    const date = new Date()
    res.cookie('try_websiter', true, {
        maxAge: 10000,
    })
    next()
})

module.exports = router
