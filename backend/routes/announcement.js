const express = require('express')
const router = express.Router()


const { getAllAnnouncements, newAnnouncement, getSingleAnnouncement, updateAnnouncement, deleteAnnouncement,getAnnouncements } = require('../controllers/announcementController');

const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');


router.route('/admin/allAnnouncements').get(isAuthenticatedUser, authorizeRoles('CICS Staff'),getAllAnnouncements);
router.route('/announcement/new').post(isAuthenticatedUser,authorizeRoles('CICS Staff'),newAnnouncement);
router.route('/announcement/:id').get(getSingleAnnouncement);
router.route('/admin/announcement/:id').put(isAuthenticatedUser,authorizeRoles('CICS Staff'),updateAnnouncement);
router.route('/admin/announcement/:id').delete(isAuthenticatedUser,authorizeRoles('CICS Staff'),deleteAnnouncement);
router.route('/announcements').get(getAnnouncements);

module.exports = router;