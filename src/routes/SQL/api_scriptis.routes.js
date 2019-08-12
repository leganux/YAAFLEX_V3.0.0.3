const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession')
var env = require('../../config/environment.config')
const BuildBasicSQLQueries = require('../../helpers/general_sql_query.helper')


//Definimos el modelo
const Model = require('./../../models/SQL/api_scripts.model');

//llamamos al constructor de CRUD
BuildBasicSQLQueries(router, Model, CheckSession)

module.exports = router;