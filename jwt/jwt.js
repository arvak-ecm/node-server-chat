const jwt = require('jsonwebtoken');

const createJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};

		jwt.sign(
			payload,
			process.env.JWT_KEY,
			{
				expiresIn: '12h',
			},
			(err, token) => {
				if (err) {
					reject('error create token');
				} else {
					resolve(token);
				}
			}
		);
	});
};

const checkJWT = (token = '') => {
	try {
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		// req.uid = uid;
		return [true, uid];
	} catch (error) {
		return [false, null];
	}
};

module.exports = {
	createJWT,
	checkJWT,
};
