/*
	path: '/api/login'
*/

const { Router, response } = require("express");
const { check } = require("express-validator");
const {
	createdUser,
	login,
	renewJWT,
} = require("../controller/auth_controller");
const { validateParams } = require("../middlewares/validate_params");
const { validateJWT } = require("../middlewares/validate_jwt");

const router = Router();

router.post(
	"/newUser",
	[
		check("name", "Invalid value").not().isEmpty(),
		check("email", "Invalid value").isEmail(),
		check("password", "Invalid value").not().isEmpty(),
		validateParams,
	],
	createdUser
);

router.post(
	"",
	[
		check("email", "Invalid value").isEmail(),
		check("password", "Invalid value").not().isEmpty(),
		validateParams,
	],
	login
);

router.get("/renewJWT", validateJWT, renewJWT);

module.exports = router;
