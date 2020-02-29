const Sequelize = require('sequelize');

const DB = require('./../../sql_db');

const baas_fields = DB.define('baas_fields', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    property: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    id_table: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: true
    },
    r_model: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    // options
});

baas_fields.sync().then(() => {

});

module.exports = baas_fields;