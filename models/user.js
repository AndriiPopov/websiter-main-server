const jwt = require('jsonwebtoken')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const { Website } = require('../models/website')
const { Resource } = require('./resource')
const { System } = require('../models/system')
const { generateWebsiteId } = require('./system')

const userSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     // required: true,
    //     minlength: 5,
    //     maxlength: 255,
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    // },
    // password: {
    //     type: String,
    //     // required: true,
    //     minlength: 5,
    //     maxlength: 1024,
    // },
    websites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Website',
        },
    ],
    images: [],
    storage: {
        type: Number,
        required: true,
        min: 0,
    },
    loadedWebsite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Websites',
    },
    currentAction: {
        type: Number,
        required: true,
    },
    barSizes: {},
    userid: {
        type: String,
        required: true,
    },
    platformId: {
        type: String,
        required: true,
    },
    logoutAllDate: {
        type: Date,
        default: '',
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey, {
        expiresIn: '1d',
    })
    return token
}

userSchema.methods.createWebsite = async function() {
    const domainId = await generateWebsiteId()
    let website = new Website({
        name: 'New website',
        domain: 'new-website-' + domainId,
        user: this,
        customDomain: '',
        customDomainApp: '',
    })

    await website.createResource('', 'page')
    website = await website.save()
    this.loadedWebsite = website
    await this.save()
    return website
}

userSchema.methods.deleteWebsite = async function(_id, res) {
    const website = await Website.findById(_id)
    if (!website)
        return res
            .status(404)
            .send('The website with the given ID was not found.')

    await Promise.all(
        website.pagesStructure.map(async item => {
            await Resource.findByIdAndRemove(item.id)
        })
    )

    await Promise.all(
        website.filesStructure.map(async item => {
            await Resource.findByIdAndRemove(item.id)
        })
    )

    await Promise.all(
        website.pluginsStructure.map(async item => {
            await Resource.findByIdAndRemove(item.id)
        })
    )

    await Website.findByIdAndRemove(_id)
    const index = this.websites.indexOf(_id)
    this.websites.splice(index, 1)
    if (this.websites.length > 0) {
        this.loadedWebsite = this.websites[0]
    } else {
        this.loadedWebsite = null
    }
}

module.exports.User = mongoose.model('User', userSchema)

module.exports.validateUser = user => {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email({ minDomainAtoms: 2 }),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
    }

    return Joi.validate(user, schema)
}

module.exports.validateToken = user => {
    const schema = {
        token: Joi.string().required(),
    }

    return Joi.validate(user, schema)
}

module.exports.validateUserData = user => {
    const schema = {
        storage: Joi.number()
            .min(0)
            .optional(),
        images: Joi.array()
            .items(
                Joi.object().keys({
                    url: Joi.string().required(),
                    name: Joi.string().required(),
                    label: Joi.string().required(),
                    size: Joi.number()
                        .min(0)
                        .required(),
                })
            )
            .optional(),
        barSizes: Joi.object().optional(),
    }

    return Joi.validate(user, schema)
}
