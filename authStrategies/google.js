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
            console.log('user')
            console.log(user)

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
                console.log('user2')
                console.log(user)
                const website = await user.createWebsite(user)
                console.log('website')
                console.log(website)
                user.websites.push(website._id)
                await user.save()
                console.log(user)
            }
            return done(null, user)
        }
    )
)
