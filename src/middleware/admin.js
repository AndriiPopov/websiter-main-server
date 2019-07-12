import type { $Request, $Response, NextFunction, Middleware } from 'express'

export default (function(req: $Request, res: $Response, next: NextFunction) {
    // 401 Unauthorized
    // 403 Forbidden

    //if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next()
}: Middleware)
