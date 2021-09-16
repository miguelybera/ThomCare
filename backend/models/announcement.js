const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter announcement title'],
        trim: true, //deletes spaces in start and end
    },
    description: {
        type: String,
        required: [true, 'Please enter announcement description'],
        trim: true, //deletes spaces in start and end
    },
    course: {
        type: String,
        required: [true, 'Please enter course'],
        enum: {
            values: [
                'Information Technology',
                'Information Systems',
                'Computer Science',
                'All'
            ]
        },
        default: 'All'
    },
    yearLevel: {
        type: String,
        required: [true, 'Please enter Year Level'],
        enum: {
            values: [
                '1st Year',
                '2nd Year',
                '3rd Year',
                '4th Year',
                'All'
            ]
        },
        default: 'All'
    },
    track: {
        type: String,
        required: [true, 'Please enter Track'],
        enum: {
            values: [
                'Core Computer Science',
                'Game Development',
                'Data Science',
                'Network and Security',
                'Web and Mobile App Development',
                'IT Automation',
                'Business Analytics',
                'Service Management',
                'All'
            ]
        },
        default: 'All'
    },
    createdAt: { //date created of data
        type: Date
    },
    archiveDate: {
        type: Date,
        default: "3000-08-04T08:30:21.492Z"
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    fileAttachments: {
        type: Array
    },
    announcementType: {
        type: String,
        required: true
    },
    setExpiry: {
        type: Boolean,
        required: true,
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

module.exports = mongoose.model('Announcement', announcementSchema)