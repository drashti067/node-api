// require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync'	);
const AppError = require('../utils/appError');
const User = require('../models/users.model');
const { encrypt } = require('../utils/crypto');

exports.login = catchAsync(async (req, res, next) => {
	const {mobile} = req.body;

	if(!mobile) return next(new AppError("mobile number is required"));
	const user = await User.findOne({mobile});
	if(!user) return next(new AppError("Invalid mobile number."));

	if(user.role === 'administrator') return next(new AppError("Invalid mobile number."));

	let token = jwt.sign({ id: user.mobile }, process.env.JWT_SECRET, {expiresIn: "21d"});

	token = encrypt(token);

	res.cookie("cwtct", token, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20), //20 Days
		// httpOnly: true,
		// secure: process.env.NODE_ENV !== "development",
		// sameSite: 'none'
	});

	res.json({
		status: 'success',
		message: 'login in success',
		token,
		result: user
	});
});

