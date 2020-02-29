const fs = require('fs')
let dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
    throw result.error
}


module.exports = {
    environment: process.env.ENVIRONMENT, //'development', // development, qa, production
    session_server: process.env.SESSION_SERVER, // 'redis', // redis, standalone
    activeSSL: eval(process.env.ACTIVE_SSL),// false, // true , false
    max_fileupload_size: process.env.MAX_FILEUPLOAD_SIZE,// 10,  // in MB
    body_parser_extended: eval(process.env.BODY_PARSER_EXTENDED),// true, // true,false
    body_parser_json: eval(process.env.BODY_PARSER_JSON),// true, //true , false
    view_engine: process.env.VIEW_ENGINE,// 'pug',
    ssl_port: process.env.SSL_PORT,// 443,
    root: process.env.ROOT,// '/web',
    no_ssl_port: process.env.NO_SSL_PORT,// 8000,
    site_theme: process.env.SITE_THEME,// 'Lumen',
    default_lang: process.env.DEFAULT_LANG,// 'EN',
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,// 12,
    default_no_loged_user_role_id: process.env.DEFAULT_NO_LOGED_USER_ROLE_ID,// '5cbb61d9d35f4b615e0b8f9a',
    default_register_loged_user_role_id: process.env.DEFAULT_REGISTER_LOGED_USER_ROLE_ID,// '5cbb61d9d35f4b615e0b8f9a',
    active_socket: eval(process.env.ACTIVE_SOCKET), // true,
    socket_port: process.env.SOCKET_PORT,// 3000,
    socket_path: process.env.SOCKET_PATH,// path del socket,
    sql_db_flavor: process.env.SQL_FLAVOR_DB,// 'sqlite',// sqlite, mysql,mariadb,
    sqlite_db_path: process.env.SQLITE_DB_PATH,// 'sqlite_db/main.sqlite',
    db_user: process.env.DB_USER, // '',
    db_password: process.env.DB_PASSWORD,//'',
    db_database: process.env.DB_DATABASE,//'',
    db_host: process.env.DB_HOST,//'',
    db_logging: eval(process.env.DB_LOGGING),//'',
    noSQLDB_name: process.env.NO_SQL_NAME,//'project',
    noSQLDB_host: process.env.NO_SQL_HOST,
    noSQLDB_port: process.env.NO_SQL_PORT,
    allow_cors: eval(process.env.ALLOW_ALL_ACCES_ORINGIN_ACTIVED),
    allow_cors_domain: process.env.CORS_DOMAIN_AOLLWED,

}


/**
 * Available themes preview  on  https://bootswatch.com v4.3.1
 *
 * Cerulean
 * Cosmo
 * Cyborg
 * Darkly
 * Flatly
 * Journal
 * Litera
 * Lumen
 * Lux
 * Materia
 * Minty
 * Pulse
 * Sandstone
 * Simplex
 * Sketchy
 * Slate
 * Solar
 * Spacelab
 * Superhero
 * United
 * Yeti
 *
 *
 *
 */