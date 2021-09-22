const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the form name']
    },
    description: {
        type: String,
        default: ''
    },
    attachments: {
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