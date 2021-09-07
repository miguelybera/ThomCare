const express = require('express');
const router = express.Router();

const { allAudits } = require('../controllers/auditController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/auditlogs').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), allAudits);

module.exports = router;