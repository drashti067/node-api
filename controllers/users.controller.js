const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/users.model');




exports.addUsers = catchAsync(async (req, res, next) => {
    const data = req.body;
    console.log(data)
    const { mobile, password, email } = data;
    if(!mobile && !email) return next(new AppError('mobile number is required.', 400));
    if(password && password.length < 8) return next(new AppError('Password must be 8 digit long.', 400));
    if(password && password.length > 32) return next(new AppError('Password should not be longer than 32 digit.', 400));
	
    data.id = `USR-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;
    data.cart = data.cart || {};
	data.cart.id = `CRT-${+new Date()}-${parseInt(Math.random() * 1000000 + 1000000)}`;

    const user = await User.create(data);

    res.json({
        status: 'success',
        message: 'Document added successfully.',
        result: user
    });
});



