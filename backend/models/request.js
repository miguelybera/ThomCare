const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    trackingNumber:{
        type: String,
        required: true,
        unique: true
    },
    requestType:{
        type: String,
        required: [true, 'Please enter request type'],
        enum:{
            values:[
                'Adding/Dropping of Course',
                'Cross Enrollment within CICS',
                'Request for Petition Classes within CICS',
                'Request for Crediting of Courses',
                'Request for Overload',
                'Others'
            ]
        }
    },
    requestedById:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    requestStatus:{
        type: String,
        required: [true, 'Please enter request status'],
        enum:{
            values:[
                'Pending',
                'Processing',
                'Denied',
                'Approved'
            ]
        },
        default: 'Pending'
    },
    managedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    requestorFirstName:{
        type: String,
        required: [true, 'Requestor First Name required']
    },
    requestorLastName:{
        type: String,
        required: [true, 'Requestor Last Name required']
    },
    requestorStudentNumber:{
        type: String,
        required: [true, 'Requestor Last Name required']
    },
    requestorEmail:{
        type: String,
        required: [true, 'Requestor Email required']
    },
    requestorYearLevel:{
        type: String,
        required: [true, 'Requestor year level required'],
        enum:{
            values:[
                '1st Year',
                '2nd Year',
                '3rd Year',
                '4th Year',
                'Irregular',
                'Alumni'
            ]
        }
    },
    requestorSection:{
        type: String,
        required: [true, 'Requestor Section required']
    },
    requestorCourse:{
        type: String,
        required: [true, 'Please enter request course'],
        enum:{
            values:[
                'Computer Science',
                'Information Technology',
                'Information Systems'
            ]
        }
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    remarks:[{
        dateOfRemark:{
            type: Date,
            required: true,
            default: Date.now()
        },
        updatedStatus:{
            type: String,
            required: true
        },
        userUpdated:{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        remarksMessage:{
            type: String
        }

    }],
    fileRequirements:{
        type:Array,
        required: [true, 'Please attach required documents']
    },
    returningFiles:{
        type: Array
    },
    requestorNotes:{
        type: String
    }

})

module.exports = mongoose.model('Request', requestSchema);