const Request = require('../models/request');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendEmail = require('../utils/sendEmail');
const Audit = require('../models/audit');



// Submit new request => /api/v1/submitRequest

exports.submitRequest = catchAsyncErrors (async (req,res,next)=>{
    const { requestType, requestorYearLevel, requestorSection, requestorNotes}= req.body;
    const fileRequirements = req.files
    if (fileRequirements == null ||fileRequirements == '' ){
       return next(new ErrorHandler('Please Attach required file/s'))
    }
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
    if(requestType == "Request for late enrollment"){
         trackStart = '6'
    }
    if(requestType == "Request for manual enrollment"){
        trackStart = '7'
   }
   if(requestType == "Others"){
    trackStart = '8'
}
    const trackingNumber  = trackStart + req.user.studentNumber + Date.now()
    const requestedById = req.user.id
    const requestorFirstName = req.user.firstName
    const requestorLastName = req.user.lastName
    const requestorStudentNumber = req.user.studentNumber
    const requestorEmail = req.user.email
    const requestorCourse  = req.user.course

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
exports.myRequests = catchAsyncErrors (async (req,res,next)=>{
    const resPerPage = 15;
    const apiFeatures = new APIFeatures(Request.find({requestedById: req.user.id}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
                        const apiFeaturesPending = new APIFeatures(Request.find({requestedById: req.user.id,requestStatus: 'Pending'}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesProcessing = new APIFeatures(Request.find({requestedById: req.user.id,requestStatus: 'Processing'}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesApproved = new APIFeatures(Request.find({requestedById: req.user.id,requestStatus: 'Approved'}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesDenied = new APIFeatures(Request.find({requestedById: req.user.id,requestStatus: 'Denied'}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const requests = await apiFeatures.query;
    const pendingRequests = await apiFeaturesPending.query;
    const processingRequests = await apiFeaturesProcessing.query;
    const approvedRequests = await apiFeaturesApproved.query;
    const deniedRequests = await apiFeaturesDenied.query;
   
    res.status(200).json({
        success: true,
        totalRequestCount: requests.length,
        totalPendingRequest: pendingRequests.length,
        totalProcessingRequests: processingRequests.length,
        totalApprovedRequests: approvedRequests.length,
        totalDeniedRequests: deniedRequests.length 
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
    const apiFeatures = new APIFeatures(Request.find({requestorCourse: deptCourse, isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesPending = new APIFeatures(Request.find({requestorCourse: deptCourse,requestStatus: 'Pending', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesProcessing = new APIFeatures(Request.find({requestorCourse: deptCourse,requestStatus: 'Processing', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesApproved = new APIFeatures(Request.find({requestorCourse: deptCourse,requestStatus: 'Approved',isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesDenied = new APIFeatures(Request.find({requestorCourse: deptCourse,requestStatus: 'Denied', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const requests = await apiFeatures.query;
    const pendingRequests = await apiFeaturesPending.query;
    const processingRequests = await apiFeaturesProcessing.query;
    const approvedRequests = await apiFeaturesApproved.query;
    const deniedRequests = await apiFeaturesDenied.query;
   
    res.status(200).json({
        success: true,
        requests,
        totalRequestCount: requests.length,
        totalPendingRequest: pendingRequests.length,
        totalProcessingRequests: processingRequests.length,
        totalApprovedRequests: approvedRequests.length,
        totalDeniedRequests: deniedRequests.length 
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
    
    let newRequestData = {
        requestStatus: req.body.requestStatus,
        managedBy: req.user.id,
        returningFiles: req.files
    }
    if(req.files == null || req.files==''){
        newRequestData = {
            requestStatus: req.body.requestStatus,
            managedBy: req.user.id
        }
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
        await sendEmail({
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
exports.requestTracker = catchAsyncErrors (async (req,res,next)=>{
    const trackingNumber = req.body.trackingNumber
    const lastName = req.body.lastName
    const request = await Request.findOne({trackingNumber})

    if(!request){
        return next(new ErrorHandler(`Request with Tracking Number: (${trackingNumber}) does not exist`))
    }
    if(request.requestorLastName !== lastName){
        return next(new ErrorHandler(`Last name does not match with the request surname`))
    }
    res.status(200).json({
        success: true,
        request
    })
})

// Get all requests cics staff side => /api/v1/cicsAdmin/requests
exports.getSubmittedRequestsCICSStaff = catchAsyncErrors (async (req,res,next)=>{
    const resPerPage = 15;
    const apiFeatures = new APIFeatures(Request.find(), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesPending = new APIFeatures(Request.find({requestStatus: 'Pending', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesProcessing = new APIFeatures(Request.find({requestStatus: 'Processing', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesApproved = new APIFeatures(Request.find({requestStatus: 'Approved', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const apiFeaturesDenied = new APIFeatures(Request.find({requestStatus: 'Denied', isTrash: false}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const requests = await apiFeatures.query;
    const pendingRequests = await apiFeaturesPending.query;
    const processingRequests = await apiFeaturesProcessing.query;
    const approvedRequests = await apiFeaturesApproved.query;
    const deniedRequests = await apiFeaturesDenied.query;
   
    res.status(200).json({
        success: true,
        totalRequestCount: requests.length,
        totalPendingRequest: pendingRequests.length,
        totalProcessingRequests: processingRequests.length,
        totalApprovedRequests: approvedRequests.length,
        totalDeniedRequests: deniedRequests.length 

    })
})

// Move request to trash => /api/v1/admin/trashRequest/:requestId
exports.trashRequest = catchAsyncErrors (async (req,res,next)=>{
    let request = await Request.findById(req.params.requestId);
   
    if(!request){
        return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`));
    }
    const newRequestData = {
        isTrash: true
    }
    request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
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

// View trashed requests => /api/v1/admin/trash/requests
exports.getTrashedRequests = catchAsyncErrors (async (req,res,next)=>{
    let deptCourse
    const resPerPage = 15;
    const apiFeatures = new APIFeatures(Request.find({ isTrash: true}), req.query)
                        .searchRequests()
                        .filter()
                        .pagination(resPerPage);
    const requests = await apiFeatures.query;

   
    res.status(200).json({
        success: true,
        totalRequestCount: requests.length,
    })
})