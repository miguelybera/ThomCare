const express = require('express');
const router = express.Router();

const{ 
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
        getChatUser, 
        getChatUsers} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');

//all users
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/chat/user/:id').get(isAuthenticatedUser,getChatUser);
router.route('/chat/users').get(isAuthenticatedUser,getChatUsers);

//student
router.route('/registerStudent').post(registerStudent);
router.route('/verify/account/:token').post(verifyStudent);

//dept chair

//cics staff
router.route('/admin/me/update').put(isAuthenticatedUser,authorizeRoles('CICS Staff'),updateProfile);
router.route('/admin/register').post(isAuthenticatedUser,authorizeRoles('CICS Staff'),registerAdmin);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('CICS Staff'),getUser);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('CICS Staff'),getUsers);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('CICS Staff'),updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('CICS Staff'),deleteUser);

module.exports = router;