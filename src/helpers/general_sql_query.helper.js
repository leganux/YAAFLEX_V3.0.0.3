const bcrypt = require('bcryptjs');
var env = require('./../config/environment.config')
const saltRounds = env.bcrypt_salt_rounds;
const moment = require('moment');

module.exports = function (router, Model, CheckSession) {

//save new
    router.post('/', CheckSession, async (req, res) => {
        const saveData = req.body;

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
        var ID = req.params.id;
        const json = req.body;
        const newObject = {};

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
                if (json[key] =='') {
                    newObject[key] = ' ';
                }
            }
        }

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
};