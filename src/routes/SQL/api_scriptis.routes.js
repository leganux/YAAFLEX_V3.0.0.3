const express = require('express');
const router = express.Router();

const BuildBasicSQLQueries = require('../../helpers/general_sql_query.helper')


//Definimos el modelo
const Model = require('./../../models/SQL/api_scripts.model');

const middlewaresSession = {
    get: true,
    post: true,
    put: true,
    delete: true,
}

//llamamos al constructor de CRUD
BuildBasicSQLQueries(router, Model, middlewaresSession)

module.exports = router;