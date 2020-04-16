"use strict";

const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;

const {
  User
} = require('../models/user');

const {
  Website
} = require('../models/website');

const passportConfig = {
  clientID: process.env.FBClientID,
  clientSecret: process.env.FBClientSecret,
  callbackURL: 'https://api.websiter.dev/api/auth/facebook/redirect'
};
passport.use(new FacebookStrategy(passportConfig, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({
      userid: profile.id,
      platformId: 'facebook'
    });

    if (!user) {
      user = new User({
        userid: profile.id,
        platformId: 'facebook',
        logoutAllDate: new Date().getTime() - 10 * 60 * 1000,
        accountInfo: {
          displayName: profile.displayName,
          emails: propfile.emails,
          photos: profile.photos
        }
      });
      user.markModified('accountInfo');
      const website = await user.createWebsite(user);
      user.websites.push({
        id: website._id.toString()
      });
      await user.save();
    }

    return done(null, user);
  } catch {
    console.log('Create user failed.');
  }
}));