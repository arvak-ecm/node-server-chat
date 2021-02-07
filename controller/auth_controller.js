const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { createJWT } = require("../jwt/jwt");

const jwt = async (id) => {
	return await createJWT(id);
};

const createdUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const ifExistEmail = await User.findOne({ email });

		if (ifExistEmail) {
			return res.status(400).json({
				ok: false,
				msg: "Error register",
			});
		}

		const user = new User(req.body);

		// Encryp Password
		const salt = bcrypt.genSaltSync();

		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		const token = await jwt(user.id);

		res.json({
			ok: true,
			OUTPUT: {
				user: user,
				token: token,
			},
		});
	} catch (err) {
		console.log(err);
	}
};

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const userDB = await User.findOne({ email });

		if (!userDB) {
			return res.status(400).json({
				ok: false,
				msg: "Error credentials",
			});
		}

		const validPassword = bcrypt.compareSync(password, userDB.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Error credentials",
			});
		}

		const token = await jwt(userDB.id);

		res.json({
			ok: true,
			OUTPUT: {
				user: userDB,
				token: token,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			ok: false,
			msg: "Error internal server",
		});
	}
};

const renewJWT = async (req, res = response) => {
	const uid = req.uid;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			return res.status(400).json({
				ok: false,
				msg: "Error credentials",
			});
		}

		const token = await jwt(userDB.id);
		console.log(userDB);

		res.json({
			ok: true,
			OUTPUT: {
				user: userDB,
				token: token,
			},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			ok: false,
			msg: "Error internal server",
		});
	}
};

module.exports = {
	createdUser,
	login,
	renewJWT,
};
