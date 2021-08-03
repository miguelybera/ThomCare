const User = require('../models/user');
const ErrorHandler =  require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendForgotPassword = require('../utils/sendForgotPassword');
const crypto = require('crypto');
 

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res,next) =>{
    const { email, password }= req.body;
    const user = await User.create({
        email,
        password
    })

    sendToken(user, 200, res)
})

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const { email, password }= req.body;
   
    //Checks if email and password is entered by user

    if(!email||!password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
})

// Logout => /api/v1/logout

exports.logout = catchAsyncErrors( async(req,res,next)=>{
    res.cookie('token', null, { 
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors( async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('Email does not exist', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false})

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset link is as follows:\n${resetUrl}\n\n
    If you have not requested this email, then ignore it`

    try{
        await sendForgotPassword({
            email: user.email,
            subject: 'ThomCare Password Recovery',
            message
        })
        res.status(200).json({
            success:true,
            message: `Email is now sent to ${user.email} please check your inbox or spam`
        })

    } catch(error){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false})
        return next(new ErrorHandler(error.message, 500))
    }


})

// Reset Password => /api/v1/password/reset/:token

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() }
    })
    if(!user){
        return next(new ErrorHandler('Password reset link is invalid or has expired'))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save();

    sendToken(user,200,res) // this will automatically login the user

})