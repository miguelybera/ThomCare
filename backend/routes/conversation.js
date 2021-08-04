const express = require('express')
const router = express.Router()

const{createConversation, getConversations, getSingleConversation} = require('../controllers/conversationController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/createConversation').post(isAuthenticatedUser,createConversation);
router.route('/conversations').get(isAuthenticatedUser,getConversations);
router.route('/conversation/:conversationId').get(isAuthenticatedUser,getSingleConversation);
module.exports = router;