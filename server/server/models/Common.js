const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commonSchema = new schema({
	listUserOnline: [
		{
			type: schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const Common = mongoose.model('Common', commonSchema);
module.exports = Common;
