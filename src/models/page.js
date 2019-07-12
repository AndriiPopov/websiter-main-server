import Joi from 'joi'
import mongoose from 'mongoose'

export const Page = mongoose.model(
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

export const validatePageCreate = (data: {}) => {
    const schema = {
        currentPageId: Joi.objectId(),
        websiteId: Joi.objectId().required(),
        duplicate: Joi.boolean(),
    }
    return Joi.validate(data, schema)
}

export const validatePageSave = (data: {}) => {
    const schema = {
        pagesStructure: Joi.array(),
        content: Joi.object(),
    }
    return Joi.validate(data, schema)
}

export const validatePagePublishRevert = (data: {}) => {
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
