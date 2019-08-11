const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')


//Model
const OBJModel = require('./../models/lang.model');

//Other Models

//population
const _Population = [];

const _Special = {
}

const _addData = {
}

BuildBasicQueries(router, OBJModel, _Population, CheckSession, _Special, _addData)

module.exports = router;
