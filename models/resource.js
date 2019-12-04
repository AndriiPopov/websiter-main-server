const Joi = require('joi')
const mongoose = require('mongoose')

module.exports.Resource = mongoose.model(
    'Resource',
    new mongoose.Schema(
        {
            website: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Websites',
            },
            draft: { type: mongoose.Schema.Types.Mixed, default: {} },
            published: { type: mongoose.Schema.Types.Mixed, default: {} },
        },
        { minimize: false }
    )
)

module.exports.validateResourceCreate = data => {
    const schema = {
        currentResourceId: Joi.objectId()
            .optional()
            .allow(''),
        websiteId: Joi.objectId().required(),
        duplicate: Joi.boolean().optional(),
        type: Joi.string().required(),
        resourceData: Joi.object().optional(),
    }
    return Joi.validate(data, schema)
}

module.exports.validateResourceSave = data => {
    const schema = {
        structure: Joi.array().required(),
        type: Joi.string().required(),
        resourcePatch: Joi.alternatives(Joi.object(), Joi.array()),
    }
    return Joi.validate(data, schema)
}

module.exports.validateResourcePublishRevert = data => {
    const schema = {
        structure: Joi.array(),
        type: Joi.string(),
        revert: Joi.boolean(),
    }
    return Joi.validate(data, schema)
}

module.exports.validateResourceLive = data => {
    const schema = {
        url: Joi.string().required(),
    }
    return Joi.validate(data, schema)
}
