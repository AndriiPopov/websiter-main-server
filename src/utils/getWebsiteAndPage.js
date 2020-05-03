const Url = require('url-parse')
const decodeUriComponent = require('decode-uri-component')
const { Website } = require('../models/website')

const getWebsiteAndPage = async (urlString, res) => {
    if (!urlString) return res.status(400).send(error.details[0].message)

    const url = new Url(urlString, true)
    const is120 = url.query.thumbnail === '1'
    let isLocal
    const hostParts = url.hostname.split('.')
    let website, pathname, base
    if (
        url.hostname === 'live.websiter.dev' ||
        url.hostname === 'live.websiter.test'
    ) {
        isLocal = true
        const pathArray = url.pathname.split('/')
        if (pathArray.length < 2) {
            res.status(400).send('Wrong page')
            return
        }
        base = 'https://' + url.hostname + '/' + pathArray[1] + '/'
        website = await Website.findOne({
            domain: pathArray[1],
        })
        if (website)
            if (website.domainHidden) {
                res.status(400).send('The website is not found')
                return
            }
        pathArray.shift()
        pathArray.shift()
        pathname = pathArray.join('/').trim()
    } else {
        base = 'https://' + url.hostname + '/'
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
        pathname = url.pathname.trim()
    }
    pathname = decodeUriComponent(pathname)

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

    return { website, page, url, pathname, is120, isLocal, base }
}

module.exports.getWebsiteAndPage = getWebsiteAndPage
