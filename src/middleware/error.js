import winston from 'winston'
import type { $Request, $Response, NextFunction, Middleware } from 'express'

export default (function(
    err: { message: string },
    req: $Request,
    res: $Response,
    next: NextFunction
) {
    winston.error(err.message, err)

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed.')
}: Middleware)
