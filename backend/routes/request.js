const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
const fileMimeTypes = ['image/jpeg', 'image/png', 'images/jpg', 'application/vnd.ms-excel',
'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
const fileStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        const ext = path.extname(file.originalname);
        if(!fileMimeTypes.includes(file.mimetype)){
            return cb(new Error('File type not supported'))
        }else{
            cb(null,'./backend/submittedFiles')
        }
    },
    filename:(req,file,cb) =>{
        const { originalname } = file
        cb(null, `${Date.now()}-${req.user.studentNumber}-${originalname}`)
    }
})
const thomcareUpload = multer({storage: fileStorage,
    fileFilter: function (req, file, cb){
        const ext = path.extname(file.originalname);
        if(!fileMimeTypes.includes(file.mimetype)){
            return cb(new Error('File type not supported'))
        }else{
            cb(null,true)
        }
    }
})

const {submitRequest, myRequests, getSubmittedRequests, getSingleRequest, updateRequest, deleteRequest, requestTracker} = require('../controllers/requestController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/submitRequest').post(isAuthenticatedUser, thomcareUpload.array('requiredFiles',5), submitRequest);
router.route('/myRequests').get(isAuthenticatedUser, myRequests);
router.route('/admin/requests').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getSubmittedRequests);
router.route('/request/:requestId').get(getSingleRequest); // no isAuthenticatedUser because a student can open request details while not signed in because of the tracker
router.route('/admin/updateRequest/:requestId').put(isAuthenticatedUser,authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), updateRequest );
router.route('/deleteRequest/:requestId').delete(isAuthenticatedUser, deleteRequest);
router.route('/requestTracker').get(requestTracker);

module.exports = router;