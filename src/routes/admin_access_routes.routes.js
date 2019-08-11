const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
var env = require('./../config/environment.config')
const saltRounds = env.bcrypt_salt_rounds;
const moment = require('moment');
const bcrypt = require('bcryptjs');


//Model
const OBJModel = require('./../models/routes_access_admin.model');

//Other Models

const rolesAdmin = require('./../models/admin_roles.model');
//population
const _Population = [{
    path: 'roles',
    model: rolesAdmin
}];

const _Special = {
    post: [],
    put: []
}

const _addData = {
    post: [],
    put: []
}

BuildBasicQueries(router, OBJModel, _Population, CheckSession, false, false)

module.exports = router;
