const express = require('express');
const app = express();
const http = require('http')
const env = require('./config/environment.config');

var io = {};
if (env.active_socket) {
    Server_ = http.createServer(app)
        .listen(env.socket_port, function () {
            console.log('Socket server start at port  ' + env.socket_port)
        });
    io = require('socket.io').listen(Server_);
}

module.exports = io;