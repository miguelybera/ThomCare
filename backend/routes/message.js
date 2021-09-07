const express = require('express')
const router = express.Router()
const { createMessage, getMessages, addMessage, getMessage } = require('../controllers/messageController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/createMessage/:conversationId').post(isAuthenticatedUser, createMessage);
router.route('/getMessages/:conversationId').get(isAuthenticatedUser, getMessages);

//from github
router.route('/createMsg').post(isAuthenticatedUser, addMessage);
router.route('/getMsg/:conversationId').get(isAuthenticatedUser, getMessage);

module.exports = router;