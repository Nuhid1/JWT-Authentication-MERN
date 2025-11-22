const express = require('express');
const passport = require('passport');
const { registerRoute, loginRoute, getProfile } = require('../userController/user.controller');

const route = express.Router();

route.post('/register', registerRoute);

route.post('/login', loginRoute);

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid or missing token"
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};

route.get("/profile", jwtAuth, getProfile);

module.exports = route;