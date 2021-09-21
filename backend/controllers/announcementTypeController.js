const AnnouncementType = require('../models/announcementType');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

//create announcement type  => /api/v1/admin/createAnnouncementType
exports.createAnnouncementType = catchAsyncErrors(async (req, res, next) => {
    const announcementCategory = req.body.announcementCategory
    const announcementType = await AnnouncementType.create({
        announcementCategory
    })

    res.status(201).json({
        success: true,
        announcementType
    })
})

//get all announcement types => /api/v1/announcementTypes
exports.getAnnouncementTypes = catchAsyncErrors(async (req, res, next) => {
    const announcementTypes = await AnnouncementType.find()

    res.status(201).json({
        success: true,
        announcementTypes
    })
})

// delete announcement type => /api/v1/admin/announcementType/:announcementTypeId
exports.deleteAnnouncementType = catchAsyncErrors(async (req, res, next) => {
    const announcementType = await AnnouncementType.findById(req.params.announcementTypeId)
    if (!announcementType) { return next(new ErrorHandler('Announcement Type Not Found', 404)) }

    await announcementType.remove()

    res.status(200).json({
        success: true,
        message: "Announcement Type deleted"
    })
})