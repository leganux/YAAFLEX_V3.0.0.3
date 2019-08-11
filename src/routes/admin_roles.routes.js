const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
var env = require('./../config/environment.config')
const saltRounds = env.bcrypt_salt_rounds;
const moment = require('moment');
const bcrypt = require('bcryptjs');


//Model
const OBJModel = require('./../models/admin_roles.model');

//Other Models

//population
const _Population = [];

const _Special = {
    post: [{
        path: 'dt_reg',
        special: true,
        type: 'date'
    }],
    put: []
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
