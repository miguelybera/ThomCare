const express = require('express')
const router = express.Router()

const { createConversation, getConversations, getBothConversation, deleteConversation } = require('../controllers/conversationController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

//from github
router.route('/create/conversation').post(isAuthenticatedUser, createConversation)
router.route('/conversations/:userId').get(isAuthenticatedUser, getConversations)
router.route('/find/:firstUserId/:secondUserId').get(isAuthenticatedUser, getBothConversation)
router.route('/delete/:id').delete(isAuthenticatedUser,authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Office'), deleteConversation)

module.exports = router