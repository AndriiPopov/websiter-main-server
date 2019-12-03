const passport = require('passport')
const passportGoogle = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../models/user')
const { Website } = require('../models/website')

const passportConfig = {
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleClientSecret,
    callbackURL: 'https://my.websiter.dev/api/auth/google/redirect',
}

passport.use(
    new passportGoogle(
        passportConfig,
        async (request, accessToken, refreshToken, profile, done) => {
            console.log('google')
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
