const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please enter course code']
    },
    courseName: {
        type: String,
        trim: true,
        required: [true, 'Please enter course name']
    },
    lecUnits: {
        type: String,
        trim: true,
        required: [true, 'Please enter lec units'],
        default: '0'
    },
    labUnits: {
        type: String,
        trim: true,
        required: [true, 'Please enter lab units'],
        default: '0'
    }
})

module.exports = mongoose.model('Course', courseSchema)