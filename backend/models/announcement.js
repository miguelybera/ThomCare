const mongoose = require('mongoose');
const cron = require("node-cron");
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
        },
        isArchive:{
            type: Boolean,
            default: false
        }
})

announcementSchema.post("save", function(announcement, next ){
    cron.schedule('* * * * *', 
    async function() { 
        const dateToday = Date.now();
        if(announcement.archiveDate.valueOf() <= dateToday.valueOf() ){
            const result = await mongoose.model("Announcement")
            .update({ "_id" : announcement._id}, {$set: {isArchive:true}});

            if(result.nModified===1){
                console.log("isArchive set to true for", announcement.title);
            }
        }     
}
);
    next ();
});
module.exports = mongoose.model('Announcement', announcementSchema);