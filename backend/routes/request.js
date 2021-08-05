const express = require('express');
const router = express.Router();

const {submitRequest, myRequests, getSubmittedRequests, getSingleRequest, updateRequest, deleteRequest, requestTracker} = require('../controllers/requestController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/submitRequest').post(isAuthenticatedUser, submitRequest);
router.route('/myRequests').get(isAuthenticatedUser, myRequests);
router.route('/admin/requests').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getSubmittedRequests);
router.route('/request/:requestId').get(getSingleRequest); // no isAuthenticatedUser because a student can open request details while not signed in because of the tracker
router.route('/admin/updateRequest/:requestId').put(isAuthenticatedUser,authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), updateRequest );
router.route('/deleteRequest/:requestId').delete(isAuthenticatedUser, deleteRequest);
router.route('/requestTracker').get(requestTracker);

module.exports = router;