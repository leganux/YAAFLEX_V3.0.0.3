const express = require('express');
const router = express.Router();

const BuildBasicQueries = require('../../helpers/general_query.helper')


//Model
const OBJModel = require('../../models/NOSQL/lang.model');

//Other Models

//population
const _Population = [];

const _Special = {
}

const _addData = {
}

const middlewaresSession = {
    get: true,
    post: true,
    put: true,
    delete: true,
}

BuildBasicQueries(router, OBJModel, _Population, middlewaresSession, _Special, _addData)

module.exports = router;
