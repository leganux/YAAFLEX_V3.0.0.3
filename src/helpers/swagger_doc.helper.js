const express = require('express');
const router = express.Router();
const fs = require('fs');

const swaggerUi = require('swagger-ui-express');

const path = require('path');
var dir_ = path.join(__dirname, 'swagger.json')


router.use('/', swaggerUi.serve);


fs.readFile(dir_, function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;


    router.get('/', swaggerUi.setup(JSON.parse(content)));
});


module.exports = router;