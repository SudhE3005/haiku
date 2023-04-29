const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');
const { jwtSecret } = require('./constants');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

passport.use(new Strategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
