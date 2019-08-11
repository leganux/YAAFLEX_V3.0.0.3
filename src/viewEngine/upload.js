const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
const CheckSession = require('./../auth/checkSession')
const moment = require('moment');

const FM = require('./../models/fileAdmin.model');

var fs = require('fs');
const path = require('path');




router.post('/', CheckSession, async (req, res) => {
    if (Object.keys(req.files).length == 0) {
        res.status(200).json({
            message: 'File Not Uploaded',
            success: false
        })
    }
    for (var prop in req.files) {
        let myFile = req.files[prop];
        var today = moment().format('X');
        var ext = myFile.name.split('.');
        var le = ext.length;
        ext = ext[le - 1];

        //filename
        var filename = 'LeganuxFileAdmin_' + prop + '_' + today + '_' + myFile.name.substring(0, 3).replace('.', '').replace(/[^\w\s]/gi, '').replace(ext, '').toLowerCase() + '.' + ext;
        //originalname
        var original = myFile.name;
        //originalname
        var collection = prop.toLowerCase().replace('.', '').replace(/[^\w\s]/gi, '');
        //disk route
        var disk_route = path.join(__dirname, "../public/files/", collection) + '/' + filename;
        //public route
        var public_route = RoutesConfig.FilesPath + '/' + collection + '/' + filename;

        var dir = path.join(__dirname, "../public/files/", collection);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        myFile.mv(disk_route, function (err) {
            if (err) {
                res.status(400).json({
                    message: 'File Not Uploaded',
                    success: false,
                    error: err,
                })
                return 0;
            }
            var nFile = new FM({
                filename: filename,
                original: original,
                public_path: public_route,
                disk_path: disk_route,
                folder: collection
            });
            nFile.save(function (err2, data2) {
                if (err) {
                    res.status(400).json({
                        message: 'File Not Uploaded',
                        success: false,
                        error: err,
                    })
                    return 0;
                }
                res.status(200).json({
                    message: 'File Uploaded',
                    file: public_route,
                    success: true,
                    data: data2
                })
                return 0;
            });

        });
    }

});


module.exports = router;