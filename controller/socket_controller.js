const User = require('../models/user');

const userConect = async (uid = '') => {
	const user = await User.findById(uid);
	user.isOnline = true;
	await user.save();
	return user;
};

const userDisconect = async (uid = '') => {
	const user = await User.findById(uid);
	user.isOnline = false;
	await user.save();
	return user;
};

module.exports = {
	userConect,
	userDisconect,
};
