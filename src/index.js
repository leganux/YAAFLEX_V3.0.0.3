/** Imports Dependences */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const https = require('https')
const http = require('http')
const fs = require('fs')
var session = require('express-session')
var RedisStore = require('connect-redis')(session);

let io = {};

var dir = path.join(__dirname, '/logs');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


/** Imports FRWRK  */
const env = require('./config/environment.config')
const ssl_routes = require('./config/ssl_routes.config')
const global = require('./config/global.config')


/** FRWK VARS */
var privateKey = {}
var certificate = {}
var ca = {}

// load SSL files
if (env.activeSSL) {
    privateKey = fs.readFileSync(ssl_routes.privkey, 'utf8');
    certificate = fs.readFileSync(ssl_routes.cert, 'utf8');
    ca = fs.readFileSync(ssl_routes.chain, 'utf8');
}


//app.use(bodyParser());
if (env.body_parser_json) {
    app.use(bodyParser.json({limit: '100mb', type: 'application/json'}));
}
app.use(bodyParser.urlencoded({parameterLimit: 100000, limit: '100mb', extended: env.body_parser_extended}));


// limit upload filisize
app.use(fileUpload(
    {limits: {fileSize: env.max_fileupload_size * 1024 * 1024},}
));

// view engine html
app.set("view engine", env.view_engine);


// cookie parser
app.use(require('cookie-parser')());

if (env.session_server == 'redis') {
    app.use(session({
        store: new RedisStore({
            host: '127.0.0.1',
            port: 6379,
            db: 1
        }),
        secret: global.cookie_secret,
        name: global.LNX_COOKIE,
        resave: false,
        saveUninitialized: true,
        httpOnly: global.http_only_session
    }));
} else if (env.session_server == 'standalone') {
    app.use(session({
        secret: global.cookie_secret,
        resave: false,
        name: global.LNX_COOKIE,
        saveUninitialized: true,
        cookie: {secure: true},
        httpOnly: global.http_only_session
    }))
}

// passport  JS initialitation
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());


// allow cors
if (env.allow_cors) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", env.allow_cors_domain); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

/** login routes */
app.use(env.root + '/auth/facebook', require('./auth/facebook'));
app.use(env.root + '/auth/twitter', require('./auth/twitter'));
app.use(env.root + '/auth/google', require('./auth/google'));
app.use(env.root + '/auth/instagram', require('./auth/instagram'));
app.use(env.root + '/auth/admin', require('./auth/admin'));
app.use(env.root + '/auth/login', require('./auth/login'));
app.use(env.root + '/auth/token', require('./auth/logintoken'));

// Db connection
const {mongoose} = require('./database');


if (env.activeSSL) {
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
    https.createServer(credentials, app)
        .listen(env.ssl_port, function () {
            console.log('Https Server started at ' + env.ssl_port + env.root + '/')
        })

    Server_ = http.createServer(app)
        .listen(env.no_ssl_port, function () {
            console.log('Http server start at ' + env.no_ssl_port + env.root + '/')
        })

} else {
    Server_ = http.createServer(app)
        .listen(env.no_ssl_port, function () {
            console.log('Http server start at ' + env.no_ssl_port + env.root + '/')
        })
}

if (env.active_socket) {
    if (!env.socket_port) {

        io = require('socket.io').listen(Server_, {path: env.root + env.socket_path})
    } else {
        io = require('./socket')
    }

    var chat = io
        .of(env.root + '/dashFlowSocket')
        .on('connection', function (socket) {
            console.log('** An user connected');

            chat.emit('chat:message', 'hi');
            socket.on('chat:message', function (msg) {

                chat.emit('chat:message', msg);
            });
            socket.on('disconnect', function () {
                console.log('*** User disconnected');
            });

        });

}

// se reemplaza defalt console functions
const _privateLog = console.log;
const _privateError = console.error;
const _privateInfo = console.info;
const _privateWarn = console.warn;
const _privateDebug = console.debug;


console.log = function (message) {
    sendToWebConsole('table-success', message, arguments);
    _privateLog.apply(console, arguments);
    let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/yaaflex.log'), {flags: 'a'});
    streamLogFile.end(JSON.stringify(arguments) + '\r\n')
};
console.error = function (message) {
    sendToWebConsole('table-danger', message, arguments);
    _privateError.apply(console, arguments);
    let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/yaaflex.log'), {flags: 'a'});
    streamLogFile.end(JSON.stringify(arguments) + '\r\n')
};
console.info = function (message) {
    sendToWebConsole('table-primary', message, arguments);
    _privateInfo.apply(console, arguments);
    let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/yaaflex.log'), {flags: 'a'});
    streamLogFile.end(JSON.stringify(arguments) + '\r\n')
};
console.warn = function (message) {
    sendToWebConsole('table-warning', message, arguments);
    _privateWarn.apply(console, arguments);
    let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/yaaflex.log'), {flags: 'a'});
    streamLogFile.end(JSON.stringify(arguments) + '\r\n')
};
console.debug = function (message) {
    sendToWebConsole('table-dark', message, arguments);
    _privateDebug.apply(console, arguments);
    let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/yaaflex.log'), {flags: 'a'});
    streamLogFile.end(JSON.stringify(arguments) + '\r\n')
};


var consoleOnScreen = io.of('/console').on('connection', function (socket) {
    sendToWebConsole('table-default', '', '<h4>******** CONSOLA CONECTADA ******</h4>')
});

function sendToWebConsole(classe, message, data) {

    // enviar datos de consola al screen
    if (env.allow_console_on_screen && env.active_socket) {

        // send to all currently connected webSockets
        if (typeof data === "object") {
            //data = JSON.stringify(data);

            let cad = '';
            for (var i in data) {
                var attrName = i;
                var attrValue = data[i];

                if (typeof attrValue === 'object') {
                    cad = cad + '  ' + JSON.stringify(attrValue)
                }

                cad = cad + ' &nbsp;&nbsp;&nbsp;&nbsp; ' + attrValue

            }
            consoleOnScreen.emit('consola:log', `<tr style="width: 100%"  class="${classe}"> <th class="">${cad}</th></tr>`);


        }
        else {
            consoleOnScreen.emit('consola:log', `<tr style="width: 100%"  class="${classe}"> <th class="">${data}</th></tr>`);

        }

    }
}

// FIN se reemplaza defalt console functions

module.exports = {
    io: io,
    consoleOnScreen: consoleOnScreen,
    sendToWebConsole: sendToWebConsole
};

// enviar datos de requests al screen
app.use(morgan(function (tokens, req, res) {


    let cadenamorgan = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        //tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join('  ');

    let METHOD = '';
    let PARAMS = JSON.stringify(req.params);
    let QUERY = '';
    let BODY = '';
    let HEADERS = JSON.stringify(req.headers);


    switch (tokens.method(req, res)) {
        case 'GET':
            METHOD = '<h4 class="text-info">GET</h4>';
            QUERY = JSON.stringify(req.query);
            break;
        case 'POST':
            METHOD = '<h4 class="text-primary">POST</h4>';
            BODY = JSON.stringify(req.body);
            break;

        case 'DELETE':
            METHOD = '<h4 class="text-danger">DELETE</h4>';

            break;

        case 'PUT':
            METHOD = '<h4 class="text-warning">PUT</h4>';
            BODY = JSON.stringify(req.body);
            break;

    }

    let cadenamorganWEB = '';
    let myurl = tokens.url(req, res).toLowerCase();
    if (myurl.includes('.css')
        || myurl.includes('.js')
        || myurl.includes('.jpg')
        || myurl.includes('.jpeg')
        || myurl.includes('.png')
        || myurl.includes('.ico')
        || myurl.includes('.pdf')
        || myurl.includes('.woff')
        || myurl.includes('.woff2')
        || myurl.includes('.tiff')
        || myurl.includes('.gif')
        || myurl.includes('.mp4')
        || myurl.includes('.mp3')
        || myurl.includes('.webm')
        || myurl.includes('.io')
        || myurl.includes('.map')
        || myurl.includes('.ttf')
        || myurl.includes('.doc')
        || myurl.includes('.docx')
        || myurl.includes('.xls')
        || myurl.includes('.xlsx')
        || myurl.includes('.json')
        || myurl.includes('.ppt')
        || myurl.includes('.pptx')
        || myurl.includes('.mov')
        || myurl.includes('.flv')
        || myurl.includes('.m3u')
        || myurl.includes('.eot')
        || myurl.includes('.svg')
        || myurl.includes('.htm')
        || myurl.includes('.html')

    ) {
        cadenamorganWEB = [
            METHOD,
            tokens.url(req, res),
            tokens.status(req, res),
            tokens['response-time'](req, res), 'ms',
        ].join('  ')

    } else {
        cadenamorganWEB = [
            METHOD,
            tokens.url(req, res),
            tokens.status(req, res),
            tokens['response-time'](req, res), 'ms',
            '<br> <h5> HEADERS</h5> ' + HEADERS,
            '<br> <h5> PARAMS</h5> ' + PARAMS,
            '<br> <h5> QUERY</h5> ' + QUERY,
            '<br> <h5> BODY</h5> ' + BODY,
        ].join('  ')
    }


    if (env.allow_console_on_screen) {
        sendToWebConsole('table-ligth', 'morgan', cadenamorganWEB)
    }

    let streamLogFile = fs.createWriteStream(path.join(__dirname, '/logs/yaaflex.log'), {flags: 'a'});
    streamLogFile.end(cadenamorgan + '\r\n');

    return cadenamorgan;
}));


// Middlewares
app.use(express.json());

//Backoffice and Frontend Routes Control
app.use(env.root + '/lx_admin', require('./viewEngine/backoffice'));
app.use(env.root + '/', require('./viewEngine/frontend'));
app.use(env.root + '/upload', require('./viewEngine/upload'));

//Helpers
app.use(env.root + '/', require('./helpers/lets_encrypt.helper'));
app.use(env.root + '/robots.txt', require('./helpers/robots_txt.helper'));
app.use(env.root + '/', require('./helpers/logout.helper'));
app.use(env.root + '/api_docs', require('./helpers/swagger_doc.helper'));

/** API Routes */
app.use(env.root + '/api', require('./routes/_api.routes'));

// Static Files
app.use(env.root + '/cdn/assets', express.static(path.join(__dirname, 'public')));

//views
app.set("views", path.join(__dirname, "views"));


// error VIEWS
app.use(function (req, res) {
    res.status('404').render("errors/err404", {});
});


if (env.allow_debug_panel_screen) {
    require('express-debug')(app, {
        path: env.root + env.url_debug_panel_on_screen,
        panels: ['locals', 'request', 'session', 'software_info']
    });
}