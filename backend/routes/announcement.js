const express = require('express')
const router = express.Router()


const { getAllAnnouncements, newAnnouncement, getSingleAnnouncement, updateAnnouncement, deleteAnnouncement,getAnnouncements } = require('../controllers/announcementController');

router.route('/admin/allAnnouncements').get(getAllAnnouncements);
router.route('/announcement/new').post(newAnnouncement);
router.route('/announcement/:id').get(getSingleAnnouncement);
router.route('/admin/announcement/:id').put(updateAnnouncement);
router.route('/admin/announcement/:id').delete(deleteAnnouncement);
router.route('/announcements').get(getAnnouncements);

module.exports = router;