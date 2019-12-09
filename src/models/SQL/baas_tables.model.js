const Sequelize = require('sequelize');

const DB = require('./../../sql_db');

const baas_tables = DB.define('baas_tables', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    route_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    // options
});

baas_tables.sync().then(() => {
    console.log('** Table baas_tables was created!!');
});

module.exports = baas_tables;