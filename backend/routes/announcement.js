const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const ErrorHandler = require('../utils/errorHandler');
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

    getMyAnnouncements,

    getArchivedAnnouncements,
    archiveAnnouncement,
    getHomepageAnnouncements
} = require('../controllers/announcementController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const announcementStorage = require('../config/announcementFiles')

const announcementUpload = multer({
    storage: announcementStorage,
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
router.route('/announcement/:id').get(getSingleAnnouncement);
router.route('/announcements').get(getHomepageAnnouncements);

//student

//dept chair and cics staff
router.route('/admin/me/announcements').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), getMyAnnouncements);
router.route('/admin/unarchivedAnnouncements').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), getUnarchivedAnnouncement);
router.route('/admin/new/announcement').post(isAuthenticatedUser, announcementUpload.array('fileAttachments'), authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), newAnnouncement);
router.route('/admin/announcement/:id').put(isAuthenticatedUser, announcementUpload.array('fileAttachments'), updateAnnouncement);
router.route('/admin/announcement/:id').delete(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), deleteAnnouncement);
router.route('/admin/archivedAnnouncements').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), getArchivedAnnouncements);
router.route('/admin/archiveAnnouncement/:id').put(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), archiveAnnouncement);

module.exports = router;