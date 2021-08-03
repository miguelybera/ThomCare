const express = require('express');
const router = express.Router();

const{registerUser, loginUser, logout, forgotPassword, resetPassword, registerStudent,verifyStudent} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').get(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/registerStudent').post(registerStudent);
router.route('/verify/account/:token').post(verifyStudent);


module.exports = router;