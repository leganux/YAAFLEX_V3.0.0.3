const express = require('express');
const router = express.Router();
const BuildBasicQueries = require('../../helpers/general_query.helper')
const moment = require('moment');


//Model
const OBJModel = require('../../models/NOSQL/user.model');

//Other Models

const UserRoles = require('../../models/NOSQL/user_roles.model');

//population
const _Population = [
    {
        path: 'role',
        model: UserRoles,
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

const middlewaresSession = {
    get: true,
    post: true,
    put: true,
    delete: true,
}
BuildBasicQueries(router, OBJModel, _Population, middlewaresSession, _Special, _addData)

module.exports = router;