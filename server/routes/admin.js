const User = require('../models/User');
const router = require('express').Router();

router.get('/user', async (req, res) => {
	const cac = await User.find({});
	res.status(200).json(cac);
});

module.exports = router;
