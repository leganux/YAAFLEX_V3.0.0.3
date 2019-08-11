const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-google-oauth').OAuth2Strategy;
let gooConfig = require('./../config/google.config');
const User = require('./../models/user.model');
const moment = require('moment');
const env =require('./../config/environment.config')


passport.use(new Strategy({
    clientID: gooConfig.google_api_key,
    clientSecret: gooConfig.google_api_secret,
    callbackURL: gooConfig.callback_url,
    profileFields: gooConfig.request_data,
    enableProof: true, // For security
    // passReqToCallback: true // Pass request from route
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ provider: profile.provider, provider_id: profile.id }, (err, data) => {
            if (err) {
                cb(null, { error: 'Ocurrio un error al  buscar el usuario existente para la sesion', _error: err });
                return false;
            }
            if (!data) {
                const user = new User({
                    isNonUserEdited: true,
                    username: profile.displayName.replace(/\s/g, '').substring(0, 10) + '_' + Buffer.from(profile.displayName).toString('base64').substring(0, 2) + moment().format('x').substring(10),
                    email: profile._json.emails[0].value,
                    dt_reg: moment().format(),
                    provider_id: profile.id,
                    provider: profile.provider,
                    provider_picture: profile._json.image.url,
                    active: true,
                    full_name: profile._json.displayName,
                    rieviewer: false
                });
                user.save((errs, datas) => {
                    if (errs) {
                        cb(null, { error: 'Ocurrio un error al  crear el usuario nuevo para la sesion', _error: errs });
                        return false;
                    }
                    if (!datas) {
                        cb(null, { error: 'Ocurrio un error al  crear y regresar el usuario  para la sesion', _error: errs });
                        return false;
                    } else {
                        cb(null, { provider: { accessToken, refreshToken }, session: datas, prop: { isAdmin: false, active: datas.active, reviewer: datas.reviewer } });
                    }
                });
            } else {
                cb(null, { provider: { accessToken, refreshToken }, session: data, prop: { isAdmin: false, active: data.active, reviewer: data.reviewer } });
            }
        });
    }));


router.get('/', passport.authenticate('google', { scope: gooConfig.scope_permission }));


router.get('/callback/',
    passport.authenticate('google', { failureRedirect: env.root + '/loginError', failWithError: true }),
    function (req, res) {
        res.redirect(env.root + '/');
    });


module.exports = router;