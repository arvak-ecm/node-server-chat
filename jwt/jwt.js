const jwt = require("jsonwebtoken");

const createJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};

		jwt.sign(
			payload,
			process.env.JWT_KEY,
			{
				expiresIn: "12h",
			},
			(err, token) => {
				if (err) {
					reject("error create token");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	createJWT,
};
