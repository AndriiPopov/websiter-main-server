const Joi = require('joi')
const mongoose = require('mongoose')

module.exports.Page = mongoose.model(
    'Page',
    new mongoose.Schema({
        website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Websites',
        },
        content: {},
        publishedVersion: {},
    })
)

module.exports.validatePageCreate = data => {
    const schema = {
        currentPageId: Joi.objectId(),
        websiteId: Joi.objectId().required(),
        duplicate: Joi.boolean(),
    }
    return Joi.validate(data, schema)
}

module.exports.validatePageSave = data => {
    const schema = {
        pagesStructure: Joi.array(),
        content: Joi.object(),
    }
    return Joi.validate(data, schema)
}

module.exports.validatePagePublishRevert = data => {
    const schema = {
        currentPageId: Joi.objectId().required(),
        websiteId: Joi.objectId().required(),
        pagesStructure: Joi.array().required(),
        publishOne: Joi.boolean(),
    }
    return Joi.validate(data, schema)
}

// export const validatePageUpdate = page => {
//     const schema = {
//         website: Joi.objectId(),
//         content: Joi.object(),
//         publishedVersion: Joi.object(),
//     }

//     return Joi.validate(page, schema)
// }
