const bcrypt = require('bcryptjs');
var env = require('./../config/environment.config')
const saltRounds = env.bcrypt_salt_rounds;
const moment = require('moment');

module.exports = function (router, OBJModel, _Population, CheckSession, _Special, _addData) {

    // get firts element
    router.get('/first/', CheckSession, async (req, res) => {
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
    router.get('/find/', CheckSession, async (req, res) => {
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
    router.get('/', CheckSession, async (req, res) => {



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
    router.get('/:id', CheckSession, async (req, res) => {
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
    router.post('/', CheckSession, async (req, res) => {
        const saveData = req.body;

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
    router.put('/:id', CheckSession, async (req, res) => {
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
    router.delete('/:id', CheckSession, async (req, res) => {
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

    return router;
}