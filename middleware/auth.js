const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.header('X-Auth-Token')
    const currentAction = req.header('Current-Action')
    if (!token) return res.status(401).send('Access denied. No token provided.')
    try {
        const decoded = await jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = await User.findById(decoded)
        if (!req.user) {
            return res.status(400).send('User does not not exist.')
        } else {
            next()
        }
    } catch (ex) {
        res.status(400).send('Invalid token.')
    }
}
