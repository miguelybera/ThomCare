const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
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
    }

})

module.exports = mongoose.model('Request', requestSchema);