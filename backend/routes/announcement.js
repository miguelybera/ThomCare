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
        getUnarchivedAnnouncement,
        getSingleAnnouncement,

        newAnnouncement,          
        updateAnnouncement, 
        deleteAnnouncement,
        
        getArchivedAnnouncements,
        archiveAnnouncement,
        getHomepageAnnouncements
    } = require('../controllers/announcementController');

const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const announcementStorage = require('../config/announcementFiles')

const announcementUpload = multer({storage: announcementStorage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)){
            return cb(new Error('File type not supported'))
        } else {
            cb(null,true)
        }
    }
})

const imageUpload = multer({storage: announcementStorage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if(!fileMimeTypes.includes(file.mimetype)){
            return cb(new Error('File type not supported'))
        } else {
            cb(null,true)
        }
    }
})

//all users
router.route('/announcement/:id').get(getSingleAnnouncement);
router.route('/announcements').get(getHomepageAnnouncements);

//student

//dept chair and cics staff
router.route('/admin/unarchivedAnnouncements').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'),getUnarchivedAnnouncement);
router.route('/admin/new/announcement').post(isAuthenticatedUser,announcementUpload.fields([{name: 'fileAttachments', maxCount: 5}, {name: 'imageAttachments', maxCount: 5}]),authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'),newAnnouncement);
router.route('/admin/announcement/:id').put(isAuthenticatedUser,announcementUpload.fields([{name: 'fileAttachments', maxCount: 5}, {name: 'imageAttachments', maxCount: 5}]),updateAnnouncement);
router.route('/admin/announcement/:id').delete(isAuthenticatedUser,authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'),deleteAnnouncement);
router.route('/admin/archivedAnnouncements').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), getArchivedAnnouncements);
router.route('/admin/archiveAnnouncement/:id').put(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), archiveAnnouncement);

module.exports = router;