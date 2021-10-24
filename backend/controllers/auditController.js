const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.allAudits = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Audit.find().sort({ dateAudit: -1 }), req.query)
        .searchAudit()

    const audits = await apiFeatures.query

    res.status(200).json({
        success: true,
        count: audits.length,
        audits
    })
})

exports.createAudit = catchAsyncErrors(async (req, res, next) => {
    const userName = req.user.firstName + ' ' + req.user.lastName

    const audit = await Audit.create({
        name: req.body.name,
        eventInfo: req.body.eventInfo,
        user: userName,
        dateAudit: Date.now()
    })

    res.status(201).json({
        success: true,
        audit
    })
})