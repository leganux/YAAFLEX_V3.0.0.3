const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

const Admin = require('../models/NOSQL/admin');
const User = require('../models/NOSQL/user.model');
const bcrypt = require('bcryptjs');
const env = require('./../config/environment.config')
const global = require('./../config/global.config')


router.post('/getAdminToken', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    Admin.findOne({username: username}, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!user) {
            return res.status(404).json({
                message: '404 Object not found',
                success: false
            });
        }

        bcrypt.compare(password, user.password, function (err, rsp) {
            if (err) {
                if (err) {
                    return res.status(500).json({
                        message: '500 Internal Server Error',
                        error: err,
                        success: false
                    })
                }
            }
            if (!rsp) {
                return res.status(404).json({
                    message: '404 Object not found',
                    success: false
                })

            }
            user.isAdmin = true;
            var tokenData = {
                session: user,
                prop: {
                    kind: 'admin',
                    role: user.role
                }
            };


            var token = jwt.sign(tokenData, global.JWT_Secret, {expiresIn: '1h'});

            return res.status(200).json({
                message: 'OK',
                token,
                success: true
            });


        });


    });


});

router.post('/getUserToken', (req, res) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({username: username}, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!user) {
            return res.status(404).json({
                message: '404 Object not found',
                success: false
            });
        }

        bcrypt.compare(password, user.password, function (err, rsp) {
            if (err) {
                if (err) {
                    return res.status(500).json({
                        message: '500 Internal Server Error',
                        error: err,
                        success: false
                    })
                }
            }
            if (!rsp) {
                return res.status(404).json({
                    message: '404 Object not found',
                    success: false
                })

            }
            user.isAdmin = false;
            var tokenData = {
                session: user,
                prop: {
                    isAdmin: false,
                }
            };


            var token = jwt.sign(tokenData, global.JWT_Secret, {expiresIn: '1h'});

            return res.status(200).json({
                message: 'OK',
                token,
                success: true
            });


        });


    });


});

router.get('/verify', (req, res) => {
    var authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(404).json({
            message: '404 Token not set in authorization token',
            success: false
        });
    }

    jwt.verify(authToken, global.JWT_Secret, function (err, decoded) {
        if (err) {
            return res.status(500).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!decoded) {
            return res.status(404).json({
                message: '404 Object not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'OK',
            decoded,
            success: true
        });

    });


});

module.exports = router;