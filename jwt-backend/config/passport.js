require('dotenv').config();
const User = require("../models/user.model");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');   

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = (passport)=>{

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) =>{
      try {
        const user = await User.findOne({_id: jwt_payload.id});
     if (user) return done(null, user);
        return done(null, false);
      } catch (error) {
        return done(err, false);
      }
}));
};
