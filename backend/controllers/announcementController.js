const Announcement = require('../models/announcement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new announcement => /api/v1/announcement/new
exports.newAnnouncement = catchAsyncErrors (async (req,res,next)=>{
    const { title, description, course, yearLevel }= req.body;
    let track = req.body.track
    const createdBy = req.user.id;
    const fileAttachments = req.files
    let archiveDate
    if (req.body.setExpiry == true){
        archiveDate = new Date(req.body.archiveDate)
    }else{
        archiveDate = new Date('3000-01-01') //yyyy-mm-dd
    }
    if(yearLevel == '1st Year' || yearLevel =='2nd Year'){
        if(track == "Core Computer Science" || track == "Game Development" || track == "Data Science" ||
        track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" ||
        track == "Business Analytics" || track == "Service Management"){
            return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
        }
        track = 'All'
    }
    if(course == "Computer Science"){
        if(yearLevel == '3rd Year' || yearLevel =='4th Year'){
            if(track == "Core Computer Science" || track == "Game Development" || track == "Data Science" || track == "All"){
            }else{
                return next(new ErrorHandler('Course does not match this track', 400))
            } 
        }
    }
    if(course == "Information Technology"){
        if(yearLevel == '3rd Year' || yearLevel =='4th Year'){
            if(track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" || track == "All"){
            }else{
                return next(new ErrorHandler('Course does not match this track', 400))
            } 
        }
    }
    if(course === "Information Systems"){
        if(yearLevel == '3rd Year' || yearLevel =='4th Year'){
            if(track == "Business Analytics" || track == "Service Management" || track == "All"){
            }else{
                return next(new ErrorHandler('Course does not match this track', 400))
            } 
        }
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
        announcements,
        allIT,
        allIS,
        allCS
    })
})

// Get all unarchived announcements /api/v1/announcements
exports.getArchivedAnnouncements = catchAsyncErrors (async (req,res,next) => {
    const resPerPage = 5;
    const announcementCount = await Announcement.countDocuments()
    const apiFeatures = new APIFeatures(Announcement.find({archiveDate: {$lte: Date.now()}}), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage);
    const announcements = await apiFeatures.query;
    const allIT = await Announcement.find({course: "Information Technology",archiveDate: {$lte: Date.now()}});
    const allIS = await Announcement.find({course: "Information Systems",archiveDate: {$lte: Date.now()}});
    const allCS = await Announcement.find({course: "Computer Science",archiveDate: {$lte: Date.now()}});
    
    res.status(200).json({
        success: true,
        count: announcements.length,
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
    let newTitle,newDescription, newCourse, newYearLevel, newTrack, newArchiveDate
    if(req.body.archiveDate == null || req.body.archiveDate == ''){
        newArchiveDate = announcement.archiveDate
    }else{
        newArchiveDate = req.body.archiveDate
    }  
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
    if(yearLevel == '1st Year' || yearLevel =='2nd Year'){
        if(track == "Core Computer Science" || track == "Game Development" || track == "Data Science" ||
        track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" ||
        track == "Business Analytics" || track == "Service Management"){
            return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
        }
        track = 'All'
    }
    if(course == "Computer Science"){
        if(yearLevel == '3rd Year' || yearLevel =='4th Year'){
            if(track == "Core Computer Science" || track == "Game Development" || track == "Data Science" || track == "All"){
            }else{
                return next(new ErrorHandler('Course does not match this track', 400))
            } 
        }
    }
    if(course == "Information Technology"){
        if(yearLevel == '3rd Year' || yearLevel =='4th Year'){
            if(track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" || track == "All"){
            }else{
                return next(new ErrorHandler('Course does not match this track', 400))
            } 
        }
    }
    if(course === "Information Systems"){
        if(yearLevel == '3rd Year' || yearLevel =='4th Year'){
            if(track == "Business Analytics" || track == "Service Management" || track == "All"){
            }else{
                return next(new ErrorHandler('Course does not match this track', 400))
            } 
        }
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