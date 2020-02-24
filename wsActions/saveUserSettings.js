const { User } = require('../models/user')
const { sendError } = require('./error')
const Joi = require('@hapi/joi')

const schema = Joi.object({
    settings: Joi.any(),
}).unknown()
module.exports.saveUserSettings = async (data, ws) => {
    try {
        if (ws.tryWebsiter) {
            return
        }
        let { error } = schema.validate(data)
        if (error) {
            sendError(ws)
            return
        }
        if (data) {
            const user = await User.findById(ws.user)
            if (user) {
                user.settings = data.settings
                user.markModified('settings')
                await user.save()
            }
        }
    } catch (ex) {
        sendError(ws)
    }
}
