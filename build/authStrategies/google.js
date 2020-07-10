"use strict";

const passport = require('passport');

const passportGoogle = require('passport-google-oauth').OAuth2Strategy;

const {
  User
} = require('../models/user');

const {
  Website
} = require('../models/website');

const passportConfig = {
  clientID: process.env.GoogleClientID,
  clientSecret: process.env.GoogleClientSecret,
  callbackURL: process.env.NODE_ENV === 'production' ? 'http://my.websiter.dev/api/auth/google/redirect' : 'http://my.websiter.test:5000/api/auth/google/redirect'
};
passport.use(new passportGoogle(passportConfig, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({
      userid: profile.id,
      platformId: 'google'
    });

    if (!user) {
      user = new User({
        userid: profile.id,
        platformId: 'google',
        logoutAllDate: new Date().getTime() - 10 * 60 * 1000,
        accountInfo: {
          displayName: profile.displayName,
          emails: profile.emails,
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