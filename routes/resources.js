const Url = require('url-parse')

const { Resource } = require('../models/resource')
const { Website } = require('../models/website')
const { pickResourcesObjectsLive } = require('../utils/pickResourcesObjects')
const express = require('express')
const router = express.Router()

router.post('/live', async (req, res) => {
    if (!req.body.url) return res.status(400).send(error.details[0].message)

    const url = new Url(req.body.url)

    const hostParts = url.hostname.split('.')
    let website, pathname

    if (url.hostname === 'live.websiter.dev') {
        const pathArray = url.pathname.split('/')
        if (pathArray.length < 2) {
            return res.status(400).send('Wrong page')
        }
        website = await Website.findOne({
            domain: pathArray[1],
        })
        if (website)
            if (website.domainHidden) {
                return res.status(400).send('The website is not found')
            }
        pathArray.shift()
        pathArray.shift()
        pathname = pathArray.join('/').trim()
    } else {
        website = await Website.findOne({
            customDomain: url.hostname,
            customDomainVerified: true,
        })
        if (!website) {
            website = await Website.findOne({
                customDomain: url.hostname,
            })
        }
        if (website)
            if (website.customDomainHidden) {
                return res.status(400).send('The website is not found')
            }
        pathname = url.pathname.trim()
    }

    if (!website) return res.status(400).send('No website')
    let page
    if (pathname === '' || pathname === '/') {
        page = website.pagesStructure.find(page => page.homepage === true)
    }
    if (!page) {
        page = website.pagesStructure.find(
            page => page.url === pathname || '/' + page.url === pathname
        )
    }

    if (!page) return res.status(400).send('No page')

    if (page.hidden) return res.status(400).send('No page')

    let template = website.templatesStructure.find(
        template => template.name === page.template
    )

    if (!template) return res.status(400).send('No page')

    if (template.hidden) return res.status(400).send('No page')

    const whitelist = [page.id]

    const pickConnectedResources = resource => {
        whitelist.push(resource.id)
        if (resource.connectedResources)
            resource.connectedResources.forEach(connectedResource => {
                let nextResource
                if (connectedResource.type === 'plugin') {
                    nextResource = website.pluginsStructure.find(
                        item => item.name === connectedResource.name
                    )
                }
                if (nextResource) pickConnectedResources(nextResource)
            })
    }
    pickConnectedResources(template)
    const resourcesObjects = await pickResourcesObjectsLive(website, whitelist)

    res.send({
        resourcesObjects,
        page: page.id,
        template: template.id,
        pagesStructure: website.pagesStructure,
        pluginsStructure: website.pluginsStructure,
        domainNoIndex: website.domainNoIndex,
        baseUrl:
            url.hostname === 'live.websiter.dev'
                ? (process.env.NODE_ENV === 'production'
                      ? 'https://live.websiter.dev/'
                      : 'http://live.websiter.dev:4000/') +
                  website.domain +
                  '/'
                : '',
    })
})

module.exports = router
