const Course = require('../models/course');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');


// Create course => /api/v1/admin/new/course

exports.newCourse = catchAsyncErrors (async (req,res,next)=>{
    const { courseCode, courseName, lecUnits, labUnits }= req.body;

    const course = await Course.create({
        courseCode,
        courseName,
        lecUnits,
        labUnits
    });

    res.status(201).json({
        success: true,
        course
    })

})

// view all courses => /api/v1/courses
exports.getAllCourses = catchAsyncErrors (async (req,res,next)=>{

    const courses = await Course.find();
    
    
    res.status(200).json({
        success: true,
        courses
       
    })
})

//delete course => /api/v1/course/:id

exports.deleteCourse = catchAsyncErrors(async (req,res,next)=>{
    const course = await Course.findById(req.params.id);
    if(!course){
        return next(new ErrorHandler('Course Not Found', 404))
    }
    await course.remove()
    res.status(200).json({
        success: true,
        message: "Course deleted"
    })
})

//update course => /api/v1/course/:id
exports.updateCourse = catchAsyncErrors(async (req,res,next)=>{

    let course = await Course.findById(req.params.id);
    if(!course){
        return next(new ErrorHandler('Course Not Found', 404))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        course
       
    })
})