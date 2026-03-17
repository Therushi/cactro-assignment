require("dotenv").config();
const { ExtractJwt, Strategy } = require("passport-jwt");
const passport = require("passport");
const UserModel = require("../models/user.model");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECREAT,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = UserModel.findById(payload.id);
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);
