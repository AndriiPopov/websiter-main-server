"use strict";

const passport = require('passport');

const TwitterStrategy = require('passport-twitter').Strategy;

const {
  User
} = require('../models/user');

const {
  Website
} = require('../models/website');

const passportConfig = {
  consumerKey: process.env.TwitterClientID,
  consumerSecret: process.env.TwitterClientSecret,
  callbackURL: 'https://api.websiter.dev/api/auth/twitter/redirect'
};
passport.use(new TwitterStrategy(passportConfig, async (request, accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({
      userid: profile.id,
      platformId: 'twitter'
    });

    if (!user) {
      user = new User({
        userid: profile.id,
        platformId: 'twitter',
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