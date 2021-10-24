const express = require('express')
const router = express.Router()
const { addMessage, getMessage } = require('../controllers/messageController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/create/message').post(isAuthenticatedUser, addMessage)
router.route('/message/:conversationId').get(isAuthenticatedUser, getMessage)

module.exports = router