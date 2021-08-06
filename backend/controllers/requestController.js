const Request = require('../models/request');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendUpdateRequest = require('../utils/sendUpdateRequest');
const today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const hrs = String(today.getHours()).padStart(2, '0')
const minutes = String(today.getMinutes()).padStart(2, '0')
const Audit = require('../models/audit');

// Submit new request => /api/v1/submitRequest

exports.submitRequest = catchAsyncErrors (async (req,res,next)=>{
    const { requestType, requestorYearLevel, requestorSection}= req.body;
    let trackStart
    if(requestType == "Adding/Dropping of Course"){
         trackStart = '1'
    }
    if(requestType == "Cross Enrollment within CICS"){
        trackStart = '2'
    }
    if(requestType == "Request for Petition Classes within CICS"){
         trackStart = '3'
    }
    if(requestType == "Request for Crediting of Courses"){
         trackStart = '4'
    }
    if(requestType == "Request for Overload"){
        trackStart = '5'
    }
    if(requestType == "Others"){
         trackStart = '6'
    }
    req.body.trackingNumber = trackStart + req.user.studentNumber + mm + dd + yyyy+ hrs+ minutes
    req.body.requestedById = req.user.id
    req.body.requestorFirstName = req.user.firstName
    req.body.requestorLastName = req.user.lastName
    req.body.requestorStudentNumber = req.user.studentNumber
    req.body.requestorEmail = req.user.email
    req.body.requestorCourse = req.user.course
    const requestedById = req.body.requestedById
    const requestorFirstName = req.body.requestorFirstName
    const requestorLastName = req.body.requestorLastName
    const requestorStudentNumber = req.body.requestorStudentNumber
    const requestorEmail = req.body.requestorEmail
    const trackingNumber = req.body.trackingNumber
    const requestorCourse = req.body.requestorCourse

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
        requestorCourse
    })
    res.status(201).json({
        success: true,
        request
    })
})

// Get all user submitted request => /api/v1/myRequests
exports.myRequests = catchAsyncErrors (async (req,res,next)=>{
    const resPerPage = 15;
    const apiFeatures = new APIFeatures(Request.find({requestedById: req.user.id}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const requests = await apiFeatures.query;
   
    res.status(200).json({
        success: true,
        count: requests.length,
        requests

    })
})

// Get all requests involving specific department chair => /api/v1/admin/requests
exports.getSubmittedRequests = catchAsyncErrors (async (req,res,next)=>{
    let deptCourse
    if(req.user.role == 'IT Dept Chair'){
        deptCourse = 'Information Technology'
    }
    else if(req.user.role == 'IS Dept Chair'){
        deptCourse = 'Information Systems'
    }
    else if(req.user.role == 'CS Dept Chair'){
        deptCourse = 'Computer Science'
    }else{
        return next(new ErrorHandler('Role does not have access to this resource'))
    }
    const resPerPage = 15;
    const apiFeatures = new APIFeatures(Request.find({requestorCourse: deptCourse}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const requests = await apiFeatures.query;
   
    res.status(200).json({
        success: true,
        count: requests.length,
        requests

    })
})

// Get single request => /api/v1/request/:requestId
exports.getSingleRequest = catchAsyncErrors (async (req,res,next)=>{

    const request = await Request.findById(req.params.requestId);

    if(!request){
        return next(new ErrorHandler('Request Id does not exist'))
    }
    res.status(200).json({
        success: true,
        request
    })

})

// Update request   => /api/v1/admin/updateRequest/:requestId
exports.updateRequest = catchAsyncErrors (async (req,res,next)=>{
    let deptCourse
    if(req.user.role == 'IT Dept Chair'){
        deptCourse = 'Information Technology'
    }
    else if(req.user.role == 'IS Dept Chair'){
        deptCourse = 'Information Systems'
    }
    else if(req.user.role == 'CS Dept Chair'){
        deptCourse = 'Computer Science'
    }else{
        return next(new ErrorHandler('Role does not have access to this resource'))
    }
    const rqst = await Request.findById(req.params.requestId);
    if(rqst.requestorCourse !== deptCourse){
        return next(new ErrorHandler('Role does not have access to this resource'))
    }
    const newRequestData = {
        requestStatus: req.body.requestStatus,
        managedBy: req.user.id
    }
    
    const request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    if (req.body.remarksMessage == null){
        req.body.remarksMessage = ''
    }
    let remarksData = {
        dateOfRemark: new Date(Date.now()),
        updatedStatus: req.body.requestStatus,
        userUpdated: req.user.id,
        remarksMessage: req.body.remarksMessage
    }
    Request.findOneAndUpdate(
        {_id: req.params.requestId},
        {$push: {remarks: remarksData}},
        {useFindAndModify: false}
    ).exec();
    const auditLog = await Audit.create({
            userAudit: req.user.email,
            requestAudit: req.params.requestId,
            actionAudit: `User account: (${req.user.email}) has updated the status
            of request with the tracking number: (${request.trackingNumber}) \n Current Status: ${req.body.requestStatus}`
    })


    const message = `Request with tracking number: ${rqst.trackingNumber} \n \n
    Current Status: ${request.requestStatus}`
    try{
        await sendUpdateRequest({
            email: rqst.requestorEmail,
            subject: `Status update for request tracking number (${rqst.trackingNumber})`,
            message
        })
        res.status(200).json({
            success:true,
            message: `Status has been updated and student has been notified`
        })

    } catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
})

// Delete request   => /api/v1/deleteRequest/:requestId
exports.deleteRequest = catchAsyncErrors (async (req,res,next)=>{
    const request = await Request.findById(req.params.requestId);
   
    if(!request){
        return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`));
    }
    if(request.requestedById != req.user.id){
        return next(new ErrorHandler('The requestor can only delete this request'))
    }
    await request.remove();
    res.status(200).json({
        success: true,
        message: "request has been deleted"
    })

})

// Request Tracker => /api/v1/requestTracker
exports.requestTracker = catchAsyncErrors (async (req,res,next)=>{
    const enteredTrackNum = req.body.enteredTrackNum
    const enteredLastName = req.body.enteredLastName
    const request = await Request.findOne({trackingNumber: enteredTrackNum})

    if(!request){
        return next(new ErrorHandler(`Request with Tracking Number: (${enteredTrackNum}) does not exist`))
    }
    if(request.requestorLastName !== enteredLastName){
        return next(new ErrorHandler(`Last name does not match with the request surname`))
    }
    res.status(200).json({
        success: true,
        request
    })
})
