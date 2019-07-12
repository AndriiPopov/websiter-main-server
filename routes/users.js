import auth from '../middleware/auth'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { Page } from '../models/page'
import { Website } from '../models/website'
import { User, validateUser } from '../models/user'
import express from 'express'
import type { $Request, $Response } from 'express'
import action from '../middleware/action'
import type { userReqType } from '../custom-flow-types'

const router = express.Router()

type getReqType = userReqType & $Request

router.get('/', auth, async (req: getReqType, res: $Response) => {
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

type postReqType = {
    body: {
        email: string,
        password: string,
    },
} & userReqType &
    $Request

router.post('/', async (req: postReqType, res: $Response) => {
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

type delReqType = userReqType & $Request

router.delete('/', auth, action, async (req: delReqType, res: $Response) => {
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

export default router
