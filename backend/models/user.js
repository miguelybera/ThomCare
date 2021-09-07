const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    middleName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    studentNumber: {
        type: String,
        required: [true, 'Please enter your student number']
    },
    course: {
        type: String,
        required: [true, 'Please enter request course'],
        enum: {
            values: [
                'Computer Science',
                'Information Technology',
                'Information Systems',
                'N/A'
            ]
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        select: false
    },
    role: {
        type: String,
        required: [true, 'Please enter role'],
        enum: {
            values: [
                'Student',
                'CICS Staff',
                'IT Dept Chair',
                'IS Dept Chair',
                'CS Dept Chair'
            ]
        },
        default: 'Student'

    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('User', userSchema)