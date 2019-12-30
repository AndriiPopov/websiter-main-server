const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const { Resource } = require('./resource')
const { findDescendants } = require('../utils/resourcesStructure')
const { structureType, currentType } = require('../utils/resourceTypeIndex')

const websiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    domain: {
        type: String,
        minlength: 1,
        maxlength: 255,
        lowercase: true,
        trim: true,
        unique: true,
        sparse: true,
    },
    domainHidden: {
        type: Boolean,
    },
    customDomainHidden: {
        type: Boolean,
    },
    customDomain: {
        type: String,
        minlength: 1,
        maxlength: 255,
        lowercase: true,
        trim: true,
        sparse: true,
    },
    customDomainApp: {
        type: String,
        minlength: 1,
        maxlength: 255,
    },
    customDomainVerified: {
        type: Boolean,
    },
    cname: {
        type: String,
    },
    verifyCode: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    pagesStructure: [],
    pluginsStructure: [],
    currentPage: {
        type: mongoose.Schema.Types.ObjectId,
    },
    currentPlugin: {
        type: mongoose.Schema.Types.ObjectId,
    },
})

const blankPageContent = {
    currentId: 5,
    structure: [
        {
            id: 'element_-1',
            path: [],
            tag: 'html',
            properties: {},
            style: '',
        },
        {
            id: 'element_0',
            path: ['element_-1'],
            tag: 'head',
            properties: {},
            style: '',
        },
        {
            id: 'element_1',
            path: ['element_-1'],
            tag: 'body',
            properties: {},
            style: '',
        },
        {
            id: 'element_2',
            path: ['element_-1', 'element_1'],
            tag: 'div',
            properties: {},
            style:
                'height: 100px;width: 100px;left: 200px;top: 100px;z-index: 0;background: rgba(100, 0, 80);',
        },
        {
            id: 'element_4',
            path: ['element_-1', 'element_1'],
            tag: 'section',
            properties: {},
            style: 'height: 200px; background:rgba(200, 100, 30);',
        },
        {
            id: 'element_3',
            path: ['element_-1', 'element_1', 'element_4'],
            tag: 'div',
            properties: {},
            style:
                'height: 100px;width: 100px;left: 200px;top: 100px;z-index: 0;background: rgba(0, 0, 80);',
        },
    ],
}

const blankPluginContent = {
    currentId: 1,
    structure: [
        {
            id: 'element_0',
            path: [],
            tag: 'Main element',
            properties: {},
        },
    ],
}

websiteSchema.methods.createResource = async function(
    currentResource,
    type,
    duplicate,
    resourceData
) {
    const generateNewName = (name, attr, divider, i) => {
        let currentName = name
        while (
            this[structureType[type]].some(item => item[attr] === currentName)
        ) {
            i++
            currentName = name + divider + i
        }
        return i
    }

    const getNewNameAndUrl = (name, url) => {
        let max = 0,
            nameIndex = 0,
            urlIndex = 0
        do {
            nameIndex = generateNewName(name, 'name', ' ', max)
            urlIndex = generateNewName(url, 'url', '-', max)
            max = Math.max(nameIndex, urlIndex)
        } while (nameIndex !== urlIndex)

        let nameAdd = ''
        let urlAdd = ''
        if (max > 0) {
            nameAdd = ' ' + max
            urlAdd = '-' + max
        }
        return { nameAdd, urlAdd }
    }

    const prepareDataCreteNewResource = async () => {
        let resource = new Resource()
        resource.website = this
        resource.draft = {}
        if (!resourceData) {
            resource.published =
                type === 'page'
                    ? blankPageContent
                    : type === 'plugin'
                    ? blankPluginContent
                    : {}
        } else {
            resource.published = resourceData
        }
        resource.markModified('draft')
        resource.markModified('published')
        resource = await resource.save()

        this[currentType[type]] = resource
        let data = {}
        if (type === 'page') {
            let { nameAdd, urlAdd } = getNewNameAndUrl('New page', 'new-page')
            data.name = 'New page' + nameAdd
            data.url = 'new-page' + urlAdd
            data.hidden = true
            return { resource, data }
        }
        if (type === 'plugin') {
            const nameIndex = generateNewName('New ' + type, 'name', ' ', 0)

            let nameAdd = ''
            if (nameIndex > 0) {
                nameAdd = ' ' + nameIndex
            }

            data.name = 'New ' + type + nameAdd
            return { resource, data }
        }
    }
    const prepareDataDuplicate = async () => {
        const currentResourceObject = await Resource.findById(currentResource)
        const currentResourceDataArray = this[structureType[type]].filter(
            item => item.id.toString() === currentResource
        )
        if (!currentResourceObject || currentResourceDataArray.length !== 1) {
            return { resource: null, data: null }
        }
        let currentResourceData
        currentResourceData = currentResourceDataArray[0]

        let resource = new Resource()
        resource.website = this
        resource.published = currentResourceObject.published
        resource.draft = currentResourceObject.draft
        resource.markModified('draft')
        resource.markModified('published')
        resource = await resource.save()

        this[currentType[type]] = resource

        let data = {}
        if (type === 'page') {
            let { nameAdd, urlAdd } = getNewNameAndUrl(
                currentResourceData.name,
                currentResourceData.url
            )
            data.name = currentResourceData.name + nameAdd
            data.url = currentResourceData.url + urlAdd
            data.hidden = true
            return { resource, data }
        }
        if (type === 'plugin') {
            const nameIndex = generateNewName(
                currentResourceData.name,
                'name',
                ' ',
                0
            )

            let nameAdd = ''
            if (nameIndex > 0) {
                nameAdd = ' ' + nameIndex
            }

            data.name = currentResourceData.name + nameAdd
            return { resource, data }
        }
    }
    const { resource, data } = duplicate
        ? await prepareDataDuplicate()
        : await prepareDataCreteNewResource()

    if (!resource || !data) return
    if (type === 'page') {
        if (this.pagesStructure.length > 0) {
            data.homepage = false
        } else {
            data.homepage = true
        }
    }
    let newResourceStructureElement
    if (!currentResource) {
        this[structureType[type]].push({
            id: resource._id.toString(),
            path: [],
            ...data,
        })
    } else {
        const currentResourceObjectArray = this[structureType[type]].filter(
            resource => resource.id.toString() === currentResource.toString()
        )
        if (currentResourceObjectArray.length > 0) {
            const currentResourceObject = currentResourceObjectArray[0]
            const currentIndex = this[structureType[type]].indexOf(
                currentResourceObject
            )

            const descendants = findDescendants(
                this[structureType[type]],
                currentResourceObject.id
            )
            if (duplicate) {
                data.connectedResources = [
                    ...currentResourceObject.connectedResources,
                ]
            }

            newResourceStructureElement = {
                id: resource._id.toString(),
                path: [...currentResourceObject.path],
                ...data,
            }
            this[structureType[type]].splice(
                currentIndex + descendants.length + 1,
                0,
                newResourceStructureElement
            )
        } else {
            this[structureType[type]].push({
                id: resource._id.toString(),
                path: [],
                ...data,
            })
        }
    }

    this.markModified(structureType[type])
    return {
        resource,
        data,
    }
}

websiteSchema.methods.deleteResource = async function(resourceId, type) {
    const descedants = findDescendants(
        this[structureType[type]],
        resourceId
    ).map(item => item.id)
    descedants.push(resourceId)

    await Promise.all(
        descedants.map(async id => {
            this[structureType[type]] = this[structureType[type]].filter(
                item => item.id.toString() != id.toString()
            )
            await Resource.findByIdAndRemove(id)
        })
    )

    if (type === 'page') {
        if (!this.pagesStructure.some(item => item.isHomePage)) {
            if (this.pagesStructure.length > 0) {
                this.pagesStructure[0].isHomePage = true
            }
        }
    }
    if (
        descedants.some(
            resource => resource.toString() === resourceId.toString()
        )
    ) {
        if (this[structureType[type]].length > 0) {
            this[currentType[type]] = this[structureType[type]][0].id
        } else {
            this[currentType[type]] = null
        }
    }

    this.markModified(structureType[type])
    return descedants
}

module.exports.Website = mongoose.model('Website', websiteSchema)

module.exports.validateWebsite = website => {
    const schema = {
        name: Joi.string()
            .min(1)
            .max(50)
            .optional(),
        domain: Joi.string()
            .min(1)
            .max(255)
            .optional(),
        customDomain: Joi.string()
            .min(1)
            .max(255)
            .optional(),
        domainHidden: Joi.boolean().optional(),
        customDomainHidden: Joi.boolean().optional(),
    }

    return Joi.validate(website, schema)
}

module.exports.validateWebsiteStructure = website => {
    const schema = {
        structurePatch: Joi.object(),
        type: Joi.string(),
    }

    return Joi.validate(website, schema)
}

module.exports.validateCreateWebsite = website => {
    const schema = {
        duplicate: Joi.boolean().optional(),
        currentWebsite: Joi.string().optional(),
    }

    return Joi.validate(website, schema)
}
