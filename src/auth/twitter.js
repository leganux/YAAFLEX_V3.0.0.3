const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
let twConfig = require('./../config/twitter.config');
const User = require('./../models/user.model');
const moment = require('moment');
const env =require('./../config/environment.config')


passport.use(new Strategy({
    consumerKey: twConfig.twitter_api_key,
    consumerSecret: twConfig.twitter_api_secret,
    callbackURL: twConfig.callback_url,
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    includeEmail: true,
    passReqToCallback: true
},
    function (req, token, tokenSecret, profile, cb) {
        User.findOne({ provider: profile.provider, provider_id: profile.id }, (err, data) => {
            if (err) {
                cb(null, { error: 'Ocurrio un error al  buscar el usuario existente para la sesion', _error: err });
                return false;
            }
            if (!data) {
                const user = new User({
                    username: profile.username.replace(/\s/g, '').substring(0, 10) + '_' + Buffer.from(profile.username).toString('base64').substring(0, 2) + moment().format('x').substring(10),
                    isNonUserEdited: true,
                    email: profile.emails[0].value,
                    dt_reg: moment().format(),
                    provider_id: profile.id,
                    provider: profile.provider,
                    provider_picture: profile.photos[0].value,
                    active: true,
                    full_name: profile.displayName,
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
                        cb(null, { provider: { token, tokenSecret }, session: datas, prop: { isAdmin: false, active: datas.active, reviewer: datas.reviewer } });
                    }
                });
            } else {
                cb(null, { provider: { token, tokenSecret }, session: data, prop: { isAdmin: false, active: data.active, reviewer: data.reviewer } });
            }
        });

    }));


router.get('/', passport.authenticate('twitter'));


router.get('/callback/',
    passport.authenticate('twitter', { failureRedirect: env.root + '/loginError', failWithError: true }),
    function (req, res) {
        res.redirect(env.root + '/');
    });


module.exports = router;