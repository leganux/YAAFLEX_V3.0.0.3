const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
let fbconfig = require('./../config/facebook.config');
const User = require('./../models/user.model');
const moment = require('moment');
const env =require('./../config/environment.config')






passport.use(new Strategy({
    clientID: fbconfig.facebook_api_key,
    clientSecret: fbconfig.facebook_api_secret,
    callbackURL: fbconfig.callback_url,
    profileFields: fbconfig.request_data,
    enableProof: true, // For security
},
    function (accessToken, refreshToken, profile, cb) {

        User.findOne({ provider: profile.provider, provider_id: profile.id }, (err, data) => {
            if (err) {
                cb(null, { error: 'Ocurrio un error al  buscar el usuario existente para la sesion', _error: err });
                return false;
            }
            if (!data) {
                const user = new User({

                    username: profile.displayName.replace(/\s/g, '').substring(0, 10) + '_' + Buffer.from(profile.displayName).toString('base64').substring(0, 2) + moment().format('x').substring(10),
                    email: profile.emails[0].value,
                    dt_reg: moment().format(),
                    provider_id: profile.id,
                    provider: profile.provider,
                    user_picture: profile.photos[0].value,
                    active: true,
                    full_name: profile.displayName,

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


router.get('/', passport.authenticate('facebook', { scope: fbconfig.scope_permission }));


router.get('/callback/', passport.authenticate('facebook', { failureRedirect: env.root + '/loginError', failWithError: true }),
    function (req, res) {
        res.redirect(env.root + '/');
    });


module.exports = router;