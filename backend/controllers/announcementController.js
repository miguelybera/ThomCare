const Announcement = require('../models/announcement');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary').v2;

const csTracks = ["All", "Core Computer Science", "Game Development", "Data Science"]
const itTracks = ["All", "Network and Security", "Web and Mobile App Development", "IT Automation"]
const isTracks = ["All", "Business Analytics", "Service Management"]

const toBoolean = (str) => {
    if (str === 'true') {
        return true
    } else {
        return false
    }
}

// Create new announcement => /api/v1/new/announcement
exports.newAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const { title, description, course, yearLevel, announcementType, setExpiry } = req.body
    const createdBy = req.user.id
    const fileAttachments = req.files
    let track = req.body.track ? req.body.track : 'All', archiveDate = new Date('3000-01-01')

    if (toBoolean(req.body.setExpiry)) {
        if (req.body.archiveDate !== null || req.body.archiveDate !== undefined || req.body.archiveDate !== '') {
            archiveDate = new Date(req.body.archiveDate)
        } else {
            return next(new ErrorHandler('Archive date is needed'))
        }
    }

    switch (yearLevel) {
        case '1st Year':
        case '2nd Year':
        case 'All':
            if (track !== 'All') {
                return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
            }
            break
        case '3rd Year':
        case '4th Year':
            switch (course) {
                case 'Computer Science':
                    if (!csTracks.includes(track)) {
                        return next(new ErrorHandler('Course does not match this track', 400))
                    }
                    break
                case 'Information Technology':
                    if (!itTracks.includes(track)) {
                        return next(new ErrorHandler('Course does not match this track', 400))
                    }
                    break
                case 'Information Systems':
                    if (!isTracks.includes(track)) {
                        return next(new ErrorHandler('Course does not match this track', 400))
                    }
                    break
            }
        default:
    }

    switch (course) {
        case 'Computer Science':
            if (!csTracks.includes(track)) {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
            break
        case 'Information Technology':
            if (!itTracks.includes(track)) {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
            break
        case 'Information Systems':
            if (!isTracks.includes(track)) {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
            break
        case 'All':
            if (track !== 'All') {
                return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
            }
            break
        default:
    }

    const announcement = await Announcement.create({
        title,
        description,
        course,
        yearLevel,
        track,
        archiveDate,
        createdBy,
        createdAt: Date.now(),
        fileAttachments,
        announcementType,
        setExpiry,
        createdAt: new Date(Date.now())
    })

    res.status(201).json({
        success: true,
        announcement
    })
})

// Get all unarchived announcements /api/v1/announcements (For website Home page)
exports.getHomepageAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 10
    const announcementCount = await Announcement.countDocuments({ archiveDate: { $gte: Date.now() } })
    const apiFeatures = new APIFeatures(Announcement.find({ archiveDate: { $gte: Date.now() } }).sort({ createdAt: -1 }), req.query).search().filter().pagination(resPerPage)

    let announcements = await apiFeatures.query
    let filteredAnnouncementsCount = announcements.length

    res.status(200).json({
        success: true,
        announcementCount,
        announcements,
        filteredAnnouncementsCount,
        resPerPage
    })
})

// Get all unarchived announcements /api/v1/admin/unarchivedAnnouncements (For Admin)
exports.getUnarchivedAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcementCount = await Announcement.countDocuments({ archiveDate: { $gte: Date.now() } })
    const apiFeatures = new APIFeatures(Announcement.find({ archiveDate: { $gte: Date.now() } }).sort({ createdAt: -1 }), req.query).search().filter()

    let announcements = await apiFeatures.query
    let filteredAnnouncementsCount = announcements.length

    res.status(200).json({
        success: true,
        announcementCount,
        announcements,
        filteredAnnouncementsCount
    })
})

// Get all archived announcements /api/v1/admin/archivedAnnouncements (For admin only)
exports.getArchivedAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const announcementCount = await Announcement.countDocuments({ archiveDate: { $lte: Date.now() } })
    const apiFeatures = new APIFeatures(Announcement.find({ archiveDate: { $lte: Date.now() } }).sort({ createdAt: -1 }), req.query).search().filter()

    let announcements = await apiFeatures.query

    res.status(200).json({
        success: true,
        announcements,
        announcementCount
    })
})

// Get single announcement /api/v1/announcement/:id
exports.getSingleAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) { return next(new ErrorHandler('Announcement Not Found', 404)) }

    res.status(200).json({
        success: true,
        announcement
    })
})

// Get my announcements /api/v1/me/announcements
exports.getMyAnnouncements = catchAsyncErrors(async (req, res, next) => {
    const announcementCount = await Announcement.countDocuments({ createdBy: req.user.id })
    const apiFeatures = new APIFeatures(Announcement.find({ createdBy: req.user.id,
                                                            archiveDate: { $gte: Date.now() }  }).sort({ createdAt: -1 }), req.query).search().filter()

    let announcements = await apiFeatures.query

    res.status(200).json({
        success: true,
        announcements,
        announcementCount
    })
})

// Update announcement /api/v1/admin/announcement/:id
exports.updateAnnouncement = catchAsyncErrors(async (req, res, next) => {
    let announcement = await Announcement.findById(req.params.id)

    if (!announcement) { return next(new ErrorHandler('Announcement Not Found', 404)) }

    let yearLevel = req.body.yearLevel ? req.body.yearLevel : announcement.yearLevel
    let course = req.body.course ? req.body.course : announcement.course
    let title = req.body.title ? req.body.title : announcement.title
    let description = req.body.description ? req.body.description : announcement.description
    let announcementType = req.body.announcementType ? req.body.announcementType : announcement.announcementType
    let track = req.body.track ? req.body.track : 'All'
    let newAttachments = req.files

    switch (yearLevel) {
        case '1st Year':
        case '2nd Year':
        case 'All':
            if (track !== 'All') {
                return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
            }
            break
        case '3rd Year':
        case '4th Year':
            switch (course) {
                case 'Computer Science':
                    if (!csTracks.includes(track)) {
                        return next(new ErrorHandler('Course does not match this track', 400))
                    }
                    break
                case 'Information Technology':
                    if (!itTracks.includes(track)) {
                        return next(new ErrorHandler('Course does not match this track', 400))
                    }
                    break
                case 'Information Systems':
                    if (!isTracks.includes(track)) {
                        return next(new ErrorHandler('Course does not match this track', 400))
                    }
                    break
            }
        default:
    }

    switch (course) {
        case 'Computer Science':
            if (!csTracks.includes(track)) {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
            break
        case 'Information Technology':
            if (!itTracks.includes(track)) {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
            break
        case 'Information Systems':
            if (!isTracks.includes(track)) {
                return next(new ErrorHandler('Course does not match this track', 400))
            }
            break
        case 'All':
            if (track !== 'All') {
                return next(new ErrorHandler('1st year and 2nd year do not have tracks'))
            }
            break
        default:
    }

    let setExpiry = req.body.setExpiry === null || req.body.setExpiry === undefined ? announcement.setExpiry : toBoolean(req.body.setExpiry)
    let archiveDate = req.body.setExpiry === null || req.body.setExpiry === undefined ? announcement.archiveDate : req.body.archiveDate

    if (setExpiry) {
        if (req.body.archiveDate !== null || req.body.archiveDate !== undefined || req.body.archiveDate !== '') {
            archiveDate = new Date(req.body.archiveDate)
        } else {
            return next(new ErrorHandler('Archive date is needed'))
        }
    } else {
        archiveDate = new Date('3000-01-01') //yyyy-mm-dd
    }

    const oldAttachments = announcement.fileAttachments
    const attachmentsLength = oldAttachments && oldAttachments.length
    let arrayIds = []

    for (let i = 0; i < attachmentsLength; i++) {
        arrayIds.push(oldAttachments[i].filename)
    }

    if (newAttachments == null || newAttachments == '') {
        newAttachments = announcement.fileAttachments
    } else {
        if (arrayIds.length != 0) {
            for (let x = 0; x < arrayIds.length; x++) {
                cloudinary.uploader.destroy(arrayIds[x],
                    { resource_type: 'raw' })
            }
        }
    }

    let announcementData = {
        title,
        description,
        course,
        yearLevel,
        track,
        announcementType,
        setExpiry,
        archiveDate,
        fileAttachments: newAttachments
    }

    announcement = await Announcement.findByIdAndUpdate(req.params.id, announcementData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        announcement
    })
})

// delete announcement /api/v1/admin/announcement/:id
exports.deleteAnnouncement = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) { return next(new ErrorHandler('Announcement Not Found', 404)) }

    const filesAttached = announcement.fileAttachments
    const fileLength = filesAttached.length
    let arrayIds = []

    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].filename)
    }

    if (arrayIds.length != 0) {
        for (let x = 0; x < arrayIds.length; x++) {
            cloudinary.uploader.destroy(arrayIds[x],
                { resource_type: 'raw' })
        }
    }

    await announcement.remove()

    res.status(200).json({
        success: true,
        message: "Announcement deleted"
    })
})

// archive announcement /api/v1/admin/archiveAnnouncement/:id
exports.archiveAnnouncement = catchAsyncErrors(async (req, res, next) => {
    let announcement = await Announcement.findById(req.params.id);
    if (!announcement) { return next(new ErrorHandler('Announcement Not Found', 404)) }

    announcement = await Announcement.findByIdAndUpdate(req.params.id, { setExpiry: true, archiveDate: Date.now() - 1000 }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Announcement moved to archives"
    })
})