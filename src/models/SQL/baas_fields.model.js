const Sequelize = require('sequelize');

const DB = require('./../../sql_db');

const baas_fienlds = DB.define('baas_fienlds', {
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
        type: Sequelize.JSON,
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

baas_fienlds.sync().then(() => {
    console.log('** Table baas_fienlds was created!!');
});

module.exports = baas_fienlds;