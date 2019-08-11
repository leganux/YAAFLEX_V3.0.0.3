const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
const moment = require('moment')


//Model
const OBJModel = require('./../models/articles.model');

//Other Models
const User = require('./../models/user.model')
//population
const _Population = [{
    path: 'autor',
    model: User,
}];

const _Special = {
    post: [{
        path: 'dt_reg',
        value: moment().format()
    }],
    put: [{
        path: 'dt_update',
        value: moment().format()
    }]
}

const _addData = {
    post: [{
        path: 'dt_reg',
        value: moment().format()
    }],
    put: [{
        path: 'dt_update',
        value: moment().format()
    }]
}

BuildBasicQueries(router, OBJModel, _Population, CheckSession, _Special, _addData)

module.exports = router;
