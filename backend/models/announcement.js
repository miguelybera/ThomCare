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
        course:{
            type: String,
            required: [true, 'Please enter course'],
            enum:{
                values:[
                    'Information Technology',
                    'Information Systems',
                    'Computer Science',
                    'All'
                ]
            }
        },
        createdAt: { //date created of data
            type: Date,
            default: Date.now(),
        },
        archiveDate:{
            type: Date,
            default: "3000-08-04T08:30:21.492Z"
        },
        isArchive:{
            type: Boolean,
            default: false
        }
})

/*announcementSchema.post("save", function(announcement, next ){
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
*/
module.exports = mongoose.model('Announcement', announcementSchema);