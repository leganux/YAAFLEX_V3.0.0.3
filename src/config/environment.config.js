module.exports = {
    environment: 'development', // development, qa, production
    session_server: 'redis', // redis, standalone
    activeSSL: false, // true , false
    max_fileupload_size: 10,  // in MB
    body_parser_extended: true, // true,false
    body_parser_json: true, //true , false
    view_engine: 'pug',
    ssl_port: 443,
    root:'/web',
    no_ssl_port: 8000,
    site_theme: 'Flatly',
    default_lang: 'EN',
    bcrypt_salt_rounds: 12,
    default_no_loged_user_role_id: '5cbb61d9d35f4b615e0b8f9a',
    default_register_loged_user_role_id: '5cbb61d9d35f4b615e0b8f9a',
    active_socket: true,
    socket_port: 3000,
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