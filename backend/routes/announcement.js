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

const announcementStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        const ext = path.extname(file.originalname);
        if(!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null,'./backend/announcementFiles')
        }
    },
    filename:(req,file,cb) => {
        const { originalname } = file
        cb(null, `${Date.now()}-${originalname}`)
    }
})

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


const { 
        getAnnouncements,
        getSingleAnnouncement,

        newAnnouncement,          
        updateAnnouncement, 
        deleteAnnouncement,
        
        getArchivedAnnouncements,
        archiveAnnouncement
    } = require('../controllers/announcementController');

const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

//all users
router.route('/announcement/:id').get(getSingleAnnouncement);
router.route('/announcements').get(getAnnouncements);

//student

//cics staff
router.route('/admin/announcements').get(isAuthenticatedUser, authorizeRoles('CICS Staff'),getAnnouncements);
router.route('/admin/new/announcement').post(isAuthenticatedUser,announcementUpload.array('announcementFiles',5),authorizeRoles('CICS Staff'),newAnnouncement);
router.route('/admin/announcement/:id').put(isAuthenticatedUser,announcementUpload.array('announcementFiles',5),authorizeRoles('CICS Staff'),updateAnnouncement);
router.route('/admin/announcement/:id').delete(isAuthenticatedUser,authorizeRoles('CICS Staff'),deleteAnnouncement);
router.route('/admin/archivedAnnouncements').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getArchivedAnnouncements);
router.route('/admin/archiveAnnouncement/:id').put(isAuthenticatedUser, authorizeRoles('CICS Staff'), archiveAnnouncement);

module.exports = router;