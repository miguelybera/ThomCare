const express = require('express')
const router = express.Router()
const{createMessage, getMessages} = require('../controllers/messageController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/createMessage/:conversationId').post(isAuthenticatedUser,createMessage);
router.route('/getMessages/:conversationId').get(isAuthenticatedUser,getMessages);

module.exports = router;