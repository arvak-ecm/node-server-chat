const { io } = require('../index');
const { checkJWT } = require('../jwt/jwt');
const {
	userConect,
	userDisconect,
	saveMsg,
} = require('../controller/socket_controller');

// Mensajes de Sockets
io.on('connection', (client) => {
	const [isValid, uid] = checkJWT(client.handshake.headers['x-token']);

	if (!isValid) {
		return client.disconnect();
	}

	userConect(uid);

	// init user room chat
	client.join(uid);
	client.on('person-msg', async (payload) => {
		await saveMsg(payload);
		io.to(payload.to).emit('person-msg', payload);
	});

	var ts = Date.now();
	console.log('Cliente conectado - ' + Math.floor(ts / 1000));

	client.on('disconnect', () => {
		userDisconect(uid);
		console.log('Cliente desconectado - ' + Math.floor(ts / 1000));
	});

	client.on('mensaje', (payload) => {
		console.log('Mensaje', payload);

		io.emit('mensaje', { admin: 'Nuevo mensaje' });
	});
});
