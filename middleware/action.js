const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

module.exports = async (req, res, next) => {
    const currentAction = req.header('currentAction')
    if (parseInt(currentAction) !== req.user.currentAction) {
        const newCurrentAction = req.user.currentAction + 1
        req.user.currentAction = newCurrentAction
        await req.user.save()
        res.send({
            currentAction: newCurrentAction,
            reload: true,
        })
    } else {
        next()
    }
}
