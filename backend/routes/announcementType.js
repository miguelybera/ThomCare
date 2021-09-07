const express = require('express');
const router = express.Router();

const { createAnnouncementType, getAnnouncementTypes, deleteAnnouncementType } = require('../controllers/announcementTypeController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/createAnnouncementType').post(isAuthenticatedUser, authorizeRoles('CICS Staff', 'IT Dept Chair', 'IS Dept Chair', 'CS Dept Chair'), createAnnouncementType);
router.route('/announcementTypes').get(getAnnouncementTypes)
router.route('/admin/announcementType/:announcementTypeId').delete(isAuthenticatedUser, authorizeRoles('CICS Staff', 'IT Dept Chair', 'IS Dept Chair', 'CS Dept Chair'), deleteAnnouncementType);

module.exports = router;