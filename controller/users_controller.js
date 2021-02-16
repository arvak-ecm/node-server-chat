const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const listUsers = async (req, res = response) => {
	const fromPage = Number(req.query.fromPage);

	try {
		const list_users = await User.find()
			.find({ _id: { $ne: req.uid } })
			.skip(fromPage)
			.limit(20)
			.sort('-isOnline');

		res.json({
			INFO: {
				code: '00',
				descrip: 'TX_OK',
			},
			OUTPUT: list_users,
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
	listUsers,
};
