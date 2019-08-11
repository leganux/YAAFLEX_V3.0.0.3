const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const env =require('./../config/environment.config')


passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
},
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) {
                    return done(null, false);
                }
                if (!res) {
                    return done(null, false);
                }
                user.isAdmin = false;
                done(null, { session: user, prop: { isAdmin: false } });
            });
        });
    }
));


router.post('/', passport.authenticate('local', { failureRedirect: env.root +'/', failWithError: true }),
    function (req, res) {
        res.redirect(env.root +'/');
    });


module.exports = router;