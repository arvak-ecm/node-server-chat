const { validationResult } = require("express-validator");

const validateParams = (req, res, next) => {
	const err = validationResult(req);

	if (!err.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: err.mapped(),
		});
	}

	next();
};

module.exports = { validateParams };
