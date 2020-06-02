const { User } = require('../models/user')
const jwt = require('jsonwebtoken')

const { sendError } = require('./error')

const authenticate = async (data, ws) => {
    try {
        let user
        const token = data.user
        const tryWebsiter = data.tryWebsiter
        if (tryWebsiter) {
            user = await User.findById(process.env.websiterUserId)

            if (!user) {
                sendError(
                    ws,
                    'Something went wrong or this option is not available at this moment. Please try again later.',
                    true
                )
            }
        } else {
            if (token) {
                await jwt.verify(
                    token,
                    process.env.jwtPrivateKey,
                    async (err, decoded) => {
                        if (err) {
                            sendError(ws, 'Login error1.', true)
                        } else {
                            user = await User.findById(decoded._id)
                            if (!user) {
                                sendError(ws, 'Login error2.', true)
                            } else {
                                if (decoded.issued < user.logoutAllDate) {
                                    user = null
                                    sendError(ws, 'Login error2.', true)
                                }
                            }
                        }
                    }
                )
            }
        }
        return user
    } catch {
        sendError(ws, 'Login error.3', true)
        return false
    }
}

module.exports.auth = async (ws, data) => {
    try {
        let user = await authenticate(data, ws)
        if (user) {
            if (!data.noRequest) {
                const userObject = user.toObject()
                if (data.tryWebsiter) userObject._id = 'try'

                ws.send(
                    JSON.stringify({
                        messageCode: 'addResource',
                        resource: userObject,
                    })
                )
                if (data.tryWebsiter) {
                    ws.tryWebsiter = true
                }
                ws.user = user._id.toString()
                ws.resources[user._id.toString()] = user.__v
            }
        } else {
            sendError(ws, 'Login error.4', true)
        }
    } catch (ex) {
        sendError(ws, 'Login error.5', true)
    }
}

AWSAccessKeyId = 'AKIAYRJEHVZTDUBDXJ5E'
AWSSecretKey = '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'
S3_BUCKET = 'websiter'
