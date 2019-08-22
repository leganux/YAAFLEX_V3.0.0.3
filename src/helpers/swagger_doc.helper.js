const express = require('express');
const router = express.Router();


const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./documentation.js');


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;