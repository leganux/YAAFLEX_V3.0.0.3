const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession')
const BuildBasicQueries = require('../../helpers/general_query.helper')

const moment = require('moment');


//Model
const OBJModel = require('../../models/NOSQL/routes_access_admin.model');

//Other Models

const rolesAdmin = require('../../models/NOSQL/admin_roles.model');
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

const middlewaresSession = {
    get: true,
    post: true,
    put: true,
    delete: true,
}

BuildBasicQueries(router, OBJModel, _Population, middlewaresSession, false, false)

module.exports = router;
