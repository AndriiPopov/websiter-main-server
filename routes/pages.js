import express from 'express'
import _ from 'lodash'
import action from '../middleware/action'
import auth from '../middleware/auth'
import type { $Request, $Response } from 'express'

const router = express.Router()
import {
    pageIsInUser,
    pageIsInWebsite,
    websiteIsInUser,
    pagesStructureIsRight,
} from '../utils/checkDescedant'
import { Website } from '../models/website'
import {
    Page,
    validatePageCreate,
    validatePageSave,
    validatePagePublishRevert,
} from '../models/page'

type pubReqType = {
    user: {},
    body: {
        websiteId: string,
        currentPageId: string,
        pagesStructure: Array<{
            id: String,
            url: string,
        }>,
        publishOne: boolean,
    },
} & $Request

// $FlowFixMe
router.post(
    '/publish',
    [auth, action],
    async (req: pubReqType, res: $Response) => {
        const { error } = validatePagePublishRevert(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        if (await websiteIsInUser(req.body.websiteId, req.user, res)) return

        if (
            await pageIsInWebsite(
                req.body.currentPageId,
                req.body.websiteId,
                res
            )
        )
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
    }
)

// $FlowFixMe
router.post(
    '/revert',
    [auth, action],
    async (req: pubReqType, res: $Response) => {
        const { error } = validatePagePublishRevert(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        if (await websiteIsInUser(req.body.websiteId, req.user, res)) return

        if (
            await pageIsInWebsite(
                req.body.currentPageId,
                req.body.websiteId,
                res
            )
        )
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
    }
)

type postReqType = {
    user: {},
    body: {
        content: {},
        currentPageId: string,
        websiteId: string,
        duplicate: boolean,
    },
} & $Request

// $FlowFixMe
router.post('/', [auth, action], async (req: postReqType, res: $Response) => {
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

type putReqType = {
    user: {},
    body: {
        content: {},
        pagesStructure: Array<{
            id: String,
            url: string,
        }>,
    },
} & $Request

// $FlowFixMe
router.put('/:id', [auth, action], async (req: putReqType, res: $Response) => {
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

type delReqType = {
    user: {},
} & $Request

// $FlowFixMe
router.delete(
    '/:id',
    [auth, action],
    async (req: delReqType, res: $Response) => {
        const page = await Page.findById(req.params.id)
        if (!page)
            return res
                .status(404)
                .send('The page with the given ID was not found.')

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
    }
)

export default router
