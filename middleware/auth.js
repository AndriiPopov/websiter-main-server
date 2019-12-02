const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token')
    const currentAction = req.header('Current-Action')
    if (!token) return res.status(412).send('Access denied. No token provided.')
    await jwt.verify(
        token,
        process.env.jwtPrivateKey,
        {
            ignoreExpiration: true,
        },
        async (err, decoded) => {
            if (err) {
                res.status(412).send('Invalid token.') // logout implement
            } else {
                req.user = await User.findById(decoded)
                if (!req.user) {
                    return res.status(412).send('User does not not exist.')
                } else {
                    await jwt.verify(
                        token,
                        process.env.jwtPrivateKey,
                        async (err, decoded) => {
                            if (err) {
                                if (err.name === 'TokenExpiredError') {
                                    if (
                                        Date.now() - err.expiredAt <
                                        518400000
                                    ) {
                                        if (req.user.logoutAllDate) {
                                            if (
                                                err.expiredAt - 86400000 <=
                                                req.user.logoutAllDate
                                            ) {
                                                res.status(412).send(
                                                    'Invalid token.'
                                                )
                                            }
                                        }
                                        const newToken = req.user.generateAuthToken()
                                        res.cookie('auth_token', token)
                                        res.set({
                                            'Access-Control-Expose-Headers':
                                                'x-auth-token',
                                            'x-auth-token': newToken,
                                        })
                                        next()
                                    } else {
                                        res.status(412).send('Invalid token.')
                                    }
                                } else {
                                    res.status(412).send('Invalid token.')
                                }
                            } else {
                                next()
                            }
                        }
                    )
                }
            }
        }
    )
}
