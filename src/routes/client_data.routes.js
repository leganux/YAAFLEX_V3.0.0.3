const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
const moment = require('moment')


//Model
const OBJModel = require('./../models/client_data.model');

//Other Models

//population
const _Population = false;

const _Special = {
    post: [{
        path: 'dt_reg',
        value: moment().format()
    }],

}

const _addData = {
    post: [{
        path: 'dt_reg',
        value: moment().format()
    }],

}

BuildBasicQueries(router, OBJModel, _Population, CheckSession, _Special, _addData)

module.exports = router;