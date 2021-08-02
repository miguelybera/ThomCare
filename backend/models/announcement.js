const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
    
        title: {
            type: String,
            required: [true, 'Please enter announcement title'],
            trim: true, //deletes spaces in start and end
        },
        description:{
            type: String,
            required: [true, 'Please enter announcement description'],
            trim: true, //deletes spaces in start and end
        },
        createdAt: { //date created of data
            type: Date,
            default: Date.now(),
        },
        archiveDate:{
            type: Date
        }
})

module.exports = mongoose.model('Announcement', announcementSchema);