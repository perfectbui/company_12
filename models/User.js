const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	name: {
		type: String,
	},
	username: {
		type: String,
		required: true,
	},
	bigAvatar: {
		type: String,
		default:
			'https://res.cloudinary.com/kh1em/image/upload/c_fill,h_150,w_150/v1602734766/uo0olap16ototuucubrg.png',
	},
	avatar: {
		type: String,
		default:
			'http://res.cloudinary.com/kh1em/image/upload/c_fill,h_55,w_55/v1602734766/uo0olap16ototuucubrg.png',
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	lastActive: {
		type: Date,
		default: Date.now,
	},
	wallPosts: [
		{
			type: schema.Types.ObjectId,
			ref: 'Post',
		},
	],
	bio: String,
	phone: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
