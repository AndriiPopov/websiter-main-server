const Url = require('url-parse')
const decodeUriComponent = require('decode-uri-component')
const { Website } = require('../models/website')

const prod = process.env.NODE_ENV === 'production'

const getWebsiteAndPage = async (urlString, res) => {
    if (!urlString) return res.status(400).send(error.details[0].message)

    const url = new Url(urlString, true)
    const is120 = url.query.thumbnail === '1'
    let isLocal
    const hostParts = url.hostname.split('.')
    let website
    if (url.hostname.indexOf('live.websiter.' + (prod ? 'dev' : 'test')) > 0) {
        isLocal = true

        const hostArray = url.hostname.split('.')
        if (hostArray.length < 4) {
            res.status(400).send('Wrong page')
            return
        }
        website = await Website.findOne({
            domain: hostArray.slice(0, hostArray.length - 3).join('.'),
        })
        if (website)
            if (website.domainHidden) {
                res.status(400).send('The website is not found')
                return
            }
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
                res.status(400).send('The website is not found')
                return
            }
    }
    const pathname = decodeUriComponent(url.pathname.trim())

    if (!website) {
        res.status(400).send('No website')
        return
    }
    let page
    if (pathname === '' || pathname === '/') {
        page = website.pagesStructure.find(
            page =>
                page.homepage === true && !page.generalSettings && !page.hidden
        )
    }
    if (!page) {
        page = website.pagesStructure.find(
            page =>
                (page.relUrl === pathname || '/' + page.relUrl === pathname) &&
                !page.generalSettings &&
                !page.hidden
        )
    }

    return { website, page, url, pathname, is120, isLocal }
}

module.exports.getWebsiteAndPage = getWebsiteAndPage
