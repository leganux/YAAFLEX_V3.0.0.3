const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-instagram').Strategy;
const User = require('./../models/user.model');
const moment = require('moment');
let instaConfig = require('./../config/instagram.config');
const env =require('./../config/environment.config')

passport.use(new Strategy({
    clientID: instaConfig.instagram_api_key,
    clientSecret: instaConfig.instagram_api_secret,
    callbackURL: instaConfig.callback_url,
    enableProof: true, // For security
},
    async function (accessToken, refreshToken, profile, cb) {

        await User.findOne({ provider: profile.provider, provider_id: profile.id }, (err, data) => {
            if (err) {
                console.error('ERROR en la busqueda del usuario = ERR == ', err, profile);
                cb(null, false, { error: 'Ocurrio un error al  buscar el usuario existente para la sesion', _error: err });
                return false;
            }
            if (!data) {
               
                const user = new User({
                    username: profile.username.replace(/\s/g, '').substring(0, 10) + '_' + Buffer.from(profile.username).toString('base64').substring(0, 2) + moment().format('x').substring(10),
                    isNonUserEdited: true,
                    email: '',
                    dt_reg: moment().format(),
                    provider_id: profile.id,
                    provider: profile.provider,
                    provider_picture: profile._json.data.profile_picture,
                    active: true,
                    full_name: profile._json.data.full_name,
                    rieviewer: false
                });
                user.save((errs, datas) => {
                    if (errs) {
                        console.error('ERROR en guardar del usuario = ERR == ', errs, profile);
                        cb(null, false, { error: 'Ocurrio un error al  crear el usuario nuevo para la sesion', _error: errs });
                        return false;
                    }
                    if (!datas) {
                        console.error('ERROR en guardar del usuario = ERR2 == ', profile);
                        cb(null, false, { error: 'Ocurrio un error al  crear y regresar el usuario  para la sesion', _error: errs });
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



router.get('/', passport.authenticate('instagram', { scope: instaConfig.scope_permission }));


router.get('/callback/',
    passport.authenticate('instagram', { failureRedirect: env.root +'/loginError', failWithError: true }),
    function (req, res) {
        res.redirect(env.root +'/');
    });


module.exports = router;