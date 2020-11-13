const router = require('express').Router();
const { issueJwt } = require('../lib/utils');
const { authenticate } = require('../middlewares/auth');
const User = require('../models/User');
const upload = require('../lib/multer');
const cloudinary = require('../lib/cloudinary');

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

module.exports = router;
