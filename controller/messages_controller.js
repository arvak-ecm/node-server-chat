const { response } = require('express');
const Message = require('../models/message');

const getHistoryMsg = async (req, res = response) => {
	const toUid = req.uid;
	const fromUid = req.params.from;
	const fromPage = Number(req.query.fromPage);

	try {
		const list_msg = await Message.find({
			$or: [
				{ to: toUid, from: fromUid },
				{ to: fromUid, from: toUid },
			],
		})
			.skip(fromPage)
			.limit(30)
			.sort({ createdAt: 'desc' });

		res.json({
			INFO: {
				code: '00',
				descrip: 'TX_OK',
			},
			OUTPUT: list_msg,
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
	getHistoryMsg,
};
