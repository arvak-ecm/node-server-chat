const User = require('../models/user');
const Message = require('../models/message');

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

const saveMsg = async (payload) => {
	/* payload
		{
 			from: '',
  		to: '',
  		msg: ''
		}
	*/

	try {
		const msg = new Message(payload);
		await msg.save();
	} catch (err) {
		return false;
	}
};

module.exports = {
	userConect,
	userDisconect,
	saveMsg,
};
