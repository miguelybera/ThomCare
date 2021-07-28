const express = require('express')
const router = express.Router()


const { getAnnouncements } = require('../controllers/announcementController');

router.route('/allAnnouncements').get(getAnnouncements);

module.exports = router;