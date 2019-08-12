const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const DB = require('./../../sql_db');


const api_scripts = DB.define('user', {
    method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING

    },
    code: {
        type: Sequelize.STRING
    }
}, {
    // options
});


module.exports = api_scripts;