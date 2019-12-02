const bcrypt = require('bcryptjs')
// const { User } = require('../models/user')
// const { Website } = require('../models/website')
// const { Page } = require('../models/page')

module.exports.populateTestDB = async settings => {
    const tokens = []
    for (let userCount = 0; userCount <= settings.users; userCount++) {
        let user = new User({
            email: `myemail_${userCount}@domain${userCount}.com`,
            password: `12345_${userCount}`,
            currentAction: 10,
        })
        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        if (userCount !== settings.users) {
            for (
                let websiteCount = 0;
                websiteCount <= settings.websites;
                websiteCount++
            ) {
                let website = new Website({
                    name: `User_${userCount} Website ${websiteCount}`,
                    domain: `User_${userCount} Website ${websiteCount}_domain`,
                })

                if (websiteCount !== settings.websites) {
                    let path = []
                    for (
                        let pageCount = 0;
                        pageCount < settings.pages;
                        pageCount++
                    ) {
                        let publishedVersion = {}
                        if (pageCount % 2 == 1) {
                            publishedVersion = {
                                content: {
                                    key_1: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_value_1_key_1`,
                                    key_2: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_value_2_key_2`,
                                },
                            }
                        } else {
                            publishedVersion = {
                                content: {
                                    key_1: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_value_1_key_1_old`,
                                    key_2: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_value_2_key_2_old`,
                                },
                            }
                        }
                        let page = new Page({
                            website: website,
                            content: {
                                key_1: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_value_1_key_1`,
                                key_2: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_value_2_key_2`,
                            },
                            publishedVersion: publishedVersion,
                        })
                        await page.save()

                        website.pagesStructure.push({
                            id: page._id,
                            path: path,
                            name: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_name`,
                            url: `User_${userCount}_Website_${websiteCount}_Page_${pageCount}_url`,
                            isHidden: false,
                            title: `User_${userCount} Website ${websiteCount}_Page_${pageCount}_title`,
                            description: `User_${userCount}_Website ${websiteCount}_Page_${pageCount}_description`,
                            isHomePage: pageCount === 0 ? true : false,
                            isNotPublished: pageCount % 2 == 1 ? false : true,
                            isHidden: false,
                        })
                        website = await website.save()
                        switch (parseInt(pageCount)) {
                            case 0:
                                path.push(page._id)
                                break
                            case 1:
                                path.push(page._id)
                                break
                            case 2:
                                path.push(page._id)
                                break
                            case 5:
                                path.pop()
                                break
                            case 6:
                                path.push(page._id)
                                break
                            case 8:
                                path.pop()
                                break
                            case 10:
                                path.length = 0
                                break
                        }
                        if (
                            settings.currentPage ||
                            settings.currentPage === 0
                        ) {
                            if (settings.currentPage === parseInt(pageCount)) {
                                website.currentPage = page
                            }
                        } else {
                            website.currentPage = page
                        }
                    }
                }
                website = await website.save()
                user.websites.push(website._id)
                if (settings.currentWebsite || settings.currentWebsite === 0) {
                    if (settings.currentWebsite === parseInt(websiteCount)) {
                        user.currentWebsite = website
                    }
                } else {
                    user.currentWebsite = website
                }
            }
        }
        await user.save()
        tokens.push(user.generateAuthToken())
    }
    return tokens
}

module.exports.getDBStructure = async () => {
    let users = await User.find({})
    users = await Promise.all(
        users.map(async user => {
            let websites = user.websites
            websites = await Promise.all(
                websites.map(async website => {
                    const websiteObject = await Website.findById(website)
                    const pagesStructure = websiteObject.pagesStructure
                    const pages = pagesStructure.map(page => page.id)
                    return { _id: website, pages }
                })
            )
            return { _id: user._id, websites }
        })
    )
    return users
}

module.exports.pure = a => JSON.parse(JSON.stringify(a))
