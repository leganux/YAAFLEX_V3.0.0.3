const Sequelize = require('sequelize');
const env = require('./config/environment.config');
var SQLDB = {}

var dir_sqlite = path.join(__dirname, env.sqlite_db_path)

if (env.sql_db_flavor == 'sqlite') {
    SQLDB = new Sequelize({
        storage: dir_sqlite,
        dialect: env.sql_db_flavor
    });


} else {

    SQLDB = new Sequelize(env.db_database, env.db_user, env.db_password, {
        host: env.db_host,
        dialect: dv.sql_db_flavor
    });
}

SQLDB.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = SQLDB;