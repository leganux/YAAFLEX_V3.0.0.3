const express = require('express');
const router = express.Router();
const BuildBasicQueries = require('../../helpers/general_query.helper')
const moment = require('moment');


//Model
const OBJModel = require('../../models/NOSQL/routes_access_user.model');

//Other Models

const rolesUser = require('../../models/NOSQL/user_roles.model');
//population
const _Population = [{
    path: 'roles',
    model: rolesUser
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
