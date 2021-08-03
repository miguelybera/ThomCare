const Announcement = require('../models/announcement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');




// Create new announcement => /api/v1/announcement/new
exports.newAnnouncement = catchAsyncErrors (async (req,res,next)=>{
   
    req.body.createdBy = req.user.id;
    const announcement = await Announcement.create(req.body);

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
        announcementCount,
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
    announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
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