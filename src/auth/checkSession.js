var originRedirect = '/';
const AdminAccess = require('./../models/routes_access_admin.model');
const UserAccess = require('./../models/routes_access_user.model');

const UserRoles = require('./../models/user_roles.model');
const AdminRoles = require('./../models/admin_roles.model')
const env = require('./../config/environment.config')


var ERR403 = function (req, res, next) {
    if (req.method == "GET") {
        return res.status(403).render('errors/err403');
    } else {
        return res.status(403).json({
            message: '403 Forbidden',
            error: err,
            success: false
        });
    }
}
var ERR500 = function (req, res, next) {
    if (req.method == "GET") {
        return res.status(500).render('errors/err500');
    } else {
        return res.status(500).json({
            message: '500 Internal Server error',
            error: err,
            success: false
        });
    }
}
var ERR404 = function (req, res, next) {
    if (req.method == "GET") {
        return res.status(404).render('errors/err404');
    } else {
        return res.status(404).json({
            message: '404 Not Found',

            success: false
        });
    }
}

var backToHome = function (req, res, next) {
    var reqURL = req.originalUrl;
    if (req.method == "GET" && (!reqURL.includes('?'))) {
        return res.status(403).render('errors/err403');
    } else {
        return res.status(403).json({
            message: '403 Forbidden',

            success: false
        });
    }
}

async function loggedIn(req, res, next) {
    //next(); return 0;   // uncomment this line to allow access all urls
    var type = 'user';
    var role = env.default_no_loged_user_role_id;
    var reqURL = req.originalUrl;
    var myMethod = req.method;
    myMethod = myMethod.toUpperCase()


    if (reqURL == env.root + '/' || req == env.root + '/lx_admin' || req == env.root + '/logout') {

        next();
        return true;
    }
    if (!req.user) {
        type = 'user';
        role = env.default_no_loged_user_role_id;
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
        console.log('A');
        return ERR403(req, res, next);
    }

    t = query.exec();

    t.then(roles => {

        if (!roles || roles.length == 0) {
            return ERR404(req, res, next);
        }


        for (var i = 0; i < roles.length; i++) {
            var item = roles[i];


            for (var j = 0; j < item.roles.length; j++) {
                var jtem = item.roles[j];
                if (jtem._id.toString() == role) {

                    var metodsLS = item.method.split(',');

                    if (metodsLS.includes(myMethod)) {

                        if (env.root + item.path.includes(':') && (myMethod == 'GET' || myMethod == 'PUT' || myMethod == 'DELETE')) {

                            if (reqURL.toLowerCase().trim().includes(env.root + item.path.split(':')[0].toLowerCase().trim())) {

                                next();
                                return 1;
                            }
                        } else if (reqURL.includes('?') && myMethod == 'GET') {

                            if (reqURL.split('?')[0].toLowerCase().trim() == env.root + item.path.toLowerCase().trim()) {

                                next();
                                return 1;
                            }
                        } else {

                            if (env.root + item.path.toLowerCase().trim() == reqURL.toLowerCase().trim()) {

                                next();
                                return 1;
                            }
                        }
                    }

                }
            }

        }


        return backToHome(req, res, next);

    }).catch(err => {
        if (err) {
            console.error(err);
            return ERR500(req, res, next);
        }
    })

}

module.exports = loggedIn;
