
const express = require('express');
const router = express.Router();
const env = require('./../config/environment.config')

router.get(env.root + '/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /lx_admin/");
});

module.exports = router;