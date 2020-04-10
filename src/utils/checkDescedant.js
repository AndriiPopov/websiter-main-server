const { User } = require('../models/user')
const { Website } = require('../models/website')
const { Resource } = require('../models/resource')
const { pure } = require('./testPopulateDBandReadStructure')
const { structureType } = require('./resourceTypeIndex')

module.exports.resourceIsInWebsite = async (resourceId, websiteId, type) => {
    const website = await Website.findById(websiteId)
    if (!website) {
        return false
    } else {
        if (
            !website[structureType[type]].some(
                resource => resource.id.toString() === resourceId
            )
        ) {
            return false
        }
    }
    return true
}

module.exports.resourceIsInUser = async (resourceId, user, res) => {
    const resource = await Resource.findById(resourceId)
    if (
        !user.websites.some(
            website => website.id.toString() === resource.website.toString()
        )
    ) {
        return res
            .status(404)
            .send('The resource with the given ID was not found.')
    }
}

// module.exports.websiteIsInUser = async (websiteId, user) => {
//     if (typeof user === 'string') {
//         user = await User.findById(user)
//     }
//     if (!user) return false
//     if (!user.websites.some(website => website.id.toString() === websiteId)) {
//         return false
//     }
//     return true
// }

// module.exports.structureIsWrong = async (structure, websiteId, res, type) => {
//     const website = await Website.findById(websiteId)
//     const oldStructure = pure(website[structureType[type]])
//     if (
//         structure.some(
//             resource =>
//                 !oldStructure.some(
//                     item => item.id.toString() === resource.id.toString()
//                 )
//         )
//     ) {
//         return res.status(404).send('The resources in the structure are wrong.')
//     }
// }
