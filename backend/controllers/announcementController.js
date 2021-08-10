const Announcement = require('../models/announcement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new announcement => /api/v1/announcement/new
exports.newAnnouncement = catchAsyncErrors (async (req,res,next)=>{
    const { title, description, course, yearLevel, track}= req.body;
   const createdBy = req.user.id;
    const fileAttachments = req.files
    let archiveDate
    if (req.body.setExpiry == true){
        const { expiryYear, expiryMonth, expiryDay }= req.body;
        if(expiryYear=='' ||expiryMonth==''||expiryDay=='' ){
            return next(new ErrorHandler('Please input expiry date'))
        }
        if(expiryYear == null ||expiryMonth==null||expiryDay==null ){
            return next(new ErrorHandler('Please input expiry date'))
        }
        archiveDate = `${expiryYear}-${expiryMonth}-${expiryDay}T08:30:21.492Z`
        
    }else{
        archiveDate = "3000-08-05T08:30:21.492Z"
    }
    if(course === "Computer Science"){
        if(yearLevel === '3rd Year' || yearLevel =='4th Year'){
            if(track !== "Core Computer Science"&&track !== "Game Development"&&track !== "Data Science"&&track !== "All"){
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if(course === "Information Technology"){
        if(yearLevel === '3rd Year' || yearLevel =='4th Year'){
            if(track !== "Network and Security"&&track !== "Web and Mobile App Development"&&track !== "IT Automation"&&track !== "All"){
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if(course === "Information Systems"){
        if(yearLevel === '3rd Year' || yearLevel =='4th Year'){
            if(track !== "Business Analytics"&&track !== "Service Management"&&track !== "All"){
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
        if(yearLevel === '1st Year' || yearLevel =='2nd Year'){
           track = 'N/A'
        }
    
    const announcement = await Announcement.create({
        title, 
        description, 
        course, 
        yearLevel, 
        track,
        archiveDate,
        createdBy,
        fileAttachments

    });

    res.status(201).json({
        success: true,
        announcement
    })

})

// Get all announcements /api/v1/admin/allAnnouncements
exports.getAllAnnouncements = catchAsyncErrors (async (req,res,next) => {
    const resPerPage = 15;
    const announcementCount = await Announcement.countDocuments()
    const apiFeatures = new APIFeatures(Announcement.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage);
    const announcements = await apiFeatures.query;
    const allIT = await Announcement.find({course: "Information Technology"});
    const allIS = await Announcement.find({course: "Information Systems"});
    const allCS = await Announcement.find({course: "Computer Science"});
   
    res.status(200).json({
        success: true,
        count: announcements.length,
        announcements,
        allIT,
        allIS,
        allCS
    })
})

// Get all unarchived announcements /api/v1/announcements
exports.getAnnouncements = catchAsyncErrors (async (req,res,next) => {
    const resPerPage = 5;
    const announcementCount = await Announcement.countDocuments()
    const apiFeatures = new APIFeatures(Announcement.find({archiveDate: {$gte: Date.now()}}), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage);
    const announcements = await apiFeatures.query;
    const allIT = await Announcement.find({course: "Information Technology",archiveDate: {$gte: Date.now()}});
    const allIS = await Announcement.find({course: "Information Systems",archiveDate: {$gte: Date.now()}});
    const allCS = await Announcement.find({course: "Computer Science",archiveDate: {$gte: Date.now()}});
    
    res.status(200).json({
        success: true,
        count: announcements.length,
        announcementCount,
        announcements,
        allIT,
        allIS,
        allCS
    })
})

// Get single announcement /api/v1/announcement/:id

exports.getSingleAnnouncement = catchAsyncErrors (async (req, res, next) =>{
    const announcement = await Announcement.findById(req.params.id);
    
    if(!announcement){
       return next(new ErrorHandler('Announcement Not Found', 404))
    }

    res.status(200).json({
        success: true,
        announcement
    })

})

// Update announcement /api/v1/admin/announcement/:id
exports.updateAnnouncement = catchAsyncErrors (async(req,res,next) =>{
    let announcement = await Announcement.findById(req.params.id);
    if(!announcement){
        return next(new ErrorHandler('Announcement Not Found', 404))
    }
    let newTitle,newDescription, newCourse, newYearLevel, newTrack
    if(req.body.title == null || req.body.title == ''){
        newTitle = announcement.title
    }else{
        newTitle = req.body.title
    }
    if(req.body.description == null || req.body.description == ''){
        newDescription = announcement.description
    }else{
        newDescription = req.body.description
    }
    if(req.body.course == null || req.body.course == ''){
        newCourse = announcement.course
    }else{
        newCourse = req.body.course
    }
    if(req.body.yearLevel == null || req.body.yearLevel == ''){
        newYearLevel = announcement.yearLevel
    }else{
        newYearLevel = req.body.yearLevel
    }
    if(req.body.track == null || req.body.track == ''){
        newTrack = announcement.track
    }else{
        newTrack = req.body.track
    }
    let newAnnouncementData = {
        title: newTitle,
        description: newDescription,
        course: newCourse,
        yearLevel: newYearLevel,
        track: newTrack
    }
    if(req.files != null || req.files != ''){
        newAnnouncementData = {
            title: newTitle,
            description: newDescription,
            course: newCourse,
            yearLevel: newYearLevel,
            track: newTrack,
            fileAttachments: req.files
        }
    }
    let existingAttachments = announcement.fileAttachments
    announcement = await Announcement.findByIdAndUpdate(req.params.id, newAnnouncementData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        announcement
    })

})


// delete announcement /api/v1/admin/announcement/:id
exports.deleteAnnouncement = catchAsyncErrors (async(req,res,next) =>{
    const announcement = await Announcement.findById(req.params.id);
    if(!announcement){
        return next(new ErrorHandler('Announcement Not Found', 404))
    }
    await announcement.remove()
    res.status(200).json({
        success: true,
        message: "Announcement deleted"
    })

})