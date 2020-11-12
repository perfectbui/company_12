const router = require('express').Router();
const { issueJwt } = require('../lib/utils');
const { authenticate } = require('../middlewares/auth');
const User = require('../models/User');
const upload = require('../lib/multer');
const cloudinary = require('../lib/cloudinary');
const { redis_client } = require('../lib/redis');
const { checkCacheUser } = require('../middlewares/checkCache');

router.post(
	'/:username/edit/uploadAvatar',
	authenticate,
	upload.single('image'),
	async (req, res) => {
		try {
			const result = await cloudinary.uploader.upload(req.file.path);
			let resultUrl = result.url;

			const image = result.url.split('/kh1em/')[1];
			bigAvatar = cloudinary.url(image, {
				width: 150,
				height: 150,
			});

			avatar = cloudinary.url(image, {
				width: 55,
				height: 55,
			});

			const newUser = await User.findByIdAndUpdate(
				req.decoded._id,
				{
					avatar,
					bigAvatar,
				},
				{ new: true }
			);

			issueJwt(newUser, res);

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

router.get('/:username', checkCacheUser, async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne(
			{ username },
			'name username bigAvatar avatar wallPosts bio phone'
		)
			.populate({
				path: 'wallPosts',
				populate: {
					path: 'userPost',
					model: 'User',
					select: 'name username avatar',
				},
			})
			.populate({
				path: 'wallPosts',
				populate: {
					path: 'comments.userComment',
					model: 'User',
					select: 'name username avatar',
				},
				options: { sort: { timeCreated: -1 } },
			});

		if (user === null) {
			res.status(404).json({
				message: 'Tài khoản không tồn tại',
			});
		}

		/* const infoUserCache = {
			_id: user._id,
			name: user.name,
			username: user.username,
			avatar: user.avatar,
			bigAvatar: user.bigAvatar,
			bio: user.bio,
			phone: user.phone,
		};

		redis_client.setex(username, 3600, JSON.stringify(infoUserCache)); */
		res.status(200).json({
			user,
		});
	} catch (error) {
		res.status(404).json({
			message: 'Có lỗi khi tìm kiếm user',
		});
	}
});

router.post('/:username/edit', authenticate, async (req, res) => {
	try {
		const { username } = req.params;
		if (username !== req.decoded.username) {
			throw new Error('Khong co quyen chinh sua');
		}

		const { name, bio, phone } = req.body;

		const newUser = await User.findByIdAndUpdate(
			req.decoded._id,
			{
				name: name ? name : req.decoded.name,
				bio: bio ? bio : req.decoded.bio,
				phone: phone ? phone : req.decoded.phone,
			},
			{ new: true }
		);

		issueJwt(newUser, res);

		res.status(200).end();
	} catch (error) {
		console.log('Error : ', error);
		res.status(401).json({
			message: error,
		});
	}
});

module.exports = router;
