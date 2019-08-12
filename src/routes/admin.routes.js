const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
var env = require('./../config/environment.config')
const saltRounds = env.bcrypt_salt_rounds;
const moment = require('moment');
const bcrypt = require('bcryptjs');


//Model
const OBJModel = require('./../models/NOSQL/admin');

//Other Models

const AdminRoles = require('./../models/NOSQL/admin_roles.model');

//population
const _Population = [
    {
        path: 'role',
        model: AdminRoles,
        //select:{}
    }
];

// Special

const _Special = {
    post: [{
        path: 'dt_reg',
        special: true,
        type: 'date'
    }, {
        path: 'password',
        special: true,
        type: 'pass'
    }],
    put: [{
        path: 'password',
        special: true,
        type: 'pass'

    }]
}

const _addData = {
    post: [{
        path: 'dt_reg',
        value: moment().format()
    }],
    put: []
}

BuildBasicQueries(router, OBJModel, _Population, CheckSession, _Special, _addData)

module.exports = router;