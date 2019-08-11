const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const env = require('./../config/environment.config');



passport.use('admin-login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
},
    function (username, password, done) {
        Admin.findOne({ username: username }, function (err, admin) {
            if (err) { return done(err); }
            if (!admin) { return done(null, false); }
            bcrypt.compare(password, admin.password, function (err, res) {
                if (err) {
                    return done(null, false);
                }
                if (!res) {
                    return done(null, false);
                }
                admin.isAdmin = true;
                done(null, {
                    session: admin,
                    prop: {
                        kind: 'admin',
                        role: admin.role
                    }
                });
            });
        });
    }
));


router.post('/', passport.authenticate('admin-login', { failureRedirect: env.root + '/lx_admin', failWithError: true }),
    function (req, res) {

        res.redirect(env.root + '/lx_admin/dashboard');
    });




module.exports = router;