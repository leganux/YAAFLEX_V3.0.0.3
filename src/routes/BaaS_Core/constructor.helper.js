const ModelTables = require('./../../models/SQL/baas_tables.model');
const ModelField = require('./../../models/SQL/baas_fields.model');
let listOfSchemas = {};
let listOfModels = {};
let listOfPopulations = {};
let listOfModelNames = {};

const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession');

var moment = require('moment')





const mongoose = require('mongoose');
const {Schema} = mongoose;
var dataTables = require('mongoose-datatables')


var makeItRealDB = function () { // this function constructs all the DB models

    listOfSchemas = {};
    listOfModels = {};
    listOfPopulations = {};


    ModelTables.findAll().then(data => {
            data.map((item, i) => {

                //delete mongoose.connection.models

                listOfSchemas[item.name] = {};
                listOfModels[item.name] = {};
                listOfPopulations[item.name] = {};
                listOfModelNames[item.name] = item.name + '_' + moment().format('x');

                ModelField.findAll({where: {id_table: item.id}}).then(datas => {
                    var innerEl = {};
                    var innerElPopulated = [];

                    datas.map((jtem, j) => {

                        switch (jtem.type) {
                            case 'String' :
                                innerEl[jtem.name] = {type: String};
                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'Number' :
                                innerEl[jtem.name] = {type: Number};
                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'Date' :
                                innerEl[jtem.name] = {type: Date};
                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'Boolean' :
                                innerEl[jtem.name] = {type: Boolean};
                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'Mixed' :
                                innerEl[jtem.name] = {type: Mixed};
                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'Array' :
                                innerEl[jtem.name] = {type: Array};
                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'SchemaSingle' :
                                var nReal = listOfModelNames[r_model];
                                innerEl[jtem.name] = {type: Schema.Types.ObjectId, ref: listOfModels[nReal]};
                                innerElPopulated = {path: jtem.name, model: listOfModels[nReal]}

                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                break;
                            case 'SchemaArray' :

                                var nReal = listOfModelNames[r_model];
                                var ineriner = {type: Schema.Types.ObjectId, ref: listOfModels[nReal]};
                                innerElPopulated = {path: jtem.name, model: listOfModels[nReal]}

                                if (jtem.property && jtem.property != '{}') {
                                    try {
                                        var ElJson = JSON.parse(jtem.property)
                                        for (const [key, val] of Object.entries(ElJson)) {
                                            innerEl[key] = val;
                                        }
                                    } catch (err) {

                                    }
                                }
                                innerEl[jtem.name] = [ineriner];
                                break;
                        }


                    });


                    listOfSchemas[item.name] = new Schema(innerEl);
                    listOfSchemas[item.name].plugin(dataTables)

                    var nameOF_ = listOfModelNames[item.name];

                    listOfModels[nameOF_] = mongoose.model(nameOF_, listOfSchemas[item.name], 'api_baas_' + item.name);

                    listOfPopulations[item.name] = innerElPopulated;


                    /*const obj = new listOfModels['alumnado']({nombre: 'erick'});
                     obj.save((err, data) => {
                     })*/

                }).catch((err) => {
                    console.error(err)

                });


            });

        }
    ).catch((err) => {
        console.error(err);
    });


};


//
var _Population = [];

var _Special = {}
var _addData = {}


// get firts element
router.get('/:name/first/', CheckSession, async (req, res) => {
    var nombreModelo = req.params.name;


    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }
    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];

    const {sort, search, paginate, strictsearch, avoid, like} = req.query;
    let order = {};
    let busqueda = {};
    let andS = []

    if (search) {
        for (const [key, val] of Object.entries(search)) {
            if (val.toString() === 'true') {
                busqueda[key] = true;
            } else if (val.toString() === 'false') {
                busqueda[key] = false;
            }
            else {
                busqueda[key] = new RegExp(val, "i");
            }
        }
    }
    if (strictsearch) {
        for (const [key, val] of Object.entries(strictsearch)) {
            busqueda[key] = val;
        }
    }
    if (avoid) {
        for (const [key, val] of Object.entries(avoid)) {
            if (val.toString() === 'true') {
                busqueda[key] = {"$ne": true};
            } else if (val.toString() === 'false') {
                busqueda[key] = {"$ne": false};
            }
            else {
                busqueda[key] = {"$ne": val};
            }
        }
    }
    if (like) {
        for (const [key, val] of Object.entries(like)) {
            var inner = [];
            for (var i = 0; i < val.length; i++) {
                var sI = {};
                sI[key] = new RegExp(val[i], "i");
                inner.push(sI)
            }

            andS.push({$or: inner});
        }

    }


    //let query =  OBJModel.find({ name: 'Delhi' });
    let query = OBJModel.find(busqueda);

    if (like) {
        query.or(andS)
    }

    if (paginate && paginate.limit && (paginate.page || Number(paginate.page === 0))) {
        paginate.limit = Number(paginate.limit);
        paginate.page = Number(paginate.page);
        await query.limit(paginate.limit).skip(paginate.page * paginate.limit);
    }
    if (sort) {
        for (const [key, val] of Object.entries(sort)) {
            order[key] = val;
        }
    }
    await query.sort(order);

    if (_Population && _Population.length > 0) {
        _Population.map(function (item, i, arr) {
            query.populate(item)
        });
    }
    query.exec((err, data) => {


        if (err) {

            return res.status(500).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!data) {
            return res.status(404).json({
                message: '404 Object not found',
                error: err,
                success: false
            })
        }

        if (data[0]) {
            data = data[0];
        }


        return res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
            success: true
        })
    });
});

// GET one  Object find
router.get('/:name/find/', CheckSession, async (req, res) => {
    var nombreModelo = req.params.name;
    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }
    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];
    const {strictsearch, avoid, select} = req.query;

    let busqueda = {};
    if (strictsearch) {
        for (const [key, val] of Object.entries(strictsearch)) {
            busqueda[key] = val;
        }
    }
    if (avoid) {
        for (const [key, val] of Object.entries(avoid)) {
            if (val.toString() === 'true') {
                busqueda[key] = {"$ne": true};
            } else if (val.toString() === 'false') {
                busqueda[key] = {"$ne": false};
            }
            else {
                busqueda[key] = {"$ne": val};
            }
        }
    }

    let query = OBJModel.findOne(busqueda);

    if (_Population && _Population.length > 0) {
        _Population.map(function (item, i, arr) {
            query.populate(item)
        });
    }
    if (select) {
        query.select(select);
    }

    await query.exec((err, data) => {
        if (err) {
            return res.status(500).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!data) {
            return res.status(404).json({
                message: '404 Object not found',
                error: err,
                success: false
            })
        }
        return res.status(200).json({
            message: 'OK',
            data: data,

            success: true
        })
    });
});

// GET all Objects
router.get('/:name/', CheckSession, async (req, res) => {
    var nombreModelo = req.params.name;
    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }


    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];

    const {sort, search, paginate, strictsearch, avoid, like, select} = req.query;
    let order = {};
    let busqueda = {};
    let andS = []

    if (search) {
        for (const [key, val] of Object.entries(search)) {
            if (val.toString() === 'true') {
                busqueda[key] = true;
            } else if (val.toString() === 'false') {
                busqueda[key] = false;
            }
            else {
                busqueda[key] = new RegExp(val, "i");
            }
        }
    }
    if (strictsearch) {
        for (const [key, val] of Object.entries(strictsearch)) {
            busqueda[key] = val;
        }
    }
    if (avoid) {
        for (const [key, val] of Object.entries(avoid)) {
            if (val.toString() === 'true') {
                busqueda[key] = {"$ne": true};
            } else if (val.toString() === 'false') {
                busqueda[key] = {"$ne": false};
            }
            else {
                busqueda[key] = {"$ne": val};
            }
        }
    }
    if (like) {
        for (const [key, val] of Object.entries(like)) {
            var inner = [];
            for (var i = 0; i < val.length; i++) {
                var sI = {};
                sI[key] = new RegExp(val[i], "i");
                inner.push(sI)
            }

            andS.push({$or: inner});
        }

    }


    //let query =  OBJModel.find({ name: 'Delhi' });
    let query = OBJModel.find(busqueda);

    if (like) {
        query.or(andS)
    }
    if (select) {
        query.select(select);
    }

    if (paginate && paginate.limit && (paginate.page || Number(paginate.page === 0))) {
        paginate.limit = Number(paginate.limit);
        paginate.page = Number(paginate.page);
        await query.limit(paginate.limit).skip(paginate.page * paginate.limit);
    }
    if (sort) {
        for (const [key, val] of Object.entries(sort)) {
            order[key] = val;
        }
    }
    await query.sort(order);

    if (_Population && _Population.length > 0) {
        _Population.map(function (item, i, arr) {
            query.populate(item)
        });
    }
    query.exec((err, data) => {


        if (err) {

            return res.status(500).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!data) {
            return res.status(404).json({
                message: '404 Object not found',
                error: err,
                success: false
            })
        }
        return res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
            success: true
        })
    });
});

// GET  one  object by ID
router.get('/:name/:id', CheckSession, async (req, res) => {
    var nombreModelo = req.params.name;
    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }

    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];

    let query = OBJModel.findById(req.params.id);

    if (_Population && _Population.length > 0) {
        _Population.map(function (item, i, arr) {
            query.populate(item)
        });
    }
    await query.exec((err, data) => {
        if (err) {
            console.error(err);
            res.status(404).json({
                message: '500 Internal Server Error',
                error: err,
                success: false
            })
        }
        if (!data) {
            return res.status(404).json({
                message: '404 Object not found',
                error: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            success: true
        })
    });

});

// ADD  new
router.post('/:name/', CheckSession, async (req, res) => {
    const saveData = req.body;

    var nombreModelo = req.params.name;
    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }

    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];

    if (_Special && _Special.post && _Special.post.length > 0) {

        for (var i = 0; i < _Special.post.length; i++) {

            if (saveData.hasOwnProperty(_Special.post[i].path)) {

                if (!_Special.post[i].special) {

                    saveData[_Special.post[i].path] = _Special.post[i].value;
                }
                else {

                    switch (_Special.post[i].type) {
                        case 'pass':

                            const hash = await bcrypt.hash(saveData[_Special.post[i].path], saltRounds);
                            saveData[_Special.post[i].path] = hash;
                            break;
                        case 'date':

                            saveData[_Special.post[i].path] = moment().format()
                            break;
                    }

                }

            }
        }

    }

    if (_addData && _addData.post && _addData.post.length > 0) {
        _addData.post.map(function (item, i, arr) {
            saveData[item.path] = item.value;
        })
    }
    ;

    const obj = new OBJModel(saveData);


    await obj.save((err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({
                message: '500 Internal Server Error',
                errror: err,
                success: false
            })
        }
        if (!data) {
            res.status(404).json({
                message: "We can't save data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            success: true
        })
    });
});

// UPDATE
router.put('/:name/:id', CheckSession, async (req, res) => {
    const json = req.body;
    const newObject = {};

    var nombreModelo = req.params.name;
    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }

    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];

    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (json[key]) {
                newObject[key] = json[key];
            }
            if (json[key] === 'false') {
                newObject[key] = false;
            }
            if (json[key] === false) {
                newObject[key] = false;
            }
        }
    }

    if (_Special && _Special.put && _Special.put.length > 0) {

        for (var i = 0; i < _Special.put.length; i++) {

            if (newObject.hasOwnProperty(_Special.put[i].path)) {

                if (!_Special.put[i].special) {

                    newObject[_Special.put[i].path] = _Special.put[i].value;
                }
                else {

                    switch (_Special.put[i].type) {
                        case 'pass':

                            const hash = await bcrypt.hash(newObject[_Special.put[i].path], saltRounds);
                            newObject[_Special.put[i].path] = hash;
                            break;
                        case 'date':

                            newObject[_Special.put[i].path] = moment().format()
                            break;
                    }

                }

            }
        }

    }

    if (_addData && _addData.put && _addData.put.length > 0) {
        _addData.put.map(function (item, i, arr) {
            newObject[item.path] = item.value;
        })
    }
    ;


    await OBJModel.findByIdAndUpdate(req.params.id, {$set: newObject}, (err, data) => {
        if (err) {
            res.status(500).json({
                message: '500 Internal Server Error',
                errror: err,
                success: false
            })
        }
        if (!data) {
            res.status(404).json({
                message: '404 object not found',
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            success: true
        })
    });
});

// Delete
router.delete('/:name/:id', CheckSession, async (req, res) => {
    var nombreModelo = req.params.name;

    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];


    if (listOfPopulations[nombreModelo]) {
        _Population = listOfPopulations[nombreModelo];
    }

    await OBJModel.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).json({
                message: '500 Internal Server Error',
                errror: err,
                success: false
            })
        }

        res.status(200).json({
            message: 'OK',
            data: data,
            success: true
        })
    });
});

router.post('/:name/datatable', CheckSession, async (req, res) => {

    var nombreModelo = req.params.name;
    var nReal = listOfModelNames[nombreModelo];
    var OBJModel = listOfModels[nReal];

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
            fields: ['name', 'state_id']
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


module.exports = {
    makeItRealDB: makeItRealDB,
    router
}