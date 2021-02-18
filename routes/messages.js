/*
	path: '/api/messages'
*/

const { Router, response } = require('express');
const { getHistoryMsg } = require('../controller/messages_controller');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/msghistory/:from', validateJWT, getHistoryMsg);

module.exports = router;
