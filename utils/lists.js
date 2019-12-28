const { Website } = require('../models/website')
const { pick } = require('lodash')

module.exports.getWebsites = async user => {
    return await Promise.all(
        user.websites.map(async id => {
            const website = await Website.findById(id)
            return pick(website, [
                '_id',
                'domain',
                'customDomain',
                'domainHidden',
                'customDomainHidden',
                'name',
                'customDomainVerified',
                'verifyCode',
                'cname',
            ])
        })
    )
}
