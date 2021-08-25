const Announcement = require('../models/announcement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');


const conn = mongoose.connection;

let gfs;
conn.once('open', () =>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('fileStorage');
})

// Create new announcement => /api/v1/new/announcement
exports.newAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const { title, description, course, yearLevel, announcementType, setExpiry } = req.body;
    let track = req.body.track
    const createdBy = req.user.id;
    const fileAttachments = req.files
    let archiveDate
    if (req.body.setExpiry == true) {
        archiveDate = new Date(req.body.archiveDate)
    } else {
        archiveDate = new Date('3000-01-01') //yyyy-mm-dd
    }
    if (yearLevel == '1st Year' || yearLevel == '2nd Year') {
        if (track == "Core Computer Science" || track == "Game Development" || track == "Data Science" ||
            track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" ||
            track == "Business Analytics" || track == "Service Management") {
            return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
        }
        track = 'All'
    }
    if (course == "Computer Science") {
        if (yearLevel == '3rd Year' || yearLevel == '4th Year') {
            if (track == "Core Computer Science" || track == "Game Development" || track == "Data Science" || track == "All") {
            } else {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if (course == "Information Technology") {
        if (yearLevel == '3rd Year' || yearLevel == '4th Year') {
            if (track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" || track == "All") {
            } else {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if (course === "Information Systems") {
        if (yearLevel == '3rd Year' || yearLevel == '4th Year') {
            if (track == "Business Analytics" || track == "Service Management" || track == "All") {
            } else {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if (course == "Computer Science") {
        if (track == "Core Computer Science" || track == "Game Development" || track == "Data Science" || track == "All") {
        } else {
            return next(new ErrorHandler('Course does not match this track', 400))
        }
    }
    if (course == "Information Technology") {
        if (track == "Network and Security" || track == "Web and Mobile App Development" || track == "IT Automation" || track == "All") {
        } else {
            return next(new ErrorHandler('Course does not match this track', 400))
        }
    }
    if (course === "Information Systems") {
        if (track == "Business Analytics" || track == "Service Management" || track == "All") {
        } else {
            return next(new ErrorHandler('Course does not match this track', 400))
        }
    }
    if(yearLevel == 'All'){
        if (track != 'All'){
            return next(new ErrorHandler('1st year and 2nd year do not have tracks', 400))
        }
    }
    if(course == 'All'){
        if (track != 'All'){
            return next(new ErrorHandler('1st year and 2nd year do not have tracks', 400))
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
        fileAttachments,
        announcementType,
        setExpiry

    });

    res.status(201).json({
        success: true,
        announcement
    })
})

// Get all unarchived announcements /api/v1/announcements (For website Home page)
exports.getAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 10;
    const announcementCount = await Announcement.countDocuments({ archiveDate: { $gte: Date.now() } })
    const apiFeatures = new APIFeatures(Announcement.find({ archiveDate: { $gte: Date.now() } }), req.query)
        .search()
        .filter()
    let announcements = await apiFeatures.query;
    let filteredAnnouncementsCount = announcements.length

    apiFeatures.pagination(resPerPage)

    announcements = await apiFeatures.query;


    res.status(200).json({
        success: true,
        announcementCount,
        announcements,
        resPerPage,
        filteredAnnouncementsCount
    })
})

// Get all archived announcements /api/v1/announcements (FOR  PUBLIC)
exports.getArchivedAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const announcementCount = await Announcement.countDocuments({ archiveDate: { $lte: Date.now() } })
    const apiFeatures = new APIFeatures(Announcement.find({ archiveDate: { $lte: Date.now() } }), req.query)
        .search()
        .filter()

    let announcements = await apiFeatures.query;

    res.status(200).json({
        success: true,
        announcements,
        announcementCount,
        resPerPage: '',
        filteredAnnouncementsCount: ''
    })
})

// Get single announcement /api/v1/announcement/:id
exports.getSingleAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        return next(new ErrorHandler('Announcement Not Found', 404))
    }

    res.status(200).json({
        success: true,
        announcement
    })
})

// Update announcement /api/v1/admin/announcement/:id
exports.updateAnnouncement = catchAsyncErrors(async (req, res, next) => {
    let announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
        return next(new ErrorHandler('Announcement Not Found', 404))
    }
    let newTitle, newDescription, newCourse, newYearLevel, newTrack, newArchiveDate, newAnnouncementType, newSetExpiry, newAnnouncementFiles
    if (req.body.archiveDate == null || req.body.archiveDate == '') {
        newArchiveDate = announcement.archiveDate
    } else {
        newArchiveDate = new Date(req.body.archiveDate)
    }
    if (req.body.setExpiry === null) {
        newSetExpiry = announcement.setExpiry
    } else {
        newSetExpiry = req.body.setExpiry
        
        if (newSetExpiry === true) {
            newArchiveDate = new Date(req.body.archiveDate)
        } else{
            newArchiveDate = new Date('3000-01-01') //yyyy-mm-dd
        }
        
    }
    if (req.body.title == null || req.body.title == '') {
        newTitle = announcement.title
    } else {
        newTitle = req.body.title
    }
    if (req.body.description == null || req.body.description == '') {
        newDescription = announcement.description
    } else {
        newDescription = req.body.description
    }
    if (req.body.announcementType == null || req.body.announcementType == '') {
        newAnnouncementType = announcement.announcementType
    } else {
        newAnnouncementType = req.body.announcementType
    }
    if (req.body.course == null || req.body.course == '') {
        newCourse = announcement.course
    } else {
        newCourse = req.body.course
    }
    if (req.body.yearLevel == null || req.body.yearLevel == '') {
        newYearLevel = announcement.yearLevel
    } else {
        newYearLevel = req.body.yearLevel
    }
    if (req.body.track == null || req.body.track == '') {
        newTrack = announcement.track
    } else {
        newTrack = req.body.track
    }
    if (req.files == null || req.files == ''){
        newAnnouncementFiles = announcement.fileAttachments
    }else{
        newAnnouncementFiles = req.files
    }
    if (newYearLevel == '1st Year' || newYearLevel == '2nd Year') {
        if (newTrack == "Core Computer Science" || newTrack == "Game Development" || newTrack == "Data Science" ||
            newTrack == "Network and Security" || newTrack == "Web and Mobile App Development" || newTrack == "IT Automation" ||
            newTrack == "Business Analytics" || newTrack == "Service Management") {
            return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
        }
        newTrack = 'All'
    }
    if (newCourse == "Computer Science") {
        if (newYearLevel == '3rd Year' || newYearLevel == '4th Year') {
            if (newTrack == "Core Computer Science" || newTrack == "Game Development" || newTrack == "Data Science" || newTrack == "All") {
            } else {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if (newCourse == "Information Technology") {
        if (newYearLevel == '3rd Year' || newYearLevel == '4th Year') {
            if (newTrack == "Network and Security" || newTrack == "Web and Mobile App Development" || newTrack == "IT Automation" || newTrack == "All") {
            } else {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if (newCourse === "Information Systems") {
        if (newYearLevel == '3rd Year' || newYearLevel == '4th Year') {
            if (newTrack == "Business Analytics" || newTrack == "Service Management" || newTrack == "All") {
            } else {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
        }
    }
    if (newCourse == "Computer Science") {
        if (newTrack == "Core Computer Science" || newTrack == "Game Development" || newTrack == "Data Science" || newTrack == "All") {
        } else {
            return next(new ErrorHandler('Course does not match this track', 400))
        }
    }
    if (newCourse == "Information Technology") {
        if (newTrack == "Network and Security" || newTrack == "Web and Mobile App Development" || newTrack == "IT Automation" || newTrack == "All") {
        } else {
            return next(new ErrorHandler('Course does not match this track', 400))
        }
    }
    if (newCourse === "Information Systems") {
        if (newTrack == "Business Analytics" || newTrack == "Service Management" || newTrack == "All") {
        } else {
            return next(new ErrorHandler('Course does not match this track', 400))
        }
    }
    if(newYearLevel == 'All'){
        if (newTrack != 'All'){
            return next(new ErrorHandler('1st year and 2nd year do not have tracks', 400))
        }
    }
    if(newCourse == 'All'){
        if (newTrack != 'All'){
            return next(new ErrorHandler('1st year and 2nd year do not have tracks', 400))
        }
    }
    let  newAnnouncementData = {
            title: newTitle,
            description: newDescription,
            course: newCourse,
            yearLevel: newYearLevel,
            track: newTrack,
            announcementType: newAnnouncementType,
            setExpiry: newSetExpiry,
            archiveDate: newArchiveDate,
            fileAttachments: newAnnouncementFiles
        }
     
    announcement = await Announcement.findByIdAndUpdate(req.params.id, newAnnouncementData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        announcement,
        newSetExpiry
    })

})


// delete announcement /api/v1/admin/announcement/:id
exports.deleteAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
        return next(new ErrorHandler('Announcement Not Found', 404))
    }
    const filesAttached = announcement.fileAttachments
    fileLength= filesAttached.length
    let arrayIds = []
    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].id) 
      }

      gfs.remove({_id: arrayIds, root: 'fileStorage'}, (err, gridStore) =>{
        if (err){
          return next(new ErrorHandler('Error deleting file'))
        }
    });
    await announcement.remove()
    res.status(200).json({
        success: true,
        message: "Announcement deleted"
    })

})


// archive announcement /api/v1/admin/archiveAnnouncement/:id
exports.archiveAnnouncement = catchAsyncErrors(async (req, res, next) => {
    let announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
        return next(new ErrorHandler('Announcement Not Found', 404))
    }

    const newAnnouncementData = {
        archiveDate: Date.now() - 1000
    }
    announcement = await Announcement.findByIdAndUpdate(req.params.id, newAnnouncementData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "Announcement moved to archives"
    })
})

