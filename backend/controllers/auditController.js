const Audit = require('../models/audit');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.allAudits = catchAsyncErrors(async (req, res, next) => {
    
    const apiFeatures = new APIFeatures(Audit.find().sort({ dateAudit: -1 }), req.query)
        .searchAudit() 
        .filter()
        
    const audits = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: audits.length,
        audits
    })
})