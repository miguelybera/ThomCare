const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const fileMimeTypes = [
    'image/jpeg',
    'image/png',
    'images/jpg',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
]

const {
    submitRequest,
    getMyRequests,
    getSingleRequest,
    requestTracker,

    getDeptChairRequests,
    getOfficeRequests,
    getAllRequests,
    getTrashedRequests,
    getAvailableRequests,
    getAssignedRequests,
    getCrossEnrollment,

    updateRequest,
    deleteRequest,
    trashRequest,
    assignRequestToSelfCICS,
    unassignRequest
} = require('../controllers/requestController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const studentStorage = require('../config/submittedFiles');
const adminStorage = require('../config/returningFiles')

const thomcareUploadStudent = multer({
    storage: studentStorage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null, true)
        }
    }
})

const thomcareUploadAdmin = multer({
    storage: adminStorage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null, true)
        }
    }
})

//all users
router.route('/tracker').post(requestTracker);
router.route('/request/:requestId').get(isAuthenticatedUser, getSingleRequest); // no isAuthenticatedUser because a student can open request details while not signed in because of the tracker

//student
router.route('/submit').post(isAuthenticatedUser, authorizeRoles('Student'), thomcareUploadStudent.array('fileRequirements'), submitRequest);
router.route('/me/requests').get(isAuthenticatedUser, authorizeRoles('Student'), getMyRequests);

//dept chair
router.route('/admin/deptChair/requests').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getDeptChairRequests);
router.route('/admin/deptChair/crossEnrollment').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getCrossEnrollment);

//cics staff
router.route('/admin/cics/all/requests').get(isAuthenticatedUser, authorizeRoles('CICS Office'), getAllRequests); //didnt use it?
router.route('/admin/cics/office/requests').get(isAuthenticatedUser, authorizeRoles('CICS Office'), getOfficeRequests);
router.route('/admin/cics/available/requests').get(isAuthenticatedUser, authorizeRoles('CICS Office'), getAvailableRequests);
router.route('/admin/cics/assign/:requestId').put(isAuthenticatedUser, authorizeRoles('CICS Office'), assignRequestToSelfCICS);
router.route('/admin/cics/me/requests').get(isAuthenticatedUser, authorizeRoles('CICS Office'), getAssignedRequests);
router.route('/admin/cics/unassign/:requestId').put(isAuthenticatedUser, authorizeRoles('CICS Office'), unassignRequest);

//dept chair and cics staff (the trash request can also be used for restoring the request back)
router.route('/admin/requests/trash').get(isAuthenticatedUser, authorizeRoles('CICS Office', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getTrashedRequests);
router.route('/admin/update/:requestId').put(isAuthenticatedUser, thomcareUploadAdmin.array('returningFiles'), authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Office'), updateRequest);
router.route('/admin/trash/:requestId').put(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Office'), trashRequest);

//dept chair, cics staff, student
router.route('/delete/:requestId').delete(isAuthenticatedUser, authorizeRoles('Student', 'CICS Office', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), deleteRequest);

module.exports = router;