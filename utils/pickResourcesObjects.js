const { Resource } = require('../models/resource')
const { isEmpty } = require('lodash')

module.exports.pickResourcesObjects = async website => {
    const result = {}
    const resourcesArray = [
        ...website.pagesStructure,
        ...website.pluginsStructure,
    ]

    if (website) {
        await Promise.all(
            resourcesArray.map(async item => {
                const resourceObject = await Resource.findById(item.id)
                if (resourceObject) {
                    result[item.id] = {
                        draft: isEmpty(resourceObject.draft)
                            ? resourceObject.published
                            : resourceObject.draft,
                        present: {},
                        future: [],
                        past: [],
                    }
                }
            })
        )
    } else {
        website = {}
    }
    return result
}

module.exports.pickResourcesObjectsLive = async (website, whitelist) => {
    const result = {}
    const resourcesArray = [
        ...website.pagesStructure,
        ...website.pluginsStructure,
    ]

    await Promise.all(
        resourcesArray.map(async item => {
            if (whitelist.includes(item.id)) {
                const resourceObject = await Resource.findById(item.id)
                if (resourceObject) {
                    result[item.id] = resourceObject.published
                }
            }
        })
    )
    return result
}
