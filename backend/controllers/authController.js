const User = require('../models/user');
const ErrorHandler =  require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendForgotPassword = require('../utils/sendForgotPassword');
const sendRegisterVerification = require('../utils/sendForgotPassword');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
 

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res,next) =>{
    const { email, password }= req.body;
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }
    const user = await User.create({
        email,
        password
    })

    res.status(201).json({
        success: true,
        message: "User has been registered",
        user
    })
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

    res.status(200).json({
        success:true,
        message: `Password has been updated`
    }) 

})

// Register a student => /api/v1/registerStudent
exports.registerStudent = catchAsyncErrors(async (req, res,next) =>{
    const { email, password }= req.body;
    const user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler('Email Account already exists', 404));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }
    const registerToken = jwt.sign({email, password}, process.env.ACCOUNT_TOKEN, {expiresIn: process.env.REGISTER_EXPIRES});

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/verify/account/${registerToken}`

    const message = `Your Account Verification link is as follows:\n${resetUrl}\n\n
    If you have not requested this email, then ignore it`

    try{
        await sendRegisterVerification({
            email: email,
            subject: 'ThomCare Account Verification',
            message
        })
        res.status(200).json({
            success:true,
            message: `Account Verification Email is now sent to ${email} please check your inbox or spam`
        })

    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

// Activate Student Account => /api/v1/verify/account/:token
exports.verifyStudent = catchAsyncErrors(async (req, res,next) =>{
    const token = req.params.token;
    if(token){
        jwt.verify(token, process.env.ACCOUNT_TOKEN, function(err, decodedToken){
            if(err){
                return next(new ErrorHandler('Token is invalid or expired'))
            }
            const {email, password} = decodedToken;
            const user = User.create({
                email,
                password
            })
        
            res.status(201).json({
                success: true,
                message: "User has been registered"
            })
            
        })
        

    }else{
        return next(new ErrorHandler('Token is invalid or expired'))
    }

})