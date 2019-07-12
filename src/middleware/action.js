import jwt from 'jsonwebtoken'
import config from 'config'
import { User } from '../models/user'
import type { $Request, $Response, NextFunction, Middleware } from 'express'
import type { userReqType } from '../custom-flow-types'
type reqType = userReqType & $Request

export default (async (req: reqType, res: $Response, next: NextFunction) => {
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
}: Middleware)
