const express = require('express');
const router = express.Router();
const CheckSession = require('../../auth/checkSession');
var env = require('../../config/environment.config');
const BuildBasicSQLQueries = require('../../helpers/general_sql_query.helper')
var cron = require('node-cron');
var cb = require('cron-builder');
let moment = require('moment')


//Definimos el modelo
const Model = require('./../../models/SQL/cron_scripts.model');
let RunningCron = {};


//save new
router.post('/', CheckSession, async (req, res) => {
    let saveData = req.body;

    let cronExp = new cb();
    if (saveData.minute && saveData.minute != '' && saveData.minute != '*') {
        cronExp.addValue('minute', saveData.minute);
    }

    if (saveData.hour && saveData.hour != '' && saveData.hour != '*') {
        cronExp.addValue('hour', saveData.hour);
    }
    if (saveData.dayOfTheMonth && saveData.dayOfTheMonth != '' && saveData.dayOfTheMonth != '*') {
        cronExp.addValue('dayOfTheMonth', saveData.dayOfTheMonth);
    }
    if (saveData.dayOfTheWeek && saveData.dayOfTheWeek != '' && saveData.dayOfTheWeek != '*') {
        cronExp.addValue('dayOfTheWeek', saveData.dayOfTheWeek);
    }
    if (saveData.monthOfTheYear && saveData.monthOfTheYear != '' && saveData.monthOfTheYear != '*') {
        cronExp.addValue('monthOfTheYear', saveData.monthOfTheYear);
    }

    saveData.cron_string = cronExp.build();

    Model.create(saveData).then(data => {

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



        console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
        console.log("\x1b[36m%s\x1b[0m", "Added " + saveData.description + " with ID " + data.id);

        RunningCron['cron_' + data.id] = cron.schedule(data.cron_string, () => {
            console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
            console.log("\x1b[36m%s\x1b[0m", "Running " + data.description + " with ID " + data.id);
            let myfunction = eval('(' + data.code + ')');
            myfunction();
        }, {
            scheduled: false
        });

        if (data.state) {
            console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
            console.log("\x1b[36m%s\x1b[0m", "Start " + saveData.description + " with ID " + data.id);
            RunningCron['cron_' + data.id].start();
        } else {
            console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
            console.log("\x1b[36m%s\x1b[0m", "Stop " + saveData.description + " with ID " + data.id);
            RunningCron['cron_' + data.id].stop();
        }


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
router.get('/', CheckSession, async (req, res) => {

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


    Model.findAll(where).then(data => {
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
router.get('/:id', CheckSession, async (req, res) => {
    var ID = req.params.id;

    Model.findByPk(ID).then(data => {
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

router.get('/find/', CheckSession, async (req, res) => {
    const {sort, search, paginate, strictsearch, avoid, like} = req.query;
    let order = {};
    let busqueda = {};
    let andS = []


    if (strictsearch) {
        for (const [key, val] of Object.entries(strictsearch)) {
            busqueda[key] = val;
        }
    }

    Model.findOne({
        where: busqueda,
    }).then(data => {
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
router.put('/:id', CheckSession, async (req, res) => {
    let ID = req.params.id;
    const json = req.body;
    let newObject = {};

    RunningCron['cron_' + ID].stop();
    RunningCron['cron_' + ID] = {};

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

    if (newObject.state == 1) {
        newObject.state = true;
    } else {
        newObject.state = false;
    }


    let cronExp = new cb();
    if (json.minute && json.minute.trim() !== '') {
        cronExp.addValue('minute', json.minute);
    }

    if (json.hour && json.hour.trim() !== '') {
        cronExp.addValue('hour', json.hour);
    }
    if (json.dayOfTheMonth && json.dayOfTheMonth.trim() !== '') {
        cronExp.addValue('dayOfTheMonth', json.dayOfTheMonth);
    }
    if (json.dayOfTheWeek && json.dayOfTheWeek.trim() !== '') {
        cronExp.addValue('dayOfTheWeek', json.dayOfTheWeek);
    }
    if (json.monthOfTheYear && json.monthOfTheYear.trim() !== '') {
        cronExp.addValue('monthOfTheYear', json.monthOfTheYear);
    }

    newObject.cron_string = cronExp.build();

    Model.update(
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


        RunningCron['cron_' + ID] = cron.schedule(newObject.cron_string, () => {
            console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
            console.log("\x1b[36m%s\x1b[0m", "Running " + json.description + " with ID " + ID);
            let myfunction = eval('(' + json.code + ')');
            myfunction();
        }, {
            scheduled: false
        });

        console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
        console.log("\x1b[36m%s\x1b[0m", "Reload " + json.description + " with ID " + ID);


        if (json.state) {
            if (json.state === 1 || json.state === true || json.state === '1') {
                RunningCron['cron_' + ID].start();
                console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
                console.log("\x1b[36m%s\x1b[0m", "Start " + json.description + " with ID " + ID);
            } else {
                RunningCron['cron_' + ID].stop();
                console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
                console.log("\x1b[36m%s\x1b[0m", "Stop " + json.description + " with ID " + ID);
            }
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
router.delete('/:id', CheckSession, async (req, res) => {
    var ID = req.params.id;

    RunningCron['cron_' + ID].stop();
    RunningCron['cron_' + ID].destroy();

    console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
    console.log("\x1b[36m%s\x1b[0m", "Stop and delete process with ID " + ID);

    Model.destroy(
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


// inicializa todos  lo crons
Model.findAll().then(data => {
    if (!data || data.length < 1) {
        console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
        console.log("\x1b[36m%s\x1b[0m", "No cron scripts declared");
        return 0;
    }

    data.map((item) => {
        //cron_string
        if (item.state) {

            RunningCron['cron_' + item.id] = cron.schedule(item.cron_string, () => {
                console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
                console.log("\x1b[36m%s\x1b[0m", "Running " + item.description + " with ID " + item.id);
                let myfunction = eval('(' + item.code + ')');
                myfunction();
            }, {
                scheduled: false
            });
            RunningCron['cron_' + item.id].start();
            console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
            console.log("\x1b[36m%s\x1b[0m", "Schedule and Start " + item.description + " with ID " + item.id);
        } else {
            RunningCron['cron_' + item.id] = cron.schedule(item.cron_string, () => {
                console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
                console.log("\x1b[36m%s\x1b[0m", "Running " + item.description + " with ID " + item.id);
                let myfunction = eval('(' + item.code + ')');
                myfunction();
            }, {
                scheduled: false
            });
            RunningCron['cron_' + item.id].stop();
            console.log("\x1b[32m%s\x1b[0m", "******* CRON SCRIP MESSAGE ******");
            console.log("\x1b[36m%s\x1b[0m", "Schedule and stop " + item.description + " with ID " + item.id);
        }
    });


}).catch((err) => {
    console.error(err)
});


module.exports = router;