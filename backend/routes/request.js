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
                        'application/pdf'
                    ]

const {
        submitRequest,
        myRequests, 
        getSingleRequest, 
        requestTracker,

        getAllRequestsDeptChair, 
        getAllOfficeRequests,
        getAllRequestsStaff,
        getTrashedRequests,
        getAvailableRequests,
        getAllAssignedRequests,

        updateRequest, 
        deleteRequest, 
        trashRequest,
        assignRequestToSelfCICS
    } = require('../controllers/requestController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const fileStorage = require('../config/fileStorage')

const thomcareUpload = multer({storage: fileStorage,
    fileFilter: function (req, file, cb){
        console.log('pumasok b d2 SA THOMCARE UPLOAD')
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null,true)
        }
    }
})

//all users
router.route('/requestTracker').post(requestTracker);
router.route('/request/:requestId').get(getSingleRequest); // no isAuthenticatedUser because a student can open request details while not signed in because of the tracker

//student
router.route('/submitRequest').post(isAuthenticatedUser, thomcareUpload.array('requiredFiles',5), submitRequest);
router.route('/myRequests').get(isAuthenticatedUser, authorizeRoles('Student'), myRequests);

//dept chair
router.route('/deptChair/requests').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getAllRequestsDeptChair);
router.route('/deptChair/trash').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getTrashedRequests );

//cics staff
router.route('/cicsAdmin/requests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getAllRequestsStaff);
router.route('/cicsAdmin/officeRequests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getAllOfficeRequests);
router.route('/cicsAdmin/trash').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getTrashedRequests );
router.route('/cicsAdmin/available/requests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getAvailableRequests );
router.route('/cicsAdmin/assign/request/:requestId').put(isAuthenticatedUser, authorizeRoles('CICS Staff'), assignRequestToSelfCICS );
router.route('/cicsAdmin/assigned/requests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getAllAssignedRequests );
//dept chair and cics staff
router.route('/admin/updateRequest/:requestId').put(isAuthenticatedUser, thomcareUpload.array('returningFiles',5),authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), updateRequest );
router.route('/admin/trashRequest/:requestId').put(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), trashRequest);

//dept chair, cics staff, student
router.route('/deleteRequest/:requestId').delete(isAuthenticatedUser, authorizeRoles('Student', 'CICS Staff', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), deleteRequest);


module.exports = router;