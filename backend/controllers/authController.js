const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


// Register a user => /api/v1/admin/register
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, middleName, lastName, email, password, role } = req.body;

    const studentNumber = '0000000000'
    const course = 'N/A'

    if (req.body.password !== req.body.confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    if ((req.body.email.substr(-10) !== "ust.edu.ph")) { // will change to ust.edu.ph only after development
        return next(new ErrorHandler('UST G Suite accounts are only allowed'))
    }

    const checkUser = await User.findOne({ email })
    if (checkUser) { return next(new ErrorHandler('Email account already exists', 404)); }

    const user = await User.create({
        firstName,
        middleName,
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
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by user
    if (!email || !password) { return next(new ErrorHandler('Please enter email & password', 400)) }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) { return next(new ErrorHandler('Invalid Email or Password', 401)); }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) { return next(new ErrorHandler('Invalid Email or Password', 401)); }

    sendToken(user, 200, res)
})

// Logout => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
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
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) { return next(new ErrorHandler('Email does not exist', 404)); }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // create reset password url
    const resetUrl = `${req.protocol}://${process.env.THOM_HOST}/password/reset/${resetToken}`

    const message = `<div style="width:100%!important;background-color:#ececec;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-family:HelveticaNeue,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ececec">
        <tbody>
            <tr style="border-collapse:collapse">
                <td align="center" bgcolor="#ececec" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                    <table width="640" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;margin-bottom:0;margin-right:10px;margin-left:10px">
                        <tbody>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="20" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>

                          <tr style="border-collapse:collapse;">
                                <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#8A0020" style="border-radius:6px 6px 0px 0px;background-color:#8A0020;color:#464646">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="350" valign="middle" align="left" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                </td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="255" valign="middle" align="right" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                    <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">

                                <td width="640" align="center" bgcolor="#8A0020" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                    <div align="center" style="text-align:center", "display: flex", "justify-content: center", "align-items: center">
                                        <a href="http://openweblife.createsend4.com/t/d-i-ftrgl-l-d/" target="_blank" style="font-size:36px; color:#fff; text-decoration:none; font-family:'calibri', arial, verdana; display:block; margin:20px 0 0;">
            <img style="max-width: 50px;" src="https://res.cloudinary.com/dwcxehcui/image/upload/v1630769727/logo/UST-Seal-College-of-Information-Computing-Sciences_ghtsuq.png" alt="logo">ThomCare 
                                        </a><br />
                                    </div>


                                </td>
                            </tr>

                            <tr style="border-collapse:collapse">
                                <td width="640" height="30" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table align="left" width="640" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                    <table width="580" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                    <p align="left" style="font-size:18px;line-height:24px;color:#8a0020;font-weight:bold;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">Reset Password   Link</p>
                                                                    <div align="left" style="font-size:13px;line-height:18px;color:#464646;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">
                                                                        <table border="0" cellpadding="5" cellspacing="0" width="100%" style="font-size:13px;font-family:'calibri',arial,verdana;line-height:1.4">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse">
                                                                                    <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                      Click <a href={${resetUrl}}>here</a> to reset your password. If you have not requested this email, then ignore it.
                                                                                    </td>
                                                                                   
                                                                                </tr>
                                                                              
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="580" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="15" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>

                            <tr style="border-collapse:collapse">
                                <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#043948" style="border-radius:0px 0px 6px 6px;background-color:#043948;color:#e2e2e2">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="360" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="360" height="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <img src="https://ci3.googleusercontent.com/proxy/1Bf6wZ9D4_9D4XK1CLH23Tl727SqwAxtj2mvfZ0Hn5vWCT0Zbtb6SSOSb-KYRCmmIUG5ITKLhN1d9n-rzhxQZKE=s0-d-e1-ft#https://createsend4.com/t/d-o-ftrgl-l/o.gif" width="1" height="1" border="0" alt="" style="min-height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important;outline-style:none;text-decoration:none;display:block">
</div>`

    try {
        await sendEmail({
            email: user.email,
            subject: 'ThomCare Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email is now sent to ${user.email} please check your inbox or spam`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }


})

// Reset Password => /api/v1/password/reset/:token

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) { return next(new ErrorHandler('Password reset link is invalid or has expired')) }

    if (req.body.password !== req.body.confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save();

    res.status(200).json({
        success: true,
        message: `Password has been updated`
    })

})

// Register a student => /api/v1/registerStudent
exports.registerStudent = catchAsyncErrors(async (req, res, next) => {

    const { firstName, middleName, lastName, studentNumber, course, email, password } = req.body;

    //for postman
    if ((firstName == null) || (firstName == '')) { return next(new ErrorHandler('Please enter first name')) }
    if ((lastName == null) || (lastName == '')) { return next(new ErrorHandler('Please enter last name')) }
    if ((studentNumber == null) || (studentNumber == '')) { return next(new ErrorHandler('Please enter student number')) }
    if ((course == null) || (course == '')) { return next(new ErrorHandler('Please enter course')) }
    if ((course !== 'Computer Science') && (course !== 'Information Technology') && (course !== 'Information Systems')) { return next(new ErrorHandler('Please enter the correct course')) }
    if ((email == null) || (email == '')) { return next(new ErrorHandler('Please enter email')) }
    if ((password == null) || (password == '')) { return next(new ErrorHandler('Please enter password')) }
    if (!(req.body.email.substr(-15) == "iics@ust.edu.ph" || req.body.email.substr(-15) == "cics@ust.edu.ph")) { return next(new ErrorHandler('UST G Suite accounts are only allowed')) }

    const user = await User.findOne({ email });

    if (user) { return next(new ErrorHandler('Email account already exists', 404)); }

    if (req.body.password !== req.body.confirmPassword) { return next(new ErrorHandler('Password does not match')) }

    const registerToken = jwt.sign({ firstName, middleName, lastName, studentNumber, course, email, password }, process.env.ACCOUNT_TOKEN, { expiresIn: process.env.REGISTER_EXPIRES });

    // create reset password url
    const verifyLink = `${req.protocol}://${process.env.THOM_HOST}/verify/account/${registerToken}`

    const message = `
    <div style="width:100%!important;background-color:#ececec;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-family:HelveticaNeue,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ececec">
        <tbody>
            <tr style="border-collapse:collapse">
                <td align="center" bgcolor="#ececec" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                    <table width="640" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;margin-bottom:0;margin-right:10px;margin-left:10px">
                        <tbody>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="20" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>

                          <tr style="border-collapse:collapse;">
                                <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#8A0020" style="border-radius:6px 6px 0px 0px;background-color:#8A0020;color:#464646">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="350" valign="middle" align="left" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                </td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="255" valign="middle" align="right" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                    <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">

                                <td width="640" align="center" bgcolor="#8A0020" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                    <div align="center" style="text-align:center", "display: flex", "justify-content: center", "align-items: center">
                                        <a href="http://openweblife.createsend4.com/t/d-i-ftrgl-l-d/" target="_blank" style="font-size:36px; color:#fff; text-decoration:none; font-family:'calibri', arial, verdana; display:block; margin:20px 0 0;">
            <img style="max-width: 50px;" src="https://res.cloudinary.com/dwcxehcui/image/upload/v1630769727/logo/UST-Seal-College-of-Information-Computing-Sciences_ghtsuq.png" alt="logo">ThomCare 
                                        </a><br />
                                    </div>


                                </td>
                            </tr>

                            <tr style="border-collapse:collapse">
                                <td width="640" height="30" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table align="left" width="640" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                    <table width="580" cellpadding="0" cellspacing="0" border="0">
                                                        <tbody>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                    <p align="left" style="font-size:18px;line-height:24px;color:#8a0020;font-weight:bold;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">Verification Link</p>
                                                                    <div align="left" style="font-size:13px;line-height:18px;color:#464646;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">
                                                                        <table border="0" cellpadding="5" cellspacing="0" width="100%" style="font-size:13px;font-family:'calibri',arial,verdana;line-height:1.4">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse">
                                                                                    <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                      Click <a href=${verifyLink}>here</a> to finish your registration. If you have not requested this email, then ignore it.
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="border-collapse:collapse">
                                                                <td width="580" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="15" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>

                            <tr style="border-collapse:collapse">
                                <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                    <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#043948" style="border-radius:0px 0px 6px 6px;background-color:#043948;color:#e2e2e2">
                                        <tbody>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="360" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                            <tr style="border-collapse:collapse">
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="360" height="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td width="640" height="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <img src="https://ci3.googleusercontent.com/proxy/1Bf6wZ9D4_9D4XK1CLH23Tl727SqwAxtj2mvfZ0Hn5vWCT0Zbtb6SSOSb-KYRCmmIUG5ITKLhN1d9n-rzhxQZKE=s0-d-e1-ft#https://createsend4.com/t/d-o-ftrgl-l/o.gif" width="1" height="1" border="0" alt="" style="min-height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important;outline-style:none;text-decoration:none;display:block">
</div>
`

    try {
        await sendEmail({
            email: email,
            subject: 'ThomCare Account Verification',
            message
        })

        res.status(200).json({
            success: true,
            message: `Account verification link is now sent to ${email} please check your inbox or spam`
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// Activate Student Account => /api/v1/verify/account/:token
exports.verifyStudent = catchAsyncErrors(async (req, res, next) => {
    const token = req.params.token;

    if (token) {
        jwt.verify(token, process.env.ACCOUNT_TOKEN, function (err, decodedToken) {
            if (err) { return next(new ErrorHandler('Token is invalid or expired')) }
            const { firstName, middleName, lastName, studentNumber, course, email, password } = decodedToken;

            User.findOne({ email }).exec((err, existingUser) => {
                if (existingUser) { return next(new ErrorHandler('Email already exists')) }
                const user = User.create({
                    firstName,
                    middleName,
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
        })
    } else {
        return next(new ErrorHandler('Token is invalid or expired'))
    }
})

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update or Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    //Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if (!isMatched) { return next(new ErrorHandler('Old password is incorrect')) }
    if (req.body.password !== req.body.confirmPassword) { return next(new ErrorHandler('Password and Confirm Password does not match')) }

    user.password = req.body.password

    await user.save()
    sendToken(user, 200, res)
})

// Update profile => /api/v1/admin/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    //const newUserData = { role: req.body.role }
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

// Get all users admin => /api/v1/admin/users
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})

// Get a user => /api/v1/admin/user/:id
exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const singleUser = await User.findById(req.params.id)

    if (!singleUser) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }
    res.status(200).json({
        success: true,
        singleUser
    })
})

// Update other user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHandler(`User not found with this id:(${req.params.id})`)) }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User has been deleted"
    })
})

// Get all student accounts dept chair => /api/v1/deptchair/users
exports.getStudentAccounts = catchAsyncErrors(async (req, res, next) => {
    let deptCourse = ''

    switch (req.user.role) {
        case 'IT Dept Chair':
            deptCourse = 'Information Technology'
            break
        case 'IS Dept Chair':
            deptCourse = 'Information Systems'
            break
        case 'CS Dept Chair':
            deptCourse = 'Computer Science'
            break
        case 'CICS Staff':
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }
    const users = await User.find({ role: 'Student', course: deptCourse })

    res.status(200).json({
        success: true,
        count: users.length,
        users
    })
})