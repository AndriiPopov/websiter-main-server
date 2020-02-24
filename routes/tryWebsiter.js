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
    date.setTime(date.getTime() + 60 * 1000)
    res.cookie('try_websiter', true, {
        expires: date,
    })
    next()
})

module.exports = router
