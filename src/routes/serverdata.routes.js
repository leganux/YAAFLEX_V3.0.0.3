const checkDiskSpace = require('check-disk-space')
const os = require('os');
const moment = require('moment');

const express = require('express');
const router = express.Router();





router.get('/', async (req, res) => {

    checkDiskSpace('/').then((diskSpace) => {

        res.status(200).json({
            message: 'ok',
            data: {
                freeDiskSpace: diskSpace.free / 1000000000,
                totalDiskSpace: diskSpace.size / 1000000000,
                freemen: os.freemem() / 10000,
                totalmem: os.totalmem() / 10000,
                uptime: os.uptime() / (60 * 60),
                cpus: os.cpus(),
                hora: moment().format('MMMM Do YYYY, h:mm:ss a')
            },
            success: true
        })

    }).catch(err => {
        res.status(500).json({
            message: 'datos no encontrado ',
            error: err,
            success: false
        })
    })

});


module.exports = router;