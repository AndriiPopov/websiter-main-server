import { User } from '../models/user'
import { Website } from '../models/website'
import { Page } from '../models/page'
import { pure } from './testPopulateDBandReadStructure'
import type { $Response as resType } from 'express'

export const pageIsInWebsite = async (
    pageId: string,
    websiteId: string,
    res: resType
) => {
    const website = await Website.findById(websiteId)
    if (!website) {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    } else {
        if (
            !website.pagesStructure.some(page => page.id.toString() === pageId)
        ) {
            return res
                .status(404)
                .send('The page with the given ID was not found.')
        }
    }
}

export const pageIsInUser = async (
    pageId: string,
    user: Object,
    res: resType
) => {
    const page = await Page.findById(pageId)
    if (
        !user.websites.some(
            website => website.toString() === page.website.toString()
        )
    ) {
        return res.status(404).send('The page with the given ID was not found.')
    }
}

export const websiteIsInUser = async (
    websiteId: string,
    user: Object,
    res: resType
) => {
    if (!user.websites.some(website => website.toString() === websiteId)) {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    }
}

export const pagesStructureIsRight = async (
    pagesStructure: Array<Object>,
    websiteId: string,
    res: resType
) => {
    const website = await Website.findById(websiteId)

    const oldPagesStructure = pure(website.pagesStructure)
    if (
        pagesStructure.some(
            page =>
                !oldPagesStructure.some(
                    item => item.id.toString() === page.id.toString()
                )
        )
    ) {
        return res.status(404).send('The pages in the pageStructure are wrong.')
    }
}
