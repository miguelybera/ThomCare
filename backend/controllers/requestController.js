const Request = require('../models/request');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendEmail = require('../utils/sendEmail');
const Audit = require('../models/audit');
const cloudinary = require('cloudinary').v2;
const requestNotification = require('../config/templates/requestNotification')

const requestTypeOfficeStaff = ['Request for Certificate of Grades', 'Request for Course Description', 'Others', 'Request for Leave of Absence', 'Submission of Admission Memo'];
const resPerPage = 5

// Submit new request => /api/v1/submitRequest
exports.submitRequest = catchAsyncErrors(async (req, res, next) => {
    const { requestType, yearLevel, section, notes } = req.body
    const fileRequirements = req.files

    if (fileRequirements == null || fileRequirements == '') { return next(new ErrorHandler('Please attach file requirement(s)')) }

    let trackStart = ''

    switch (requestType) {
        case "Adding/Dropping of Course":
            trackStart = '1'
            break
        case "Cross Enrollment within CICS":
            trackStart = '2'
            break
        case "Cross Enrollment outside CICS":
            trackStart = '3'
            break
        case "Request for Petition Classes within CICS":
            trackStart = '4'
            break
        case "Request for Crediting of Courses":
            trackStart = '5'
            break
        case "Request for Overload":
            trackStart = '6'
            break
        case "Request Override":
            trackStart = '7'
            break
        case "Request for Late Enrollment":
            trackStart = '8'
            break
        case "Request for Manual Enrollment":
            trackStart = '9'
            break
        case "Request for Course Description":
            trackStart = '10'
            break
        case "Request for Certificate of Grades":
            trackStart = '11'
            break
        case "Request for Leave of Absence":
            trackStart = '12'
            break
        case "Submission of Admission Memo":
            trackStart = '13'
            break
        case "Others":
            trackStart = '14'
            break
    }

    const trackingNumber = trackStart + req.user.studentNumber + Date.now()
    const requestedById = req.user.id
    const { firstName, middleName, lastName, studentNumber, email, course } = req.user

    let remarks = {
        dateOfRemark: new Date(Date.now()),
        updatedStatus: 'Pending',
        userUpdated: 'Student',
        remarksMessage: 'Request submitted.'
    }

    let requestorInfo = {
        firstName,
        middleName,
        lastName,
        studentNumber,
        email,
        yearLevel,
        course,
        section
    }
    const request = await Request.create({
        requestType,
        requestedById,
        trackingNumber,
        fileRequirements,
        notes: notes === 'undefined' ? 'N/A' : notes,
        requestorInfo,
        remarks,
        createdAt: new Date(Date.now())
    })
    res.status(201).json({
        success: true,
        request
    })
})

// Request Tracker => /api/v1/requestTracker
exports.requestTracker = catchAsyncErrors(async (req, res, next) => {
    const trackingNumber = req.body.trackingNumber
    const lastName = req.body.lastName
    const request = await Request.findOne({ trackingNumber })

    if (!request) { return next(new ErrorHandler(`Request does not exist`)) }

    if (request.requestorInfo.lastName !== lastName) { return next(new ErrorHandler(`Tracking number and surname do not match.`)) }

    res.status(200).json({
        success: true,
        request
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


// Get all user submitted request => /api/v1/myRequests
exports.getMyRequests = catchAsyncErrors(async (req, res, next) => {
    const getRequests = new APIFeatures(Request.find({ requestedById: req.user.id }).sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await getRequests.query

    res.status(200).json({
        success: true,
        requests
    })
})

// Get all requests involving specific department chair => /api/v1/deptChair/requests
exports.getDeptChairRequests = catchAsyncErrors(async (req, res, next) => {
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
        case 'CICS Office':
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    const getRequests = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, isTrash: false, requestType: { $nin: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsPending = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, requestStatus: 'Pending', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsProcessing = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, requestStatus: 'Processing', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsApproved = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, requestStatus: 'Approved', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsDenied = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, requestStatus: 'Denied', isTrash: false, requestType: { $nin: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await getRequests.query;
    const pending = await getRequestsPending.query;
    const processing = await getRequestsProcessing.query;
    const approved = await getRequestsApproved.query;
    const denied = await getRequestsDenied.query;

    res.status(200).json({
        success: true,
        requests,
        pending,
        processing,
        approved,
        denied
    })
})


// Get all requests involving specific department chair => /api/v1/deptChair/stats
exports.getDeptChairStats = catchAsyncErrors(async (req, res, next) => {
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
        case 'CICS Office':
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    const dailyDates = []
    const dailyStats = []

    for (let i = 0; i < 8; i++) {
        dailyDates.push(new Date(Date.now() - ((i - 1) * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
    }

    for (let i = 0; i < dailyDates.length - 1; i++) {
        const x = await Request.find({
            createdAt: {
                "$gte": dailyDates[i + 1].toString(),
                "$lt": dailyDates[i].toString()
            },
            "requestorInfo.course": deptCourse,
            requestType: {
                $nin: requestTypeOfficeStaff
            }
        })

        dailyStats.push(x.length)
    }

    const weeklyDates = []
    const weeklyStats = []

    for (let i = 0; i < 5; i++) {
        weeklyDates.push(new Date(Date.now() - ((i * 7) * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
    }

    for (let i = 0; i < weeklyDates.length - 1; i++) {
        const x = await Request.find({
            createdAt: {
                "$gte": weeklyDates[i + 1].toString(),
                "$lt": weeklyDates[i].toString()
            },
            "requestorInfo.course": deptCourse,
            requestType: {
                $nin: requestTypeOfficeStaff
            }
        })

        weeklyStats.push(x.length)
    }

    // const dates = [0, 1, 7, 30, 60]
    // const overViewDates = []
    // const overViewStats = []

    // for (let i = 0; i < dates.length; i++) {
    //     overViewDates.push(new Date(Date.now() - ((dates[i] - 1) * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
    // }

    // for (let i = 0; i < overViewDates.length - 1; i++) {
    //     const x = await Request.find({
    //         createdAt: {
    //             "$gte": overViewDates[i + 1].toString(),
    //             "$lt": overViewDates[0].toString()
    //         },
    //         "requestorInfo.course": deptCourse,
    //         requestType: {
    //             $nin: requestTypeOfficeStaff
    //         }
    //     })

    //     overViewStats.push(x.length)
    // }

    res.status(200).json({
        success: true,
        dailyStats,
        weeklyStats,
        // overViewStats
    })
})

// Get all requests cics staff side => /api/v1/cicsAdmin/requests
exports.getAllRequests = catchAsyncErrors(async (req, res, next) => {
    const getRequests = new APIFeatures(Request.find()
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsPending = new APIFeatures(Request.find({ requestStatus: 'Pending', isTrash: false })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsProcessing = new APIFeatures(Request.find({ requestStatus: 'Processing', isTrash: false })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsApproved = new APIFeatures(Request.find({ requestStatus: 'Approved', isTrash: false })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsDenied = new APIFeatures(Request.find({ requestStatus: 'Denied', isTrash: false })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await getRequests.query;
    const pending = await getRequestsPending.query;
    const processing = await getRequestsProcessing.query;
    const approved = await getRequestsApproved.query;
    const denied = await getRequestsDenied.query;

    res.status(200).json({
        success: true,
        requests,
        pending,
        processing,
        approved,
        denied
    })
})

// Get all requests cics staff side => /api/v1/cicsAdmin/stats
exports.getAllStats = catchAsyncErrors(async (req, res, next) => {
    const dailyDates = []
    const dailyStats = []

    for (let i = 0; i < 8; i++) {
        dailyDates.push(new Date(Date.now() - ((i - 1) * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
    }

    for (let i = 0; i < dailyDates.length - 1; i++) {
        const x = await Request.find({
            createdAt: {
                "$gte": dailyDates[i + 1].toString(),
                "$lt": dailyDates[i].toString()
            }
        })

        dailyStats.push(x.length)
    }

    const weeklyDates = []
    const weeklyStats = []

    for (let i = 0; i < 5; i++) {
        weeklyDates.push(new Date(Date.now() - ((i * 7) * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
    }

    for (let i = 0; i < weeklyDates.length - 1; i++) {
        const x = await Request.find({
            createdAt: {
                "$gte": weeklyDates[i + 1].toString(),
                "$lt": weeklyDates[i].toString()
            }
        })

        weeklyStats.push(x.length)
    }

    // const dates = [0, 1, 7, 30, 60]
    // const overViewDates = []
    // const overViewStats = []

    // for (let i = 0; i < dates.length; i++) {
    //     overViewDates.push(new Date(Date.now() - ((dates[i] - 1) * 24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0))
    // }

    // for (let i = 0; i < overViewDates.length - 1; i++) {
    //     const x = await Request.find({
    //         createdAt: {
    //             "$gte": overViewDates[i + 1].toString(),
    //             "$lt": overViewDates[0].toString()
    //         }
    //     })

    //     overViewStats.push(x.length)
    // }

    res.status(200).json({
        success: true,
        dailyStats,
        weeklyStats,
        // overViewStats
    })
})

// Get requests that are handled by the office only => /api/v1/cicsAdmin/officeRequests
exports.getOfficeRequests = catchAsyncErrors(async (req, res, next) => {
    const getRequests = new APIFeatures(Request.find({ isTrash: false, requestType: { $in: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsPending = new APIFeatures(Request.find({ requestStatus: 'Pending', isTrash: false, requestType: { $in: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsProcessing = new APIFeatures(Request.find({ requestStatus: 'Processing', isTrash: false, requestType: { $in: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsApproved = new APIFeatures(Request.find({ requestStatus: 'Approved', isTrash: false, requestType: { $in: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsDenied = new APIFeatures(Request.find({ requestStatus: 'Denied', isTrash: false, requestType: { $in: requestTypeOfficeStaff } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await getRequests.query;
    const pending = await getRequestsPending.query;
    const processing = await getRequestsProcessing.query;
    const approved = await getRequestsApproved.query;
    const denied = await getRequestsDenied.query;

    res.status(200).json({
        success: true,
        requests,
        pending,
        processing,
        approved,
        denied
    })
})


// Get unmanaged requests for cics staff => /api/v1/cicsStaff/available/requests
exports.getAvailableRequests = catchAsyncErrors(async (req, res, next) => {
    const getRequests = new APIFeatures(Request.find({ isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: '' })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await getRequests.query;

    res.status(200).json({
        success: true,
        requests
    })
})

// Get requests that are assigned and handled by the office only => /api/v1/cicsAdmin/assigned/requests
exports.getAssignedRequests = catchAsyncErrors(async (req, res, next) => {
    const getRequests = new APIFeatures(Request.find({ isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsPending = new APIFeatures(Request.find({ requestStatus: 'Pending', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsProcessing = new APIFeatures(Request.find({ requestStatus: 'Processing', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsApproved = new APIFeatures(Request.find({ requestStatus: 'Approved', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getRequestsDenied = new APIFeatures(Request.find({ requestStatus: 'Denied', isTrash: false, requestType: { $in: requestTypeOfficeStaff }, managedBy: req.user.id })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const requests = await getRequests.query;
    const pending = await getRequestsPending.query;
    const processing = await getRequestsProcessing.query;
    const approved = await getRequestsApproved.query;
    const denied = await getRequestsDenied.query;

    res.status(200).json({
        success: true,
        requests,
        pending,
        processing,
        approved,
        denied
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
        case 'CICS Office':
            deptCourse = 'Office'
            break
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    let getRequests = ''

    if (deptCourse === 'Office') {
        getRequests = new APIFeatures(Request.find({ isTrash: true, managedBy: req.user.id, requestType: { $in: requestTypeOfficeStaff } })
            .sort({ createdAt: -1 }), req.query)
            .searchRequests()
            .filter()
    } else {
        getRequests = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, isTrash: true, requestType: { $nin: requestTypeOfficeStaff } })
            .sort({ createdAt: -1 }), req.query)
            .searchRequests()
            .filter()
    }

    const requests = await getRequests.query;

    res.status(200).json({
        success: true,
        requests
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
        case 'CICS Office':
            break
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    let newRequestData = {
        requestStatus: req.body.requestStatus,
        managedBy: req.user.id,
    }

    const request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    let remarksMessage = req.body.remarksMessage && req.body.remarksMessage == null || req.body.remarksMessage == undefined ? ' ' : req.body.remarksMessage

    let remarksData = {
        dateOfRemark: new Date(Date.now()),
        updatedStatus: req.body.requestStatus,
        userUpdated: req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName,
        remarksMessage,
        returningFiles: req.files
    }

    let withFiles = ` and ${req.files.length} file attachment(s)`

    if (req.files == null || req.files == '') {
        remarksData = {
            dateOfRemark: new Date(Date.now()),
            updatedStatus: req.body.requestStatus,
            userUpdated: req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName,
            remarksMessage
        }

        withFiles = ``
    }

    Request.findOneAndUpdate({ _id: req.params.requestId }, { $push: { remarks: remarksData } }, { useFindAndModify: false }).exec()

    const userName = req.user.firstName + ' ' + req.user.lastName

    let eventInfo = `Updated request with tracking number: ${request.trackingNumber} with status of ${req.body.requestStatus}${withFiles}`

    if (remarksMessage) {
        eventInfo += ` with remarks of: ${remarksMessage}`
    }
    await Audit.create({
        name: `Request update`,
        eventInfo,
        user: userName,
        dateAudit: Date.now()
    })

    let msg = remarksMessage

    if (req.files.length > 0) {
        msg += ` along with file attachment(s). Please view your request on the <a href="${req.protocol}://${process.env.THOM_HOST}">website</a> to download the file attachment(s).`
    }

    const emailData = {
        trackingNumber: request.trackingNumber,
        requestStatus: req.body.requestStatus,
        msg
    }

    try {
        const message = await requestNotification(emailData)

        await sendEmail({
            email: rqst.requestorInfo.email,
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

// Assign a request to self => /api/v1/cicsStaff/assign/request/:requestId
exports.assignRequestToSelfCICS = catchAsyncErrors(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId);

    if (!request) { return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`)) }
    if (request.managedBy != "") {
        return next(new ErrorHandler(`This request is already been assigned to a CICS Office`))
    }

    const newRequestData = { managedBy: req.user.id }

    request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const userName = req.user.firstName + ' ' + req.user.lastName

    await Audit.create({
        name: "Request assignment",
        eventInfo: `Request with tracking number: ${request.trackingNumber} was assigned to user ${req.user.email}`,
        user: userName,
        dateAudit: Date.now()
    })

    res.status(200).json({
        success: true,
        message: `Request has been assigned to ${req.user.email}`
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

    let actionAudit, statusMessage, eventName

    if (req.body.isTrash) {
        actionAudit = `Request with tracking number: ${request.trackingNumber} was moved to Trash.`
        statusMessage = "Request has been moved to trash"
        eventName = `Trashed request`
    } else {
        actionAudit = `Request with tracking number: ${request.trackingNumber} was restored from Trash.`
        statusMessage = "Request has been restored from trash"
        eventName = 'Restored request'
    }

    const userName = req.user.firstName + ' ' + req.user.lastName

    await Audit.create({
        name: eventName,
        eventInfo: actionAudit,
        user: userName,
        dateAudit: Date.now()
    })

    res.status(200).json({
        success: true,
        message: statusMessage
    })
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
        if (remarksData[i].returningFiles.length != 0) {
            returningFilesArray.push(remarksData[i].returningFiles)
        }
    }

    const rfaArrayLength = []

    for (let i = 0; i < returningFilesArray.length; i++) {
        rfaArrayLength.push(returningFilesArray[i].length)
    }

    for (let i = 0; i < returningFilesArray.length; i++) {
        let fileReturned = returningFilesArray[i]
        for (let y = 0; y < fileReturned.length; y++) {
            arrayIds.push(fileReturned[y].filename)

        }
    }

    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].filename)
    }

    if (arrayIds.length != 0) {
        for (let x = 0; x < arrayIds.length; x++) {
            cloudinary.uploader.destroy(arrayIds[x], { resource_type: 'raw' })
        }
    }

    await request.remove()

    const userName = req.user.firstName + ' ' + req.user.lastName

    if (req.params.emptyTrash == 'No') {
        await Audit.create({
            name: "Request permanent deletion",
            eventInfo: `Permanently deleted request with tracking number: ${request.trackingNumber}.`,
            user: userName,
            dateAudit: Date.now()
        })
    }
    
    res.status(200).json({
        success: true,
        message: "Request has been deleted"
    })
})

// unassign request
exports.unassignRequest = catchAsyncErrors(async (req, res, next) => {
    let request = await Request.findById(req.params.requestId);

    if (!request) { return next(new ErrorHandler(`Request does not exist with this id:(${req.params.requestId})`)) }

    const newRequestData = { managedBy: "" }

    request = await Request.findByIdAndUpdate(req.params.requestId, newRequestData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const userName = req.user.firstName + ' ' + req.user.lastName

    await Audit.create({
        name: "Request unassignment",
        eventInfo: `Request with tracking number: ${request.trackingNumber} was unassigned from user ${req.user.email}`,
        user: userName,
        dateAudit: Date.now()
    })

    res.status(200).json({
        success: true,
        message: `Request has been unassigned by ${req.user.email}`
    })

})

exports.getCrossEnrollment = catchAsyncErrors(async (req, res, next) => {
    const reqStatusIT = ['Pending for IT Approval', 'Approved by IT', 'Denied by IT'];
    const reqStatusIS = ['Pending for IS Approval', 'Approved by IS', 'Denied by IS'];
    const reqStatusCS = ['Pending for CS Approval', 'Approved by CS', 'Denied by CS'];
    let deptCourse = '', crossStatus = []

    switch (req.user.role) {
        case 'IT Dept Chair':
            crossStatus = reqStatusIT
            deptCourse = 'Information Technology'
            break
        case 'IS Dept Chair':
            crossStatus = reqStatusIS
            deptCourse = 'Information Systems'
            break
        case 'CS Dept Chair':
            crossStatus = reqStatusCS
            deptCourse = 'Computer Science'
            break
        case 'CICS Office':
        case 'Student':
            return next(new ErrorHandler('Role does not have access to this resource'))
    }

    const getCrossEnrollmentIncoming = new APIFeatures(Request.find({ isTrash: false, requestType: 'Cross Enrollment within CICS', requestStatus: { $in: crossStatus } })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const getCrossEnrollmentOutgoing = new APIFeatures(Request.find({ "requestorInfo.course": deptCourse, isTrash: false, requestType: 'Cross Enrollment within CICS' })
        .sort({ createdAt: -1 }), req.query)
        .searchRequests()
        .filter()

    const crossEnrollmentIncoming = await getCrossEnrollmentIncoming.query
    const crossEnrollmentOutgoing = await getCrossEnrollmentOutgoing.query

    res.status(200).json({
        success: true,
        crossEnrollmentOutgoing,
        crossEnrollmentIncoming
    })
})