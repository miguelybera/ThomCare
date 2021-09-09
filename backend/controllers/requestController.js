const Request = require('../models/request');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendEmail = require('../utils/sendEmail');
const Audit = require('../models/audit');
const cloudinary = require('cloudinary').v2;
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
        case "Request Override":
            trackStart = '6'
            break
        case "Request for late enrollment":
            trackStart = '7'
            break
        case "Request for manual enrollment":
            trackStart = '8'
            break
        case "Request for Course Description":
            trackStart = '9'
            break
        case "Request for Certificate of Grades":
            trackStart = '10'
            break
        case "Others":
            trackStart = '11'
            break
    }

    const trackingNumber = trackStart + req.user.studentNumber + Date.now()
    const requestedById = req.user.id
    const requestorFirstName = req.user.firstName
    const requestorMiddleName = req.user.middleName
    const requestorLastName = req.user.lastName
    const requestorStudentNumber = req.user.studentNumber
    const requestorEmail = req.user.email
    const requestorCourse = req.user.course

    let remarksData = {
        dateOfRemark: new Date(Date.now()),
        updatedStatus: 'Pending',
        userUpdated: ' ',
        remarksMessage: ' '
    }

    const request = await Request.create({
        requestType,
        requestorYearLevel,
        requestorSection,
        requestedById,
        requestorFirstName,
        requestorMiddleName,
        requestorLastName,
        requestorStudentNumber,
        requestorEmail,
        trackingNumber,
        requestorCourse,
        fileRequirements,
        requestorNotes,
        remarks: remarksData
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
    const apiFeaturesCrossEnrollment = new APIFeatures(Request.find({ isTrash: false, requestType: 'Cross Enrollment within CICS' }).sort({ createdAt: -1 }), req.query).searchRequests().filter()

    const requests = await apiFeatures.query
    const pendingRequests = await apiFeaturesPending.query
    const processingRequests = await apiFeaturesProcessing.query
    const approvedRequests = await apiFeaturesApproved.query
    const deniedRequests = await apiFeaturesDenied.query
    const crossEnrollmentRequests = await apiFeaturesCrossEnrollment.query

    res.status(200).json({
        success: true,
        requests,
        pendingRequests,
        processingRequests,
        approvedRequests,
        deniedRequests,
        crossEnrollmentRequests
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
    const rqst = await Request.findById(req.params.requestId)
    /* removed the if condition for updating requests only within their department because the cross enrollment request
     requires department chairs from other courses to also approve the switch case can be replaced into an if condition that the student
     role cannot have access. */
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
            break
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    let newRequestData

    newRequestData = {
        requestStatus: req.body.requestStatus,
        managedBy: req.user.id,

    }

    const request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    let remarksMessage

    if (req.body.remarksMessage == null) {
        remarksMessage = ' '
    } else {
        remarksMessage = req.body.remarksMessage
    }

    let remarksData

    if (req.files == null || req.files == '') {
        remarksData = {
            dateOfRemark: new Date(Date.now()),
            updatedStatus: req.body.requestStatus,
            userUpdated: req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName,
            remarksMessage
        }
    } else {
        remarksData = {
            dateOfRemark: new Date(Date.now()),
            updatedStatus: req.body.requestStatus,
            userUpdated: req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName,
            remarksMessage,
            returningFiles: req.files
        }
    }

    Request.findOneAndUpdate(
        { _id: req.params.requestId },
        { $push: { remarks: remarksData } },
        { useFindAndModify: false }
    ).exec()

    const auditLog = await Audit.create({
        userAudit: req.user.email,
        requestAudit: request.trackingNumber,
        actionAudit: `User account: (${req.user.email}) has updated the status of request with the tracking number: (${request.trackingNumber}) \n Current Status: ${req.body.requestStatus}`
    })

    let message

    if (req.files == null || req.files == '') {
        message = `<div style="width:100%!important;background-color:#ececec;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-family:HelveticaNeue,sans-serif">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ececec">
                <tbody>
                    <tr style="border-collapse:collapse">
                        <td align="center" bgcolor="#ececec" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                            <table width="640" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;margin-bottom:0;margin-right:10px;margin-left:10px">
                                <tbody>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="20" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>

                                <tr style="border-collapse:collapse;">
                                        <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                            <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#8A0020" style="border-radius:6px 6px 0px 0px;background-color:#8A0020;color:#464646">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="350" valign="middle" align="left" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                        </td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="255" valign="middle" align="right" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                            <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </td>
                                    </tr>
                                    <tr style="border-collapse:collapse">

                                        <td width="640" align="center" bgcolor="#8A0020" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                            <div align="center" style="text-align:center", "display: flex", "justify-content: center", "align-items: center">
                                                <a href="http://openweblife.createsend4.com/t/d-i-ftrgl-l-d/" target="_blank" style="font-size:36px; color:#fff; text-decoration:none; font-family:'calibri', arial, verdana; display:block; margin:20px 0 0;">
                    <img style="max-width: 50px;" src="https://res.cloudinary.com/dwcxehcui/image/upload/v1630769727/logo/UST-Seal-College-of-Information-Computing-Sciences_ghtsuq.png" alt="logo">ThomCare 
                                                </a><br />
                                            </div>


                                        </td>
                                    </tr>

                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="30" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                            <table align="left" width="640" cellpadding="0" cellspacing="0" border="0">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                            <table width="580" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                            <p align="left" style="font-size:18px;line-height:24px;color:#8a0020;font-weight:bold;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">Update on Request</p>
                                                                            <div align="left" style="font-size:13px;line-height:18px;color:#464646;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">
                                                                                <table border="0" cellpadding="5" cellspacing="0" width="100%" style="font-size:13px;font-family:'calibri',arial,verdana;line-height:1.4">
                                                                                    <tbody>
                                                                                        <tr style="border-collapse:collapse">
                                                                                            <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                            Request with tracking number: <strong>${rqst.trackingNumber}</strong> <br><br>Current Status: <strong>${request.requestStatus}</strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="580" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="15" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>

                                    <tr style="border-collapse:collapse">
                                        <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                            <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#043948" style="border-radius:0px 0px 6px 6px;background-color:#043948;color:#e2e2e2">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="360" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="360" height="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <img src="https://ci3.googleusercontent.com/proxy/1Bf6wZ9D4_9D4XK1CLH23Tl727SqwAxtj2mvfZ0Hn5vWCT0Zbtb6SSOSb-KYRCmmIUG5ITKLhN1d9n-rzhxQZKE=s0-d-e1-ft#https://createsend4.com/t/d-o-ftrgl-l/o.gif" width="1" height="1" border="0" alt="" style="min-height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important;outline-style:none;text-decoration:none;display:block">
        </div>`
    } else {
        message = `<div style="width:100%!important;background-color:#ececec;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;font-family:HelveticaNeue,sans-serif">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ececec">
                <tbody>
                    <tr style="border-collapse:collapse">
                        <td align="center" bgcolor="#ececec" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                            <table width="640" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;margin-bottom:0;margin-right:10px;margin-left:10px">
                                <tbody>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="20" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>

                                <tr style="border-collapse:collapse;">
                                        <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                            <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#8A0020" style="border-radius:6px 6px 0px 0px;background-color:#8A0020;color:#464646">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="350" valign="middle" align="left" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                        </td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="255" valign="middle" align="right" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                            <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <table width="255" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="255" height="5" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td width="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </td>
                                    </tr>
                                    <tr style="border-collapse:collapse">

                                        <td width="640" align="center" bgcolor="#8A0020" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                            <div align="center" style="text-align:center", "display: flex", "justify-content: center", "align-items: center">
                                                <a href="http://openweblife.createsend4.com/t/d-i-ftrgl-l-d/" target="_blank" style="font-size:36px; color:#fff; text-decoration:none; font-family:'calibri', arial, verdana; display:block; margin:20px 0 0;">
                    <img style="max-width: 50px;" src="https://res.cloudinary.com/dwcxehcui/image/upload/v1630769727/logo/UST-Seal-College-of-Information-Computing-Sciences_ghtsuq.png" alt="logo">ThomCare 
                                                </a><br />
                                            </div>


                                        </td>
                                    </tr>

                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="30" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                            <table align="left" width="640" cellpadding="0" cellspacing="0" border="0">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">

                                                            <table width="580" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="580" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                            <p align="left" style="font-size:18px;line-height:24px;color:#8a0020;font-weight:bold;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">Update on Request</p>
                                                                            <div align="left" style="font-size:13px;line-height:18px;color:#464646;margin-top:0px;margin-bottom:18px;font-family:HelveticaNeue,sans-serif">
                                                                                <table border="0" cellpadding="5" cellspacing="0" width="100%" style="font-size:13px;font-family:'calibri',arial,verdana;line-height:1.4">
                                                                                    <tbody>
                                                                                        <tr style="border-collapse:collapse">
                                                                                            <td width="100%" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                                                                            Request with tracking number: <strong>${rqst.trackingNumber}</strong> <br><br>Current Status: <strong>${request.requestStatus}<strong> & a file has been attached to your request. Please view your request on the website to download the file attachment.</strong> 
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td width="580" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="15" bgcolor="#ffffff" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>

                                    <tr style="border-collapse:collapse">
                                        <td width="640" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse">
                                            <table width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#043948" style="border-radius:0px 0px 6px 6px;background-color:#043948;color:#e2e2e2">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="360" height="10" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                    <tr style="border-collapse:collapse">
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="360" height="15" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="160" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                        <td width="30" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr style="border-collapse:collapse">
                                        <td width="640" height="60" style="font-family:HelveticaNeue,sans-serif;border-collapse:collapse"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <img src="https://ci3.googleusercontent.com/proxy/1Bf6wZ9D4_9D4XK1CLH23Tl727SqwAxtj2mvfZ0Hn5vWCT0Zbtb6SSOSb-KYRCmmIUG5ITKLhN1d9n-rzhxQZKE=s0-d-e1-ft#https://createsend4.com/t/d-o-ftrgl-l/o.gif" width="1" height="1" border="0" alt="" style="min-height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important;outline-style:none;text-decoration:none;display:block">
        </div>`
    }

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
    const fileLength = filesAttached.length
    let arrayIds = []

    const remarksData = request.remarks
    const remarksLength = remarksData.length
    const returningFilesArray = []

    for (let i = 0; i < remarksLength; i++) {
        if (remarksData[i].returningFiles == null || remarksData[i].returningFiles == '') {
        } else {
            returningFilesArray.push(remarksData[i].returningFiles)
        }
    }

    const rfaArrayLength = []

    for (let i = 0; i < returningFilesArray.length; i++) {
        rfaArrayLength.push(returningFilesArray[i].length)
    }

    for (let i = 0; i < returningFilesArray.length; i++) {
        let fileReturned = returningFilesArray[i]
        for (let y = 0; y < rfaArrayLength.length; y++) {
            for (let z = 0; z < rfaArrayLength[y]; z++) {
                arrayIds.push(fileReturned[z].filename)
            }
        }
    }

    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].filename)
    }

    if (arrayIds.length != 0) {
        for (let x = 0; x < arrayIds.length; x++) {
            cloudinary.uploader.destroy(arrayIds[x],
                { resource_type: 'raw' })
        }
    }

    const auditLog = await Audit.create({
        userAudit: req.user.email,
        requestAudit: request.trackingNumber,
        actionAudit: `User account: (${req.user.email}) has deleted the request with the tracking number: (${request.trackingNumber})`
    })

    await request.remove()

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

// Move request to trash or trash to restore => /api/v1/admin/trashRequest/:requestId
exports.trashRequest = catchAsyncErrors(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId);

    if (!request) { return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`)) }

    const newRequestData = { isTrash: req.body.isTrash }

    request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const auditRequest = await Request.findById(req.params.requestId);

    let actionAudit, statusMessage

    if (req.body.isTrash) {
        actionAudit = `User account: (${req.user.email}) has moved the request to trash with the tracking number: (${auditRequest.trackingNumber})`
        statusMessage = "Request has been moved to trash"
    } else {
        actionAudit = `User account: (${req.user.email}) has restored the request from trash with the tracking number: (${auditRequest.trackingNumber})`
        statusMessage = "Request has been restored from trash"
    }

    const auditLog = await Audit.create({
        userAudit: req.user.email,
        requestAudit: auditRequest.trackingNumber,
        actionAudit
    })

    res.status(200).json({
        success: true,
        message: statusMessage
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
        apiFeatures = new APIFeatures(Request.find({ isTrash: true, requestType: { $in: requestTypeOfficeStaff } }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
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

// Get unmanaged requests for cics staff => /api/v1/cicsStaff/available/requests
exports.getAvailableRequests = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Request.find({ isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: '' }).sort({ createdAt: -1 }), req.query).searchRequests().filter()

    const requests = await apiFeatures.query;

    res.status(200).json({
        success: true,
        requests
    })
})

// Assign a request to self => /api/v1/cicsStaff/assign/request/:requestId
exports.assignRequestToSelfCICS = catchAsyncErrors(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId);

    if (!request) { return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`)) }

    const newRequestData = { managedBy: req.user.id }

    request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: `Request has been assigned to ${req.user.email}`
    })

})

// Get requests that are assigned and handled by the office only => /api/v1/cicsAdmin/assigned/requests
exports.getAllAssignedRequests = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Request.find({ isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesPending = new APIFeatures(Request.find({ requestStatus: 'Pending', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesProcessing = new APIFeatures(Request.find({ requestStatus: 'Processing', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesApproved = new APIFeatures(Request.find({ requestStatus: 'Approved', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id }).sort({ createdAt: -1 }), req.query).searchRequests().filter()
    const apiFeaturesDenied = new APIFeatures(Request.find({ requestStatus: 'Denied', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id }).sort({ createdAt: -1 }), req.query).searchRequests().filter()

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