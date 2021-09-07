const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    formName: {
        type: String,
        required: [true, 'Please enter the form name']
    },
    formDescription: {
        type: String,
        default: ''
    },
    formFiles: {
        type: Array,
        required: [true, 'Please attach form/s']
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Form', formSchema)