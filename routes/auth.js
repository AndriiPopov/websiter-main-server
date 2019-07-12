import Joi from 'joi'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { Page } from '../models/page'
import { Website } from '../models/website'
import { User, validateUser } from '../models/user'
import express from 'express'
import type { $Request, $Response } from 'express'
const router = express.Router()

type reqType = {
    body: {
        email: string,
        password: string,
    },
}

router.post('/', async (req: reqType, res: $Response) => {
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
        user.save()
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

    const token = user.generateAuthToken()
    res.set({
        'X-Auth-Token': token,
    }).send({
        ..._.pick(user, ['_id', 'email']),
        token: token,
        websites,
        website,
        pagesObjects,
        currentAction: user.currentAction,
    })
})

export default router
