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
const { createForm, getAllForms, getSingleForm, updateForm, deleteForm } = require('../controllers/formController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const formStorage = require('../config/formFiles')
const thomcareUpload = multer({
    storage: formStorage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (!fileMimeTypes.includes(file.mimetype)) {
            return cb(new Error('File type not supported'))
        } else {
            cb(null, true)
        }
    }
})

// Admin
router.route('/admin/new/form').post(isAuthenticatedUser, thomcareUpload.array('attachments'), authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), createForm);
router.route('/admin/form/:formId').put(isAuthenticatedUser, thomcareUpload.array('attachments'), authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), updateForm)
router.route('/admin/form/:formId').delete(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), deleteForm)

//All
router.route('/forms').get(getAllForms);
router.route('/form/:formId').get(isAuthenticatedUser, getSingleForm);

module.exports = router;
