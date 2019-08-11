
const express = require('express');
const router = express.Router();
const env = require('./../config/environment.config')

router.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    req.user = false;
    res.redirect(env.root +'/');
  });

module.exports = router;