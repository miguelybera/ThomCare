const Request = require('../models/request');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendEmail = require('../utils/sendEmail');
const Audit = require('../models/audit');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env'});


const conn = mongoose.connection;

let gfs;
conn.once('open', () =>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('fileStorage');
})

const requestTypeOfficeStaff = ['Request for Certificate of Grades', 'Request for Course Description', 'Others'];

// Submit new request => /api/v1/submitRequest
exports.submitRequest = catchAsyncErrors(async (req, res, next) => {
    const { requestType, requestorYearLevel, requestorSection, requestorNotes } = req.body

    const fileRequirements = req.files

    if (fileRequirements == null || fileRequirements == '') { return next(new ErrorHandler('Please Attach required file/s')) }

    let trackStart = ''

    switch (requestType) {
        case "Adding/Dropping of Course":
            trackStart = '1'
            break
        case "Cross Enrollment within CICS":
            trackStart = '2'
            break
        case "Request for Petition Classes within CICS":
            trackStart = '3'
            break
        case "Request for Crediting of Courses":
            trackStart = '4'
            break
        case "Request for Overload":
            trackStart = '5'
            break
        case "Request for late enrollment":
            trackStart = '6'
            break
        case "Request for manual enrollment":
            trackStart = '7'
            break
        case "Others":
            trackStart = '8'
            break
    }

    const trackingNumber = trackStart + req.user.studentNumber + Date.now()
    const requestedById = req.user.id
    const requestorFirstName = req.user.firstName
    const requestorLastName = req.user.lastName
    const requestorStudentNumber = req.user.studentNumber
    const requestorEmail = req.user.email
    const requestorCourse = req.user.course

    const request = await Request.create({
        requestType,
        requestorYearLevel,
        requestorSection,
        requestedById,
        requestorFirstName,
        requestorLastName,
        requestorStudentNumber,
        requestorEmail,
        trackingNumber,
        requestorCourse,
        fileRequirements,
        requestorNotes
    })
    res.status(201).json({
        success: true,
        request
    })
})

// Get all user submitted request => /api/v1/myRequests
exports.myRequests = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Request.find({ requestedById: req.user.id }).sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await apiFeatures.query

    res.status(200).json({
        success: true,
        requests
    })
})

// Get all requests involving specific department chair => /api/v1/deptChair/requests
exports.getAllRequestsDeptChair = catchAsyncErrors(async (req, res, next) => {
    let deptCourse = ''

    switch (req.user.role) {
        case 'IT Dept Chair':
            deptCourse = 'Information Technology'
            break
        case 'IS Dept Chair':
            deptCourse = 'Information Systems'
            break
        case 'CS Dept Chair':
            deptCourse = 'Computer Science'
            break
        case 'CICS Staff':
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    const apiFeatures = new APIFeatures(Request.find({ requestorCourse: deptCourse, isTrash: false, requestType: { $nin: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesPending = new APIFeatures(Request.find({ requestorCourse: deptCourse, requestStatus: 'Pending', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesProcessing = new APIFeatures(Request.find({ requestorCourse: deptCourse, requestStatus: 'Processing', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesApproved = new APIFeatures(Request.find({ requestorCourse: deptCourse, requestStatus: 'Approved', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesDenied = new APIFeatures(Request.find({ requestorCourse: deptCourse, requestStatus: 'Denied', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()

    const requests = await apiFeatures.query
    const pendingRequests = await apiFeaturesPending.query
    const processingRequests = await apiFeaturesProcessing.query
    const approvedRequests = await apiFeaturesApproved.query
    const deniedRequests = await apiFeaturesDenied.query

    res.status(200).json({
        success: true,
        requests,
        pendingRequests,
        processingRequests,
        approvedRequests,
        deniedRequests
    })
})


// Get all requests cics staff side => /api/v1/cicsAdmin/requests
exports.getAllRequestsStaff = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Request.find().sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesPending = new APIFeatures(Request.find({ requestStatus: 'Pending', isTrash: false }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesProcessing = new APIFeatures(Request.find({ requestStatus: 'Processing', isTrash: false }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesApproved = new APIFeatures(Request.find({ requestStatus: 'Approved', isTrash: false }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesDenied = new APIFeatures(Request.find({ requestStatus: 'Denied', isTrash: false }).sort({ createdAt: -1 }), req.query).searchRequests().filter()

    const requests = await apiFeatures.query;
    const pendingRequests = await apiFeaturesPending.query;
    const processingRequests = await apiFeaturesProcessing.query;
    const approvedRequests = await apiFeaturesApproved.query;
    const deniedRequests = await apiFeaturesDenied.query;

    res.status(200).json({
        success: true,
        requests,
        pendingRequests,
        processingRequests,
        approvedRequests,
        deniedRequests

    })
})

// Get requests that are handled by the office only => /api/v1/cicsAdmin/officeRequests
exports.getAllOfficeRequests = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Request.find({ isTrash: false, requestType: { $in: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesPending = new APIFeatures(Request.find({ requestStatus: 'Pending', isTrash: false, requestType: { $in: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesProcessing = new APIFeatures(Request.find({ requestStatus: 'Processing', isTrash: false, requestType: { $in: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesApproved = new APIFeatures(Request.find({ requestStatus: 'Approved', isTrash: false, requestType: { $in: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesDenied = new APIFeatures(Request.find({ requestStatus: 'Denied', isTrash: false, requestType: { $in: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()

    const requests = await apiFeatures.query;
    const pendingRequests = await apiFeaturesPending.query;
    const processingRequests = await apiFeaturesProcessing.query;
    const approvedRequests = await apiFeaturesApproved.query;
    const deniedRequests = await apiFeaturesDenied.query;

    res.status(200).json({
        success: true,
        requests,
        pendingRequests,
        processingRequests,
        approvedRequests,
        deniedRequests
    })
})

// Get single request => /api/v1/request/:requestId
exports.getSingleRequest = catchAsyncErrors(async (req, res, next) => {
    const request = await Request.findById(req.params.requestId);
   

    if (!request) { return next(new ErrorHandler('Request Id does not exist')) }

    res.status(200).json({
        success: true,
        request

    })

})

// Update request   => /api/v1/admin/updateRequest/:requestId
exports.updateRequest = catchAsyncErrors(async (req, res, next) => {
    let deptCourse = ''

    switch (req.user.role) {
        case 'IT Dept Chair':
            deptCourse = 'Information Technology'
            break
        case 'IS Dept Chair':
            deptCourse = 'Information Systems'
            break
        case 'CS Dept Chair':
            deptCourse = 'Computer Science'
            break
        case 'CICS Staff':
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    const rqst = await Request.findById(req.params.requestId)
    if (rqst.requestorCourse !== deptCourse) { return next(new ErrorHandler('Role does not have access to this resource')) }

    let newRequestData = {
        requestStatus: req.body.requestStatus,
        managedBy: req.user.id,
        returningFiles: req.files
    }

    if (req.files == null || req.files == '') {
        newRequestData = {
            requestStatus: req.body.requestStatus,
            managedBy: req.user.id
        }
    }

    const request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (req.body.remarksMessage == null) { req.body.remarksMessage = '' }
    
    let remarksData = {
        dateOfRemark: new Date(Date.now()),
        updatedStatus: req.body.requestStatus,
        userUpdated: req.user.firstName + ' ' + req.user.lastName,
        remarksMessage: req.body.remarksMessage
    }

    Request.findOneAndUpdate(
        { _id: req.params.requestId },
        { $push: { remarks: remarksData } },
        { useFindAndModify: false }
    ).exec()

    const auditLog = await Audit.create({
        userAudit: req.user.email,
        requestAudit: req.params.requestId,
        actionAudit: `User account: (${req.user.email}) has updated the status of request with the tracking number: (${request.trackingNumber}) \n Current Status: ${req.body.requestStatus}`
    })


    const message = `Request with tracking number: ${rqst.trackingNumber} \n \n Current Status: ${request.requestStatus}`

    try {
        await sendEmail({
            email: rqst.requestorEmail,
            subject: `Status update for request tracking number (${rqst.trackingNumber})`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Status has been updated and student has been notified`
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// Delete request   => /api/v1/deleteRequest/:requestId
exports.deleteRequest = catchAsyncErrors(async (req, res, next) => {
    const request = await Request.findById(req.params.requestId);

    if (!request) { return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`)) }

    // this is commented out because this function only allows the requestor to delete the request and not the other roles.
    //if (request.requestedById != req.user.id) { return next(new ErrorHandler('The requestor can only delete this request')) }

    const filesAttached = request.fileRequirements
    const filesReturned = request.returningFiles
    fileLength= filesAttached.length
    returnLength = filesReturned.length
    let arrayIds = []
    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].id) 
      }
    for (let i = 0; i < returnLength; i++) {
        arrayIds.push(filesReturned[i].id) 
      }

      gfs.remove({_id: arrayIds, root: 'fileStorage'}, (err, gridStore)=>{
          if(err){
            return next(new ErrorHandler('Error deleting request'))
          }
      })
     

    await request.remove()

    const auditLog = await Audit.create({
        userAudit: req.user.email,
        requestAudit: req.params.requestId,
        actionAudit: `User account: (${req.user.email}) has deleted the request with the tracking number: (${request.trackingNumber})`
    })
    res.status(200).json({
        success: true,
        message: "request has been deleted"
    })

})

// Request Tracker => /api/v1/requestTracker
exports.requestTracker = catchAsyncErrors(async (req, res, next) => {
    const trackingNumber = req.body.trackingNumber
    const lastName = req.body.lastName
    const request = await Request.findOne({ trackingNumber })

    if (!request) { return next(new ErrorHandler(`Request with Tracking Number: (${trackingNumber}) does not exist`)) }
    if (request.requestorLastName !== lastName) { return next(new ErrorHandler(`Last name does not match with the request surname`)) }

    res.status(200).json({
        success: true,
        request
    })
})

// Move request to trash => /api/v1/admin/trashRequest/:requestId
exports.trashRequest = catchAsyncErrors(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId);

    if (!request) { return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`)) }

    const newRequestData = { isTrash: true }
    
    request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const auditRequest = await Request.findById(req.params.requestId);
    
    const auditLog = await Audit.create({
        userAudit: req.user.email,
        requestAudit: req.params.requestId,
        actionAudit: `User account: (${req.user.email}) has moved the request to trash with the tracking number: (${auditRequest.trackingNumber})`
    })

    res.status(200).json({
        success: true,
        message: "request has been moved to trash"
    })

})

// View trashed requests => /api/v1/deptChair/trash
exports.getTrashedRequests = catchAsyncErrors(async (req, res, next) => {
    let deptCourse = ''

    switch (req.user.role) {
        case 'IT Dept Chair':
            deptCourse = 'Information Technology'
            break
        case 'IS Dept Chair':
            deptCourse = 'Information Systems'
            break
        case 'CS Dept Chair':
            deptCourse = 'Computer Science'
            break
        case 'CICS Staff':
            deptCourse = 'Office'
            break
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    let apiFeatures = ''

    if (deptCourse === 'Office') {
        apiFeatures = new APIFeatures(Request.find({ isTrash: true, requestType: { $in: requestTypeOfficeStaff }}).sort({ createdAt: -1 }), req.query) .searchRequests().filter()
    } else {
        apiFeatures = new APIFeatures(Request.find({ requestorCourse: deptCourse, isTrash: true, requestType: { $nin: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    }

    const requests = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalRequestCount: requests.length,
        requests
    })
})