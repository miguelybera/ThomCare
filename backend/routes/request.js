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
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env'});


const conn = mongoose.createConnection(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
});

let gfs;
conn.once('open', () =>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('fileStorage');
})

const fileStorage = new GridFsStorage({
    url: process.env.DB_URI,
    file: (req, file) =>{
        return new Promise((resolve, reject)=>{
                
                const filename = Date.now() + '-'+ (file.originalname);
                const fileInfo ={
                    filename: filename,
                    bucketName: 'fileStorage'
                };
                resolve(fileInfo);
            
        })
    }

})

/*
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
*/

const thomcareStudentUpload = multer({storage: fileStorage,
    fileFilter: function (req, file, cb){
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null,true)
        }
    }
})

/*
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
*/

const thomcareAdminUpload = multer({storage: fileStorage,
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
        getSingleRequest, 
        requestTracker,

        getAllRequestsDeptChair, 
        getAllOfficeRequests,
        getAllRequestsStaff,
        getTrashedRequests,

        updateRequest, 
        deleteRequest, 
        trashRequest
    } = require('../controllers/requestController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const { Mongoose } = require('mongoose')

//all users
router.route('/requestTracker').post(requestTracker);
router.route('/request/:requestId').get(getSingleRequest); // no isAuthenticatedUser because a student can open request details while not signed in because of the tracker

//student
router.route('/submitRequest').post(isAuthenticatedUser, thomcareStudentUpload.array('requiredFiles',5), submitRequest);
router.route('/myRequests').get(isAuthenticatedUser, authorizeRoles('Student'), myRequests);

//dept chair
router.route('/deptChair/requests').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getAllRequestsDeptChair);
router.route('/deptChair/trash').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getTrashedRequests );

//cics staff
router.route('/cicsAdmin/requests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getAllRequestsStaff);
router.route('/cicsAdmin/officeRequests').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getAllOfficeRequests);
router.route('/cicsAdmin/trash').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getTrashedRequests );

//dept chair and cics staff
router.route('/admin/updateRequest/:requestId').put(isAuthenticatedUser, thomcareAdminUpload.array('returningFiles',5),authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), updateRequest );
router.route('/admin/trashRequest/:requestId').put(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), trashRequest);

//dept chair, cics staff, student
router.route('/deleteRequest/:requestId').delete(isAuthenticatedUser, authorizeRoles('Student', 'CICS Staff', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), deleteRequest);


module.exports = router;