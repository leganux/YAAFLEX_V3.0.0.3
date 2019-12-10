const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession');
var env = require('../../config/environment.config');
const BuildBasicSQLQueries = require('../../helpers/general_sql_query.helper')

let moment = require('moment')


//Definimos el modelo
const ModelTables = require('./../../models/SQL/baas_tables.model');
const ModelField = require('./../../models/SQL/baas_fields.model');
let RunningCron = {};


//save new
router.post('/collection/', CheckSession, async (req, res) => {
    let saveData = req.body;
    ModelTables.create(saveData).then(data => {
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
        });

    }).catch((err) => {
        console.error(err)
        res.status(500).json({
            message: '500 Internal Server Error',
            errror: err,
            success: false
        })
    });
});

//save fields
router.post('/fields/', CheckSession, async (req, res) => {
    let saveData = req.body;
    ModelField.create(saveData).then(data => {
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
        });

    }).catch((err) => {
        console.error(err)
        res.status(500).json({
            message: '500 Internal Server Error',
            errror: err,
            success: false
        })
    });
});

//get all
router.get('/collection/', CheckSession, async (req, res) => {

    const {sort, search, paginate, strictsearch, avoid, like} = req.query;
    let order = {};
    let busqueda = {};
    let where = {}
    let andS = []


    if (strictsearch) {
        for (const [key, val] of Object.entries(strictsearch)) {
            busqueda[key] = val;
        }
        where = {where: strictsearch}
    }


    ModelTables.findAll(where).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't GET data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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

//get all
router.get('/fields/', CheckSession, async (req, res) => {

    const {sort, search, paginate, strictsearch, avoid, like} = req.query;
    let order = {};
    let busqueda = {};
    let where = {}
    let andS = []


    if (strictsearch) {
        for (const [key, val] of Object.entries(strictsearch)) {
            busqueda[key] = val;
        }
        where = {where: strictsearch}
    }


    ModelField.findAll(where).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't GET data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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

//get by ID
router.get('/collection/:id', CheckSession, async (req, res) => {
    var ID = req.params.id;

    ModelTables.findByPk(ID).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't FIND data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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

//get by ID
router.get('/fields/:id', CheckSession, async (req, res) => {
    var ID = req.params.id;

    ModelField.findByPk(ID).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't FIND data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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


//update by ID
router.put('/collection/:id', CheckSession, async (req, res) => {
    let ID = req.params.id;
    const json = req.body;
    let newObject = {};


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
            if (json[key] == '') {
                newObject[key] = ' ';
            }
        }
    }

    ModelTables.update(
        newObject,
        {
            where: {id: ID}
        }
    ).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't UPDATE data",
                errror: err,
                success: false
            })
        }

        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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

//update by ID
router.put('/fields/:id', CheckSession, async (req, res) => {
    let ID = req.params.id;
    const json = req.body;
    let newObject = {};


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
            if (json[key] == '') {
                newObject[key] = ' ';
            }
        }
    }

    ModelField.update(
        newObject,
        {
            where: {id: ID}
        }
    ).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't UPDATE data",
                errror: err,
                success: false
            })
        }

        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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

//delete by ID
router.delete('/collection/:id', CheckSession, async (req, res) => {
    var ID = req.params.id;


    ModelTables.destroy(
        {
            where: {id: ID}
        }
    ).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't DELETE data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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

//delete by ID
router.delete('/fields/:id', CheckSession, async (req, res) => {
    var ID = req.params.id;


    ModelField.destroy(
        {
            where: {id: ID}
        }
    ).then(data => {
        if (!data) {
            res.status(404).json({
                message: "We can't DELETE data",
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'OK',
            data: data,
            count: data.length,
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