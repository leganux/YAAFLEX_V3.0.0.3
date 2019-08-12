const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession')
var env = require('../../config/environment.config')
const BuildBasicSQLQueries = require('../../helpers/general_sql_query.helper')


//Definimos el modelo
const Model = require('./../../models/SQL/api_scripts.model');

router.get('/:name', async (req, res) => {
    var NAME = req.params.name;
    var query = req.query

    Model.findOne({
        where: {
            route_name: NAME,
            method: 'GET'
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({
                message: "Method not Allowed",

                success: false
            })
        }

        var myfunction = eval(data.code);
        var response = myfunction(query);

        res.status(200).json({
            message: 'OK',
            data: data,
            query: query,
            result: response,
            success: true
        })
    }).catch((err) => {
        console.error(err)
        res.status(500).json({
            message: '500 Internal Server Error',
            errror: err,
            success: false
        })
    });
});

router.post('/:name', async (req, res) => {
    var NAME = req.params.name;
    var query = req.body

    Model.findOne({
        where: {
            route_name: NAME,
            method: 'POST'
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({
                message: "Method not Allowed",

                success: false
            })
        }

        var myfunction = eval('(' + data.code + ')');
        var response = myfunction(query);

        res.status(200).json({
            message: 'OK',
            data: data,
            body: query,
            result: response,
            success: true
        })
    }).catch((err) => {
        console.error(err)
        res.status(500).json({
            message: '500 Internal Server Error',
            errror: err,
            success: false
        })
    });
});

module.exports = router;