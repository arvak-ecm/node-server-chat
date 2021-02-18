const { Schema, model } = require('mongoose');

const MsgSchema = Schema(
	{
		from: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
		to: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
		msg: { type: String, require: true },
	},
	{
		timestamps: true,
	}
);

MsgSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.uid = _id;
	return object;
});

module.exports = model('Message', MsgSchema);
