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

/** login routes */
app.use(env.root + '/auth/facebook', require('./auth/facebook'));
app.use(env.root + '/auth/twitter', require('./auth/twitter'));
app.use(env.root + '/auth/google', require('./auth/google'));
app.use(env.root + '/auth/instagram', require('./auth/instagram'));
app.use(env.root + '/auth/admin', require('./auth/admin'));
app.use(env.root + '/auth/login', require('./auth/login'));

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


if (env.environment == 'development' || env.environment == 'qa') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('tiny'));
}
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

/** API Routes */
app.use(env.root + '/api', require('./routes/_api.routes'));

// Static Files
app.use(env.root + '/cdn/assets', express.static(path.join(__dirname, 'public')));

//views
app.set("views", path.join(__dirname, "views"));


if (env.active_socket) {
    // group chat socket IO on port 3000
    var io = require('./socket')

    var chat = io
        .of('/chat')
        .on('connection', function (socket) {
            console.log('an user connected');
            //socket.broadcast.emit('hello everione');
            chat.emit('chat:message', 'hi');
            socket.on('chat:message', function (msg) {
                console.log('mensaje' + msg)
                chat.emit('chat:message', msg);
            });
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });

        });
}


// error VIEWS
app.use(function (req, res) {
    res.status('404').render("errors/err404", {});
});
