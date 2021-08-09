const User = require('../models/user');
const ErrorHandler =  require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendForgotPassword = require('../utils/sendForgotPassword');
const sendRegisterVerification = require('../utils/sendForgotPassword');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
 

// Register a user => /api/v1/admin/register
exports.registerUser = catchAsyncErrors(async (req, res,next) =>{
    const { firstName, lastName, email, password}= req.body;
    req.body.studentNumber = '0000000000',
    req.body.course = 'N/A'
    req.body.role = 'CICS Staff'
    const role = req.body.role 
    const studentNumber = req.body.studentNumber
    const course = req.body.course
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }
    if((req.body.email.substr(-15) !== "iics@ust.edu.ph")||req.body.email.substr(-15) !== "cics@ust.edu.ph"){ // will change to ust.edu.ph only after development
        return next(new ErrorHandler('UST GSuite accounts are only allowed'))
    }
    const user = await User.create({
        firstName,
        lastName,
        studentNumber,
        course,
        email,
        password,
        role
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
exports.registerStudent = catchAsyncErrors(async (req, res,next) => {
    
    const { firstName, lastName, studentNumber, course, email, password } = req.body;

    if((firstName == null)||(firstName == '')){
        return next(new ErrorHandler('Please enter first name'))
    }

    if((lastName == null)||(lastName == '')){
        return next(new ErrorHandler('Please enter last name'))
    }
    
    if((studentNumber == null)||(studentNumber == '')){
        return next(new ErrorHandler('Please enter student number'))
    }

    if((course == null)||(course == '')){
        return next(new ErrorHandler('Please enter course'))
    }

    if((course !== 'Computer Science')&&(course !== 'Information Technology')&&(course !== 'Information Systems')){
        return next(new ErrorHandler('Please enter the correct course'))
    }

    if((email == null)||(email == '')){
        return next(new ErrorHandler('Please enter email'))
    }

    if((password == null)||(password == '')){
        return next(new ErrorHandler('Please enter password'))
    }

    if(req.body.email.substr(-15) == "iics@ust.edu.ph" || req.body.email.substr(-15) == "cics@ust.edu.ph" ){
        
    } else {
        return next(new ErrorHandler('UST G Suite accounts are only allowed'))
    }

    const user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler('Email account already exists', 404));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match'))
    }

    const registerToken = jwt.sign({firstName, lastName, studentNumber, course, email, password}, process.env.ACCOUNT_TOKEN, {expiresIn: process.env.REGISTER_EXPIRES});

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/verify/account/${registerToken}`

    const message = `Your account verification link is as follows:\n${resetUrl}\n\n
    If you have not requested this email, please ignore it.`

    try{
        await sendRegisterVerification({
            email: email,
            subject: 'ThomCare Account Verification',
            message
        })

        res.status(200).json({
            success: true,
            message: `Account verification link is now sent to ${email} please check your inbox or spam`
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
            const {firstName, lastName, studentNumber, course, email, password} = decodedToken;
            const user = User.create({
                firstName,
                lastName,
                studentNumber,
                course,
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

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update or Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    //Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect'));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password and Confirm Password does not match'))
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user,200,res)
})

// Update profile => /api/v1/admin/me/update
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        role : req.body.role
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

// Get all users admin => /api/v1/admin/allUsers
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        count:users.length,
        users
    })
})

// Get a user => /api/v1/admin/user/:id
exports.getUser = catchAsyncErrors(async(req,res,next)=>{
    const singleUser = await User.findById(req.params.id);
    
    if(!singleUser){
        return next(new ErrorHandler(`User not found with this id:(${req.params.id})`));
    }
    res.status(200).json({
        success: true,
        singleUser
    })
})

// Update other user profile => /api/v1/admin/user/:id
exports.updateUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        role : req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

// Delete other user profile => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this id:(${req.params.id})`));
    }
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User has been deleted"
    })
})

// Get a user => /api/v1/chat/user/:id
exports.getUserChat = catchAsyncErrors(async(req,res,next)=>{
    const singleUser = await User.findById(req.params.id);
    
    if(!singleUser){
        return next(new ErrorHandler(`User not found with this id:(${req.params.id})`));
    }
    res.status(200).json({
        success: true,
        singleUser
    })
})


// Get all users for chat => /api/v1/chat/allUsers
exports.getAllUserChat = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        count:users.length,
        users
    })
})