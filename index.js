const fs = require('fs');
const express = require('express');
const path = require('path');
require('dotenv').config();

//DDBB
const { dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();

// Read & parse body
app.use(express.json());

const options = {
	key: fs.readFileSync('./cert/private.pem'),
	cert: fs.readFileSync('./cert/public.crt'),
};

// Node Server
const server = require('https').createServer(options, app);

server.listen(process.env.PORT, (err) => {
	if (err) throw new Error(err);

	console.log('Servidor corriendo en puerto', process.env.PORT);
});

module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
