import express from 'express'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'
import type { $Request, $Response } from 'express'

import { Website } from '../models/website'
import { Page } from '../models/page'
const router = express.Router()

router.get('*', async (req: $Request, res: $Response) => {
    let urlArray = req.originalUrl.split('/')
    if (urlArray.length < 2)
        return res
            .status(404)
            .send('The website with the given URL was not found.')

    const domain = urlArray[2]
    const { pagesStructure } = await Website.findOne(
        { domain: domain },
        'pagesStructure'
    )
    const pagesObjects = {}
    await Promise.all(
        pagesStructure.map(async item => {
            const pageObject = await Page.findById(item.id, 'publishedVersion')
            pagesObjects[item.id] = pageObject.publishedVersion
        })
    )

    fs.readFile(
        path.join(__dirname + '/../client/build/index.html'),
        'utf8',
        (err, data) => {
            if (err) throw err
            urlArray.splice(0, 3)
            const newData = data.replace(
                '<head>',
                "<head><script>window.pagesStructure = JSON.parse('" +
                    JSON.stringify(pagesStructure) +
                    "');window.pagesObjects = JSON.parse('" +
                    JSON.stringify(pagesObjects) +
                    "');window.currentPage = JSON.parse('" +
                    JSON.stringify(urlArray.join('/')) +
                    "');</script>"
            )

            res.send(newData)
        }
    )
})

export default router
