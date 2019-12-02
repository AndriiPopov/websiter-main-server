const { User } = require('../models/user')
const { Website } = require('../models/website')
const { Resource } = require('../models/resource')
const { pure } = require('./testPopulateDBandReadStructure')
const { structureType } = require('./resourceTypeIndex')

module.exports.resourceIsInWebsite = async (
    resourceId,
    websiteId,
    res,
    type
) => {
    const website = await Website.findById(websiteId)
    if (!website) {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    } else {
        if (
            !website[structureType[type]].some(
                resource => resource.id.toString() === resourceId
            )
        ) {
            return res
                .status(404)
                .send('The resource with the given ID was not found.')
        }
    }
}

module.exports.resourceIsInUser = async (resourceId, user, res) => {
    const resource = await Resource.findById(resourceId)
    if (
        !user.websites.some(
            website => website.toString() === resource.website.toString()
        )
    ) {
        return res
            .status(404)
            .send('The resource with the given ID was not found.')
    }
}

module.exports.websiteIsInUser = async (websiteId, user, res) => {
    if (!user.websites.some(website => website.toString() === websiteId)) {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    }
}

module.exports.structureIsWrong = async (structure, websiteId, res, type) => {
    const website = await Website.findById(websiteId)
    const oldStructure = pure(website[structureType[type]])
    if (
        structure.some(
            resource =>
                !oldStructure.some(
                    item => item.id.toString() === resource.id.toString()
                )
        )
    ) {
        return res.status(404).send('The resources in the structure are wrong.')
    }
}
