const Announcement = require('../models/announcement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new announcement => /api/v1/announcement/new
exports.newAnnouncement = catchAsyncErrors (async (req,res,next)=>{
   
    req.body.createdBy = req.user.id;
    if (req.body.setExpiry == true){
        const { expiryYear, expiryMonth, expiryDay }= req.body;
        if(expiryYear=='' ||expiryMonth==''||expiryDay=='' ){
            return next(new ErrorHandler('Please input expiry date'))
        }
        if(expiryYear == null ||expiryMonth==null||expiryDay==null ){
            return next(new ErrorHandler('Please input expiry date'))
        }
        req.body.archiveDate = `${expiryYear}-${expiryMonth}-${expiryDay}T08:30:21.492Z`
        
    }else{
        req.body.archiveDate = "3000-08-05T08:30:21.492Z"
    }
    if(req.body.course === "Computer Science"){
        if(req.body.yearLevel === '3rd Year' || req.body.yearLevel =='4th Year'){
            if(req.body.track !== "Core Computer Science"&&req.body.track !== "Game Development"&&req.body.track !== "Data Science"&&req.body.track !== "All"){
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if(req.body.course === "Information Technology"){
        if(req.body.yearLevel === '3rd Year' || req.body.yearLevel =='4th Year'){
            if(req.body.track !== "Network and Security"&&req.body.track !== "Web and Mobile App Development"&&req.body.track !== "IT Automation"&&req.body.track !== "All"){
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if(req.body.course === "Information Systems"){
        if(req.body.yearLevel === '3rd Year' || req.body.yearLevel =='4th Year'){
            if(req.body.track !== "Business Analytics"&&req.body.track !== "Service Management"&&req.body.track !== "All"){
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
        if(req.body.yearLevel === '1st Year' || req.body.yearLevel =='2nd Year'){
            req.body.track = 'N/A'
        }
    
    
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