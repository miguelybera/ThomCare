const express = require('express')
const router = express.Router()

const { createConversation, getConversations, getSingleConversation, createConvo, getConvo, getBothConvo, deleteConvo } = require('../controllers/conversationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/createConversation').post(isAuthenticatedUser, createConversation);
router.route('/conversations').get(isAuthenticatedUser, getConversations);
router.route('/conversation/:conversationId').get(isAuthenticatedUser, getSingleConversation);

//ito yugn ginagamit
//from github
router.route('/createConvo').post(isAuthenticatedUser, createConvo);
router.route('/convo/:userId').get(isAuthenticatedUser, getConvo);
router.route('/find/:firstUserId/:secondUserId').get(isAuthenticatedUser, getBothConvo);
router.route('/find/:firstUserId/:secondUserId').delete(isAuthenticatedUser,authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Office'), deleteConvo);

module.exports = router;