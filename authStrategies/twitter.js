const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const { User } = require('../models/user')
const { Website } = require('../models/website')

const passportConfig = {
    consumerKey: process.env.TwitterClientID,
    consumerSecret: process.env.TwitterClientSecret,
    callbackURL: 'https://api.websiter.dev/api/auth/twitter/redirect',
}

passport.use(
    new TwitterStrategy(
        passportConfig,
        async (request, accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({
                userid: profile.id,
                platformId: 'twitter',
            })
            if (!user) {
                user = new User({
                    currentAction: 0,
                    images: [],
                    storage: 0,
                    loadedWebsite: '',
                    userid: profile.id,
                    platformId: 'twitter',
                    logoutAllDate: Date.now(),
                })
                const website = await user.createWebsite(user)
                user.websites.push(website._id)
                await user.save()
            }
            return done(null, user)
        }
    )
)
