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

const fileStorageStudent = multer.diskStorage({
    destination:(req,file,cb) => {
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)){
            return cb(new Error('File type not supported'))
        } else {
            cb(null,'./backend/submittedFiles')
        }
    },
    filename:(req,file,cb) => {
        const { originalname } = file
        cb(null, `${Date.now()}-${originalname}`)
    }
})

const thomcareStudentUpload = multer({storage: fileStorageStudent,
    fileFilter: function (req, file, cb){
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null,true)
        }
    }
})

const fileStorageAdmin = multer.diskStorage({
    destination:(req,file,cb) => {
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null,'./backend/returnFiles')
        }
    },
    filename:(req,file,cb) => {
        const { originalname } = file
        cb(null, `${Date.now()}-${originalname}`)
    }
})

const thomcareAdminUpload = multer({storage: fileStorageAdmin,
    fileFilter: function (req, file, cb){
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null,true)
        }
    }
})

const {
        submitRequest,
        myRequests, 
        getSubmittedRequests, 
        getSingleRequest, 
        updateRequest, 
        deleteRequest, 
        requestTracker,
        getSubmittedRequestsCICSStaff
    } = require('../controllers/requestController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

//all users
router.route('/requestTracker').get(requestTracker);
router.route('/request/:requestId').get(getSingleRequest); // no isAuthenticatedUser because a student can open request details while not signed in because of the tracker

//student
router.route('/submitRequest').post(isAuthenticatedUser, thomcareStudentUpload.array('requiredFiles',5), submitRequest);
router.route('/deleteRequest/:requestId').delete(isAuthenticatedUser, authorizeRoles('Student'), deleteRequest);
router.route('/myRequests').get(isAuthenticatedUser, authorizeRoles('Student'), myRequests);

//dept chair
router.route('/admin/requests').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getSubmittedRequests);

//cics staff
router.route('/cicsAdmin/requests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getSubmittedRequestsCICSStaff);

//dept chair and cics staff
router.route('/admin/updateRequest/:requestId').put(isAuthenticatedUser, thomcareAdminUpload.array('returningFiles',5),authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), updateRequest );



module.exports = router;