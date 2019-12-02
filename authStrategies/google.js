const passport = require('passport')
const passportGoogle = require('passport-google-oauth').OAuth2Strategy
const config = require('config')
const { User } = require('../models/user')
const { Website } = require('../models/website')

const passportConfig = {
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleClientSecret,
    callbackURL: 'http://localhost:5000/api/auth/google/redirect',
}

passport.use(
    new passportGoogle(
        passportConfig,
        async (request, accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({
                userid: profile.id,
                platformId: 'google',
            })

            if (!user) {
                user = new User({
                    currentAction: 0,
                    images: [],
                    storage: 0,
                    loadedWebsite: '',
                    userid: profile.id,
                    platformId: 'google',
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
