const Sequelize = require('sequelize');
const DB = require('./../../sql_db');


const api_scripts = DB.define('api_scrips', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    code: {
        type: Sequelize.TEXT
    },
    route_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    params: {
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    // options
});

api_scripts.sync().then(() => {

});

module.exports = api_scripts;