const { User } = require('../models/user')
const { Website } = require('../models/website')
const { Page } = require('../models/page')
const { pure } = require('./testPopulateDBandReadStructure')

module.exports.pageIsInWebsite = async (pageId, websiteId, res) => {
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

module.exports.pageIsInUser = async (pageId, user, res) => {
    const page = await Page.findById(pageId)
    if (
        !user.websites.some(
            website => website.toString() === page.website.toString()
        )
    ) {
        return res.status(404).send('The page with the given ID was not found.')
    }
}

module.exports.websiteIsInUser = async (websiteId, user, res) => {
    if (!user.websites.some(website => website.toString() === websiteId)) {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    }
}

module.exports.pagesStructureIsRight = async (
    pagesStructure,
    websiteId,
    res
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
