const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

module.exports = async (req, res, next) => {
    const currentAction = req.header('currentAction')
    try {
        if (parseInt(currentAction) !== req.user.currentAction) {
            res.status(412).send('Wrong action count')
        } else {
            req.user.currentAction = req.user.currentAction + 1
            await req.user.save()
            next()
        }
    } catch (ex) {
        res.status(412).send('Wrong action count')
    }
}
