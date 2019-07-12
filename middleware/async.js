import type { $Request, $Response, NextFunction, Middleware } from 'express'

export default (function(handler: (req: $Request, res: $Response) => {}) {
    return async (req: $Request, res: $Response, next: NextFunction) => {
        try {
            await handler(req, res)
        } catch (ex) {
            next(ex)
        }
    }
}: Middleware)
