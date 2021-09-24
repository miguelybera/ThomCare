const express = require('express');
const router = express.Router();

const {
    login,
    logout,
    forgotPassword,
    resetPassword,
    registerStudent,
    verifyStudent,
    getUserProfile,
    updatePassword,
    registerAdmin,
    updateProfile,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getStudentAccounts,
    getChatAccounts
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//all users
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/chat/user/:id').get(isAuthenticatedUser, getUser);
router.route('/chat/users').get(isAuthenticatedUser, getChatAccounts);
router.route('/announcement/user/:id').get(getUser);

router.route('/admin/me/update').put(isAuthenticatedUser, authorizeRoles('CICS Staff', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), updateProfile);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('CICS Staff', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getUser);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('CICS Staff', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('CICS Staff', 'IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), deleteUser);

//student
router.route('/registerStudent').post(registerStudent);
router.route('/verify/account/:token').post(verifyStudent);

//dept chair
router.route('/deptChair/users').get(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair'), getStudentAccounts);

//cics staff
router.route('/admin/register').post(isAuthenticatedUser, authorizeRoles('CICS Staff'), registerAdmin);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('CICS Staff'), getUsers);

module.exports = router;