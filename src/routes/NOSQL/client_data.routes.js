const express = require('express');
const router = express.Router();

const BuildBasicQueries = require('../../helpers/general_query.helper')
const moment = require('moment')


//Model
const OBJModel = require('../../models/NOSQL/client_data.model');

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

const middlewaresSession = {
    get: false,
    post: false,
    put: true,
    delete: true,
}

BuildBasicQueries(router, OBJModel, _Population, middlewaresSession, _Special, _addData)

module.exports = router;