const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');
const upload = require('../lib/multer');
const cloudinary = require('../lib/cloudinary');

router.get('/', async (req, res) => {
	let allPost = await Post.find({})
		.sort({ lastActive: -1 })
		.limit(3)
		.populate('userPost', 'name username avatar')
		.populate('comments.userComment', 'name username avatar');

	res.status(200).json(allPost);
});

router.get('/:postPerScroll/:postSkip', authenticate, async (req, res) => {
	try {
		const { postPerScroll, postSkip } = req.params;

		const allPosts = await Post.find(
			{},
			'userPost content timeCreated likes comments retweets images'
		)
			.sort({ lastActive: -1 })
			.skip(+postSkip)
			.limit(+postPerScroll)
			.populate('userPost', 'name username avatar')
			.populate('comments.userComment', 'name username avatar');

		res.status(200).json(allPosts);
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.post(
	'/uploadImg',
	authenticate,
	upload.single('image'),
	async (req, res) => {
		try {
			const result = await cloudinary.uploader.upload(req.file.path);
			console.log(req.file.path);
			let resultUrl = result.url;
			if (result.width > 550) {
				const image = result.url.split('/kh1em/')[1];
				resultUrl = cloudinary.url(image, {
					width: 550,
					crop: 'fill',
				});
			}

			res.status(200).json({
				imageUrl: resultUrl,
			});
		} catch (error) {
			console.log('Error : ', error);
			res.status(500).json({
				message: error,
			});
		}
	}
);

router.post('/', authenticate, async (req, res) => {
	try {
		const userId = req.decoded._id;
		const { content, images, _id } = req.body;

		const imagesToAdd = JSON.parse(images);

		const newPost = new Post({
			_id,
			userPost: userId,
			content,
			images: imagesToAdd,
		});
		await newPost.save();

		await User.findByIdAndUpdate(userId, {
			$push: {
				wallPosts: newPost._id,
			},
		});

		res.status(200).json({
			newPostId: newPost._id,
		});
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.post('/comment', authenticate, async (req, res) => {
	try {
		const userId = req.decoded._id;
		const { postId, content } = req.body;
		const commentId = new mongoose.Types.ObjectId();

		await Post.findByIdAndUpdate(postId, {
			lastActive: Date.now(),
			$push: {
				comments: {
					$each: [
						{
							_id: commentId,
							userComment: userId,
							content,
						},
					],
					$sort: { timeCreated: -1 },
				},
			},
		});

		res.status(200).json({
			newCommentId: commentId,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			message: err,
		});
	}
});

router.post('/like', authenticate, async (req, res) => {
	try {
		const userId = req.decoded._id;
		const { postId } = req.body;

		await Post.findByIdAndUpdate(postId, {
			lastActive: Date.now(),
			$push: { likes: userId },
		});

		res.status(200).end();
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.post('/unlike', authenticate, async (req, res) => {
	try {
		const userId = req.decoded._id;
		const { postId } = req.body;

		await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });

		res.status(200).end();
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.post('/retweet', authenticate, async (req, res) => {
	try {
		const userId = req.decoded._id;
		const { postId } = req.body;
		await Post.findByIdAndUpdate(postId, { $push: { retweets: userId } });
		await User.findByIdAndUpdate(userId, { $push: { wallPosts: postId } });
		res.status(200).end();
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.delete('/:postId', authenticate, async (req, res) => {
	try {
		const { postId } = req.params;
		const post = await Post.findById(postId, 'userPost');
		if (post.userPost.toString() === req.decoded._id) {
			await Post.deleteOne({ _id: postId });
			res.status(200).end();
		} else {
			res.status(401).json({
				message: 'Không có quyền xóa bài đăng',
			});
		}
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.delete('/comment/:postId/:commentId', authenticate, async (req, res) => {
	try {
		const { commentId, postId } = req.params;

		const postUpdated = await Post.findById(postId);

		const commentDeleteIndex = postUpdated.comments.findIndex(
			(cmt) => cmt._id.toString() === commentId
		);

		// Chỉ xóa được comment ở trong bài viết của mình | hoặc comment do chính mình đăng
		if (
			postUpdated.userPost.toString() === req.decoded._id ||
			postUpdated.comments[commentDeleteIndex].userComment.toString() ===
				req.decoded._id
		) {
			postUpdated.comments.splice(commentDeleteIndex, 1);
			await postUpdated.save();
			res.status(200).end();
		} else {
			res.status(401).json({
				message: 'Không có quyền xóa bài đăng',
			});
		}
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

router.delete('/', async (req, res) => {
	await Post.deleteMany({});
	res.end();
});

module.exports = router;
