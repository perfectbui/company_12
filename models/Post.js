const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
	userComment: {
		type: schema.Types.ObjectId,
		ref: 'User',
	},
	content: {
		type: String,
		required: true,
	},
	timeCreated: {
		type: Date,
		default: Date.now,
	},
});

const postSchema = new schema({
	userPost: {
		type: schema.Types.ObjectId,
		ref: 'User',
	},
	content: {
		type: String,
		required: true,
	},
	timeCreated: {
		type: Date,
		default: Date.now,
	},
	lastActive: {
		type: Date,
		default: Date.now,
	},
	likes: [
		{
			type: schema.Types.ObjectId,
			ref: 'User',
		},
	],
	comments: [commentSchema],
	retweets: [
		{
			type: schema.Types.ObjectId,
			ref: 'User',
		},
	],
	images: [
		{
			type: String,
		},
	],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
