const Sequelize = require('sequelize');

const DB = require('./../../sql_db');


const cron_scripts = DB.define('cron_scrips', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    state: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    code: {
        type: Sequelize.TEXT
    },
    cron_string: {
        type: Sequelize.STRING,
    },
    minute: {
        type: Sequelize.STRING,
    },
    hour: {
        type: Sequelize.STRING,
    },
    dayOfTheMonth: {
        type: Sequelize.STRING,
    },
    dayOfTheWeek: {
        type: Sequelize.STRING,
    },
    monthOfTheYear: {
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {

});

cron_scripts.sync().then(() => {
    console.log('** Table  cron_scripts  was created!!');
});

module.exports = cron_scripts;