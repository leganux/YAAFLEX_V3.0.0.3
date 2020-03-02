var originRedirect = '/';
const AdminAccess = require('./../models/NOSQL/routes_access_admin.model');
const UserAccess = require('./../models/NOSQL/routes_access_user.model');
const UserRoles = require('./../models/NOSQL/user_roles.model');
const AdminRoles = require('./../models/NOSQL/admin_roles.model')
const env = require('./../config/environment.config')
const global = require('./../config/global.config')
const bcrypt = require('bcryptjs');
const User = require('../models/NOSQL/user.model');
const util = require('util');

var jwt = require('jsonwebtoken');


var updateSession = async function (req, res) {
    if (req && req.user && req.user.session && req.user.session._id) {
        var datas = await User.findById(req.user.session._id);
        var user_ = {
            provider: {kind: datas.provider, id: datas.provider_id},
            session: datas,
            prop: {
                isAdmin: false, active: datas.active, active_d: datas.active_d, reviewer: datas.reviewer
            }
        };
        req.login(user_, function (error) {
            if (!error) {
                console.log('Succcessfully updated user ** ');
            }

        });
    }
    return true;
}

var setSessionBearer = async function (req, res, token) {

    var errors = '';

    try {
        let decoded = await jwt.verify(token, global.JWT_Secret);
        if (!decoded) {
            req.logIn(false, function (erroe) {
                if (!erroe) {
                    console.log('Succcessfully updated user ** ');
                }
            });
            errors = errors + 'Cannot decode token'
        }
        decoded.isFromAPI = true;
        req.logIn(decoded, function (erroe) {
            if (!erroe) {
                console.log('Succcessfully updated user ** ');
            }
        });

    } catch (err) {

        errors = errors + ' ' + err

    }

    return errors;
};

var setSessionBasic = async function (req, res, token) {

    let errors = '';

    let buff = Buffer.from(token, 'base64');
    let decodeToken = buff.toString('ascii')

    let arrtoken = decodeToken.split(':');
    if (arrtoken.length < 2 || arrtoken.length > 2) {
        errors = errors + 'Malformed token'
    }

    var username = arrtoken[0];
    var password = arrtoken[1];

    try {

        let user = await User.findOne({username: username});

        if (!user) {
            errors = errors + 'User not found'
            req.logIn(false, function (erroe) {
                if (!erroe) {

                }
            });

        }

        let rsp = await bcrypt.compare(password, user.password);

        if (!rsp) {
            errors = errors + 'Incorrect password'
            req.logIn(false, function (erroe) {
                if (!erroe) {

                }

            })


        }

        user.isAdmin = false;
        var tokenData = {
            session: user,
            prop: {
                isAdmin: false,
                kind: 'user',
                role: user.role
            },
            isFromAPI: true
        };


        req.logIn(tokenData, function (erroe) {
            if (!erroe) {
                console.log('Succcessfully updated user ** ');
            }

        })

    } catch (err) {

        errors = errors + ' ' + err
        req.logIn(false, function (erroe) {
            if (!erroe) {
                console.log('Succcessfully updated user ** ');
            }

        });

    }

    return errors;
};


async function loggedIn(req, res, next) {
    //next(); return 0;   // uncomment this line to allow access all urls


    if (req.user && req.user.isFromAPI) {
        req.logIn(false, function (erroe) {
            if (!erroe) {
            }
        });
    }

    // verifica los headders de autorizacion
    if (req.headers.authorization) {
        req.logIn(false, function (erroe) {
            if (!erroe) {
            }
        });

        var authToken = req.headers.authorization;
        if (authToken.includes('Bearer')) {
            authToken = authToken.replace('Bearer ', '');
            let rss = await setSessionBearer(req, res, authToken)
            if (rss != '') {
                res.status(403).json({
                    message: '403 forbidden',
                    error: rss,
                    success: false
                });
                return false;
            }
        }
        else if (authToken.includes('Basic')) {
            authToken = authToken.replace('Basic ', '');
            let rss = await  setSessionBasic(req, res, authToken)
            if (rss != '') {
                res.status(403).json({
                    message: '403 forbidden',
                    error: rss,
                    success: false
                });
                return false;
            }
        } else {

            let rss = await setSessionBearer(req, res, authToken)
            if (rss != '') {
                res.status(403).json({
                    message: '403 forbidden',
                    error: rss,
                    success: false
                });
                return false;
            }
        }
    }


    var type = 'user';
    var role = env.default_no_loged_user_role_id;
    var reqURL = req.originalUrl;
    var myMethod = req.method;
    myMethod = myMethod.toUpperCase()


    if (!req.user || (Object.keys(req.user).length === 0 && req.user.constructor === Object)) {
        if (req.method === "GET" && (!reqURL.includes('?'))) {
            res.status(403).render('errors/err403');
        } else {
            res.status(403).json({
                message: '403 Forbidden',
                success: false
            });
        }
        return 0;
    } else {
        type = req.user.prop.kind;
        role = req.user.prop.role;
    }

    var query = {}
    if (type == 'admin') {
        query = AdminAccess.find().populate({
            path: 'roles',
            model: AdminRoles
        });
    } else if (type == 'user') {
        query = UserAccess.find().populate({
            path: 'roles',
            model: UserRoles
        });
    } else {
        if (req.method === "GET" && (!reqURL.includes('?'))) {
            res.status(403).render('errors/err403');
        } else {
            res.status(403).json({
                message: '403 Forbidden',
                success: false
            });
        }
        return 0;
    }

    try {
        let roles = await query.exec();

        if (!roles || roles.length == 0) {

            if (req.method === "GET" && (!reqURL.includes('?'))) {
                res.status(404).render('errors/err404');
            } else {
                res.status(403).json({
                    message: '404 cannot detect route',
                    success: false
                });
            }
            return 0;
        }

        for (var i = 0; i < roles.length; i++) {
            var item = roles[i];

            for (var j = 0; j < item.roles.length; j++) {
                var jtem = item.roles[j];

                if (jtem._id.toString() == role) {
                    var metodsLS = item.method.split(',');
                    if (metodsLS.includes(myMethod)) {
                        if (env.root + item.path.includes(':') && (myMethod === 'GET' || myMethod === 'PUT' || myMethod === 'DELETE')) {
                            if (reqURL.toLowerCase().trim().includes(env.root + item.path.split(':')[0].toLowerCase().trim())) {
                                next();
                                return 1;
                            }
                        } else if (reqURL.includes('?') && myMethod === 'GET') {

                            if (reqURL.split('?')[0].toLowerCase().trim() === env.root + item.path.toLowerCase().trim()) {

                                next();
                                return 1;
                            }
                        }
                        else if (myMethod === 'GET' || myMethod === 'POST') {

                            if (reqURL.toLowerCase().trim() === env.root + item.path.toLowerCase().trim()) {

                                next();
                                return 1;
                            }
                        }
                    }

                }
            }

        }


    } catch (err) {
        if (err) {
            console.error(err);

            if (req.method === "GET" && (!reqURL.includes('?'))) {
                res.status(500).render('errors/err500');
            } else {
                res.status(500).json({
                    message: '500 Internal server error',
                    error: err,
                    success: false
                });
            }
            return 0;
        }
    }

    if (req.method === "GET" && (!reqURL.includes('?'))) {
        res.status(403).render('errors/err403');
    } else {
        res.status(403).json({
            message: '403 Forbidden',
            success: false
        });
    }

}


module.exports = loggedIn;
