const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const pick = require('lodash/pick')
const omit = require('lodash/omit')
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

router.get('/', [auth], async (req, res) => {
    try {
        const tryWebsiter = req.query.tryWebsiter
        let user
        if (tryWebsiter) {
            user = await User.findOne({
                userid: '107126278789419698570',
                platformId: 'google',
            })
        } else {
            user = req.user
        }
        if (!user) return res.status(400).send('No User')

        let website
        if (tryWebsiter) {
            if (user.websites.length < 1)
                return res.status(400).send('No Website')
            website = await Website.findById(user.websites[0].id)
        }

        let result = {
            tryWebsiter: false,
        }

        // if (tryWebsiter) {
        //     result.barSizes = {
        //         height: 200,
        //         width: 500,
        //         width2: 200,
        //         width3: 200,
        //     }
        //     result.tooltipsOn = true
        //     result.websites = [websites[0]]
        //     result.tryWebsiter = true
        // }
        res.send(result)
    } catch (ex) {}
})

module.exports = router
