const { Website } = require('../models/website')

module.exports.getUserRights = async (id, website, right, res, ws) => {
    try {
        const result = await checkUserRights(id, website, right, res, ws)

        if (!result) {
            if (ws) sendError(ws, 'Not enough rights.')
            else if (res) res.status(412).send('Not enough rights.')
        }
        return result
    } catch (ex) {}
}

const checkUserRights = async (id, website, right, res, ws) => {
    try {
        if (typeof website === 'string') {
            website = await Website.findById(website)
        }
        if (!website) {
            return false
        }

        let owner = website.sharing.find(
            item => item.userId.toString() === website.user.toString()
        )
        if (!owner) {
            owner = {
                userId: website.toString(),
                rights: ['owner', 'admin', 'content', 'developer'],
            }
            website.sharing.unshift(owner)
            website.markModified('sharing')
            await website.save()
        } else if (
            !owner.rights.includes('owner') ||
            !owner.rights.includes('admin')
        ) {
            owner = {
                userId: website.user,
                rights: ['owner', 'admin'],
            }
            website.markModified('sharing')
            await website.save()
        }

        const account = website.sharing.find(
            item => item.userId.toString() === id.toString()
        )
        if (account) {
            if (!right) {
                return true
            } else if (typeof right === 'string') {
                if (account.rights.includes(right)) return true
            } else {
                let allow = false
                right.forEach(item => {
                    if (account.rights.includes(item)) allow = true
                })
                if (!allow) return false
                else return true
            }
        }
        return false
    } catch (ex) {}
}
