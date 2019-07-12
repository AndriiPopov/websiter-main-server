import jwt from 'jsonwebtoken'
import config from 'config'
import { User } from '../models/user'
import type { $Request, $Response, NextFunction, Middleware } from 'express'
import type { userReqType } from '../custom-flow-types'
type reqType = userReqType & $Request

export default (async (req: reqType, res: $Response, next: NextFunction) => {
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
}: Middleware)
