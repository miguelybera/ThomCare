const express = require('express');
const router = express.Router();

const{registerUser, loginUser, logout, forgotPassword, resetPassword, registerStudent,verifyStudent, getUserProfile,updatePassword,
updateProfile, getAllUsers, getUser, updateUserProfile, deleteUser} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

router.route('/admin/register').post(isAuthenticatedUser,authorizeRoles('CICS Staff'),registerUser);
router.route('/login').get(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/registerStudent').post(registerStudent);
router.route('/verify/account/:token').post(verifyStudent);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/admin/me/update').put(isAuthenticatedUser,authorizeRoles('CICS Staff'),updateProfile);
router.route('/admin/allUsers').get(isAuthenticatedUser,authorizeRoles('CICS Staff'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('CICS Staff'),getUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('CICS Staff'),updateUserProfile);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('CICS Staff'),deleteUser);



module.exports = router;