/*
	path: '/api/users'
*/

const { Router, response } = require('express');
const { listUsers } = require('../controller/users_controller');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/listusers', validateJWT, listUsers);

module.exports = router;
