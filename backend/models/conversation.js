const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    receiverName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema)