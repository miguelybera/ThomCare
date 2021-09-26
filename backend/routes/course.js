const express = require('express');
const router = express.Router();

const { newCourse, getAllCourses, getSingleCourse, deleteCourse, updateCourse } = require('../controllers/courseController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/new/course').post(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), newCourse);
router.route('/courses').get(isAuthenticatedUser, getAllCourses);
router.route('/course/:id').get(isAuthenticatedUser, getSingleCourse);
router.route('/admin/course/:id').put(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), updateCourse);
router.route('/admin/course/:id').delete(isAuthenticatedUser, authorizeRoles('IT Dept Chair', 'CS Dept Chair', 'IS Dept Chair', 'CICS Staff'), deleteCourse);

module.exports = router;