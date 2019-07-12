import config from 'config'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import mongoose from 'mongoose'
import { Website } from '../models/website'
import { Page } from '../models/page'
import JoiObjectId from 'joi-objectid'
Joi.objectId = JoiObjectId(Joi)

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    websites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Website',
        },
    ],
    currentWebsite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Websites',
    },
    currentAction: {
        type: Number,
        required: true,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey')
    )
    return token
}

userSchema.methods.createWebsite = async function() {
    let website = new Website({
        title: 'New website',
    })
    await website.createPage(website)
    website = await website.save()
    this.currentWebsite = website
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
            await Page.findByIdAndRemove(item.id)
        })
    )
    await Website.findByIdAndRemove(_id)
    const index = this.websites.indexOf(_id)
    this.websites.splice(index, 1)
    if (this.websites.length > 0) {
        this.currentWebsite = this.websites[0]
    } else {
        this.currentWebsite = null
    }
}

export const User = mongoose.model('User', userSchema)

export const validateUser = (user: {}) => {
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
