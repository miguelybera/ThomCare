const express = require('express')
const router = express.Router()


const { getAnnouncements, newAnnouncement, getSingleAnnouncement, updateAnnouncement } = require('../controllers/announcementController');

router.route('/allAnnouncements').get(getAnnouncements);
router.route('/announcement/new').post(newAnnouncement);
router.route('/announcement/:id').get(getSingleAnnouncement);
router.route('/admin/announcement/:id').put(updateAnnouncement);

module.exports = router;