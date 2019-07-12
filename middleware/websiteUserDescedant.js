import type { $Request, $Response, NextFunction, Middleware } from 'express'

type reqType = {
    user: { websites: [string] },
} & $Request

export default (async (req: reqType, res: $Response, next: NextFunction) => {
    if (
        req.user.websites.some(
            website => website.toString() === req.params.id.toString()
        )
    ) {
        next()
    } else {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    }
}: Middleware)
