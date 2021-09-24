const express = require('express')
const router = express.Router()

const { createConversation, getConversations, getSingleConversation, createConvo, getConvo, getBothConvo } = require('../controllers/conversationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/createConversation').post(isAuthenticatedUser, createConversation);
router.route('/conversations').get(isAuthenticatedUser, getConversations);
router.route('/conversation/:conversationId').get(isAuthenticatedUser, getSingleConversation);

//ito yugn ginagamit
//from github
router.route('/createConvo').post(isAuthenticatedUser, createConvo);
router.route('/convo/:userId').get(isAuthenticatedUser, getConvo);
router.route('/find/:firstUserId/:secondUserId').get(isAuthenticatedUser, getBothConvo);

module.exports = router;