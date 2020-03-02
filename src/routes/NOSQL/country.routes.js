const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession')
const BuildBasicQueries = require('../../helpers/general_query.helper')


//Model
const OBJModel = require('../../models/NOSQL/countries.model');

//Other Models

//population
const _Population = [];

const _Special = {}

const _addData = {}

const middlewaresSession = {
    get: true,
    post: true,
    put: true,
    delete: true,
}

BuildBasicQueries(router, OBJModel, _Population, middlewaresSession, _Special, _addData)

router.post('/datatable', CheckSession, async (req, res) => {

    var order = {};

    if (req.body.columns && req.body.order) {
        req.body.order.map((item, i) => {

            var name = req.body.columns[item.column].data;
            var dir = item.dir;

            order[name] = dir;

        })
    }

    OBJModel.dataTables({
        limit: req.body.length,
        skip: req.body.start,
        search: {
            value: req.body.search.value,
            fields: ['name', 'sortname']
        },
        sort: order
    }).then(function (table) {
        table.success = true;
        table.message = 'OK';
        table.recordsTotal = table.total
        table.recordsFiltered = table.total
        res.status(200).json(table); // table.total, table.data
    })
});


module.exports = router;
