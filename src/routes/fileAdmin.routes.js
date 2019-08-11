const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
const fs = require('fs')

//Model
const OBJModel = require('./../models/fileAdmin.model');

//Other Models

//population
const _Population = [];

const _Special = {
}

const _addData = {
}

BuildBasicQueries(router, OBJModel, false, CheckSession, false, false)


router.delete('/FP/:id', CheckSession, async (req, res) => {
    const { path } = req.body;
    ID = req.params.id;

    try {
        fs.unlinkSync(path)


        await OBJModel.findByIdAndRemove(req.params.id, (err, data) => {
            if (err) {
            
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

    } catch (err) {
        console.error(err)

        res.status(500).json({
            message: '500 Internal Server Error',
            errror: err,
            success: false
        })
    }









});

module.exports = router;
