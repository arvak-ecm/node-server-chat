const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { createJWT } = require('../jwt/jwt');

const jwt = async (id) => {
	return await createJWT(id);
};

const createdUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const ifExistEmail = await User.findOne({ email });

		if (ifExistEmail) {
			return res.status(400).json({
				INFO: {
					code: '16',
					descrip: 'TX_ERROR',
				},
			});
		}

		const userDB = new User(req.body);

		// Encryp Password
		const salt = bcrypt.genSaltSync();

		userDB.password = bcrypt.hashSync(password, salt);

		await userDB.save();

		const token = await jwt(userDB.id);
		userDB.set('token', token, { strict: false });

		res.json({
			INFO: {
				code: '00',
				descrip: 'TX_OK',
			},
			OUTPUT: userDB,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			INFO: {
				code: '16',
				descrip: 'TX_ERROR',
			},
		});
	}
};

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const userDB = await User.findOne({ email });

		if (!userDB) {
			return res.status(400).json({
				INFO: {
					code: '16',
					descrip: 'TX_ERROR',
				},
			});
		}

		const validPassword = bcrypt.compareSync(password, userDB.password);

		if (!validPassword) {
			return res.status(400).json({
				INFO: {
					code: '16',
					descrip: 'TX_ERROR',
				},
			});
		}

		const token = await jwt(userDB.id);

		userDB.set('token', token, { strict: false });

		res.json({
			INFO: {
				code: '00',
				descrip: 'TX_OK',
			},
			OUTPUT: userDB,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			INFO: {
				code: '16',
				descrip: 'TX_ERROR',
			},
		});
	}
};

const renewJWT = async (req, res = response) => {
	const uid = req.uid;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			res.status(400).json({
				INFO: {
					code: '16',
					descrip: 'TX_ERROR',
				},
			});
		}

		const token = await jwt(userDB.id);

		userDB.set('token', token, { strict: false });

		res.json({
			INFO: {
				code: '00',
				descrip: 'TX_OK',
			},
			OUTPUT: userDB,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			INFO: {
				code: '16',
				descrip: 'TX_ERROR',
			},
		});
	}
};

module.exports = {
	createdUser,
	login,
	renewJWT,
};
