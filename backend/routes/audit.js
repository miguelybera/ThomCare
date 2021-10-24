const express = require('express')
const router = express.Router()

const { allAudits, createAudit } = require('../controllers/auditController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/admin/auditlogs').get(isAuthenticatedUser, authorizeRoles('CICS Office'), allAudits)
router.route('/new/audit').post(isAuthenticatedUser, createAudit)

module.exports = router