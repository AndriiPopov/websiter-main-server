const {
    resourceIsInUser,
    resourceIsInWebsite,
    websiteIsInUser,
    structureIsWrong,
} = require('../utils/checkDescedant')
const cloneDeep = require('lodash/cloneDeep')
const isEmpty = require('lodash/isEmpty')
const {
    Resource,
    validateResourceCreate,
    validateResourceSave,
    validateResourcePublishRevert,
    validateResourceLive,
} = require('../models/resource')
const { structureType, currentType } = require('../utils/resourceTypeIndex')
const { Website } = require('../models/website')
const diffpatcher = require('jsondiffpatch/dist/jsondiffpatch.umd.js').create({
    objectHash: obj => obj.id,
    propertyFilter: (name, context) => name !== '__patch__',
})
const { requestResource } = require('./requestResource')
const { getUserRights } = require('../utils/getUserRights')
const { sendError } = require('./error')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const addResourceSchema = Joi.object({
    websiteId: Joi.objectId().required(),
    type: Joi.string().valid('page', 'template', 'plugin'),
    duplicate: Joi.boolean().optional(),
    resourceData: Joi.object().optional(),
    name: Joi.string().optional(),
}).unknown()

module.exports.addResource = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        const { error } = addResourceSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }

        const website = await Website.findById(data.websiteId)
        if (!website) {
            sendError(ws)
            return
        }
        if (
            !(await getUserRights(
                ws.user,
                website,
                data.type === 'page' ? 'content' : 'developer',
                null,
                ws
            ))
        )
            return

        const oldWebsiteObject = website.toObject()

        const result = await website.createResource(
            data._id,
            data.type,
            data.duplicate,
            data.resourceData,
            data.name
        )
        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        website.save()
    } catch (ex) {
        sendError(ws, 'here')
    }
}

const updateResourceSchema = Joi.object({
    _id: Joi.objectId().required(),
    type: Joi.string().valid('page', 'template', 'plugin', 'website'),
    markPublish: Joi.boolean().optional(),
    __patch__: Joi.object(),
}).unknown()

const newWebsiteSchema = Joi.object({
    name: Joi.string()
        .required()
        .allow(''),
    sharing: Joi.array()
        .required()
        .items(
            Joi.object({
                userId: Joi.objectId(),
                rights: Joi.array().items(
                    Joi.string().valid('owner', 'admin', 'developer', 'content')
                ),
                accountInfo: Joi.object().unknown(),
            })
        ),
    pagesStructure: Joi.array()
        .required()
        .items(
            Joi.object({
                id: Joi.objectId().required(),
                path: Joi.array()
                    .items(Joi.objectId())
                    .required(),
                name: Joi.string().allow(''),
                url: Joi.string().allow(''),
                template: Joi.string(),
                homepage: Joi.boolean(),
                hidden: Joi.boolean(),
                notPublished: Joi.boolean(),
            }).unknown()
        ),
    pluginsStructure: Joi.array()
        .required()
        .items(
            Joi.object({
                id: Joi.objectId().required(),
                path: Joi.array()
                    .items(Joi.objectId())
                    .required(),
                name: Joi.string().allow(''),
                hidden: Joi.boolean(),
                notPublished: Joi.boolean(),
            }).unknown()
        ),
    templatesStructure: Joi.array()
        .required()
        .items(
            Joi.object({
                id: Joi.objectId().required(),
                path: Joi.array()
                    .items(Joi.objectId())
                    .required(),
                name: Joi.string().allow(''),
                hidden: Joi.boolean(),
                notPublished: Joi.boolean(),
            }).unknown()
        ),
}).unknown()

const newResourceSchema = Joi.object({
    currentId: Joi.number().optional(),
    structure: Joi.array()
        .required()
        .items(
            Joi.object({
                id: Joi.string().required(),
                path: Joi.array()
                    .required()
                    .items(Joi.string()),
                tag: Joi.string()
                    .required()
                    .allow(''),
            }).unknown()
        ),
    values: Joi.object().required(),
}).unknown()

module.exports.updateResource = async (data, ws) => {
    //add retry if version is incorrect
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        let { error } = updateResourceSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }

        if (data.type === 'website') {
            let website = await Website.findById(data._id)
            if (!website) {
                sendError(ws)
                return
            }

            if (!(await getUserRights(ws.user, website, null, null, ws))) return

            const newWebsite = diffpatcher.patch(
                website.toObject(),
                data.__patch__
            )

            let { error } = newWebsiteSchema.validate(newWebsite)
            if (error) {
                sendError(ws)
                return
            }

            for (let attr in newWebsite) {
                if (
                    ![
                        'id',
                        'domain',
                        'images',
                        'customDomain',
                        'customDomainApp',
                        'customDomainVerified',
                        'cname',
                        'verifyCode',
                        'user',
                        'storage',
                        '__patch__',
                    ].includes(attr)
                ) {
                    website[attr] = newWebsite[attr]
                    website.markModified(attr)
                }
            }
            website.__patch__ = data.__patch__
            website.markModified('__patch__')
            website.save()
            // }
        } else if (['page', 'template', 'plugin'].includes(data.type)) {
            let resource = await Resource.findById(data._id)
            if (!resource) {
                sendError(ws)
                return
            }

            let website = await Website.findById(resource.website)
            if (!website) {
                sendError(ws)
                return
            }

            if (
                !(await getUserRights(
                    ws.user,
                    website,
                    data.type === 'page' ? 'content' : 'developer',
                    null,
                    ws
                ))
            )
                return

            const resourceObject = resource.toObject()
            const draft = resourceObject.draft.structure
                ? resourceObject.draft
                : resourceObject.published
            const newResource = diffpatcher.patch(draft, data.__patch__)
            let { error } = newResourceSchema.validate(newResource)
            if (error) {
                sendError(ws)
                return
            }

            resource.draft = newResource
            resource.__patch__ = data.__patch__

            resource.markModified('__patch__')
            resource.markModified('draft')
            await resource.save()
            if (data.markPublish) {
                const website = await Website.findById(resource.website)
                if (!website) return
                const oldWebsite = website.toObject()
                const resourceItem = website[structureType[data.type]].find(
                    item => item.id.toString() === resource._id.toString()
                )
                if (!resourceItem) {
                    sendError(ws)
                    return
                }

                resourceItem.published = false
                website.__patch__ = diffpatcher.diff(
                    oldWebsite,
                    website.toObject()
                )
                website.markModified('__patch__')
                website.markModified(structureType[data.type])
                website.save()

                ws.send(
                    JSON.stringify({
                        messageCode: 'confirmSaved',
                        _id: resource._id,
                    })
                )
            }
        }
    } catch (ex) {
        requestResource({ id: data._id, type: data.type }, ws)
        sendError(ws)
    }
}

const publishResourceSchema = Joi.object({
    _id: Joi.objectId().required(),
    type: Joi.string().valid('page', 'template', 'plugin'),
}).unknown()

module.exports.publishResource = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        let { error } = publishResourceSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }

        let resource = await Resource.findById(data._id)
        if (!resource) {
            sendError(ws)
            return
        }

        const website = await Website.findById(resource.website)
        if (!website) {
            sendError(ws)
            return
        }

        if (
            !(await getUserRights(
                ws.user,
                website,
                data.type === 'page' ? 'content' : 'developer',
                null,
                ws
            ))
        )
            return

        if (!resource.draft.structure) {
            sendError(ws)
            return
        }

        resource.published = { ...resource.draft }
        resource.draft = {}
        resource.__patch__ = {}

        resource.markModified('draft')
        resource.markModified('published')
        resource.markModified('__patch__')
        const oldWebsite = website.toObject()

        const resourceItem = website[structureType[data.type]].find(
            item => item.id.toString() === resource._id.toString()
        )
        if (!resourceItem) {
            sendError(ws)
            return
        }
        resourceItem.published = true
        resourceItem.connectedResources = resource.published.connectedResources
        website.markModified(structureType[data.type])

        website.__patch__ = diffpatcher.diff(oldWebsite, website.toObject())
        website.markModified('__patch__')
        resource.save()
        website.save()
    } catch (ex) {
        sendError(ws)
    }
}

const revertResourceSchema = Joi.object({
    _id: Joi.objectId().required(),
    to: Joi.string().valid('draft', 'published'),
}).unknown()

module.exports.revertResource = async (data, ws) => {
    //add retry if version is incorrect
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        let { error } = revertResourceSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }
        let resource = await Resource.findById(data._id)
        if (!resource) {
            sendError(ws)
            return
        }

        let draft
        if (data.to === 'draft') {
            if (!resource.draft.structure) draft = resource.published
            else draft = resource.draft
        } else {
            draft = resource.published
        }

        if (!draft.structure) {
            sendError(ws)
            return
        }

        ws.send(
            JSON.stringify({
                messageCode: 'revertResource',
                _id: data._id,
                draft,
            })
        )
    } catch (ex) {
        sendError(ws)
    }
}

const deleteResourceSchema = Joi.object({
    _id: Joi.objectId().required(),
    type: Joi.string().valid('page', 'template', 'plugin'),
}).unknown()

module.exports.deleteResource = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            sendError(
                ws,
                'This action is not allowed in test mode. Please login or create a new account.'
            )
            return
        }
        let { error } = deleteResourceSchema.validate(data)
        if (error) {
            sendError(ws)
            return
        }
        const resource = await Resource.findById(data._id)
        if (!resource) {
            sendError(ws)
            return
        }

        const type = data.type
        let website = await Website.findById(resource.website.toString())
        if (!website) {
            sendError(ws)
            return
        }
        if (
            !(await getUserRights(
                ws.user,
                website,
                type === 'page' ? 'content' : 'developer'
            ))
        )
            return

        const oldWebsiteObject = website.toObject()
        await website.deleteResource(resource._id, type)
        const newWebsiteObject = website.toObject()
        website.__patch__ = diffpatcher.diff(oldWebsiteObject, newWebsiteObject)
        website.markModified('__patch__')
        await website.save()
    } catch (ex) {
        sendError(ws)
    }
}
