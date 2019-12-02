const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('config')
const { User } = require('../models/user')
const { Website } = require('../models/website')

const passportConfig = {
    clientID: process.env.FBClientID,
    clientSecret: process.env.FBClientSecret,
    callbackURL: 'http://localhost:5000/api/auth/facebook/redirect',
}

passport.use(
    new FacebookStrategy(
        passportConfig,
        async (request, accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({
                userid: profile.id,
                platformId: 'facebook',
            })
            if (!user) {
                user = new User({
                    currentAction: 0,
                    images: [],
                    storage: 0,
                    loadedWebsite: '',
                    userid: profile.id,
                    platformId: 'facebook',
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
