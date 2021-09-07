const mongoose = require('mongoose')
const announcementTypeSchema = new mongoose.Schema({
    announcementCategory: {
        type: String,
        required: [true, 'Please enter announcement type'],
        trim: true,
        unique: true
    }
})

module.exports = mongoose.model('AnnouncementType', announcementTypeSchema)