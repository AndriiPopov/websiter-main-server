import express from 'express'
import cors from 'cors'
import path from 'path'

import websites from '../routes/websites'
import pages from '../routes/pages'
import users from '../routes/users'
import live from '../routes/live'
import auth from '../routes/auth'
import error from '../middleware/error'
import type { $Application, $Response, $Request, NextFunction } from 'express'

export default function(app: $Application) {
    app.all('/', function(req: $Request, res: $Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        //res.header("Access-Control-Expose-Headers", "X-Auth-Token");
        next()
    })
    app.use(express.static(path.join(__dirname, '/../client/build')))
    app.use(cors())
    app.use(express.json())
    app.use('/api/websites', websites)
    app.use('/api/pages', pages)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use('/live/*', live)
    app.get('*', (req: $Request, res: $Response) => {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'))
    })
    app.use(error)
}
