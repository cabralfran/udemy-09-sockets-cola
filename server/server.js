require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) {
        console.log('Error al conectarse a MongoDB: ', err);
    } else {
        console.log('base de datos online');
    }
});

mongoose.set('useFindAndModify', false);



server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});