const Form = require('../models/form');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Audit = require('../models/audit');
const cloudinary = require('cloudinary').v2;

// Create or upload a new form => /api/v1/admin/new/form
exports.createForm = catchAsyncErrors(async (req, res, next) => {
    const { title, description } = req.body
    const attachments = req.files
    const createdBy = req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName
    const updatedBy = req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName

    const form = await Form.create({
        title,
        description,
        attachments,
        createdBy,
        updatedBy
    })

    res.status(201).json({
        success: true,
        form
    })

})

// Get all forms => /api/v1/forms
exports.getAllForms = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Form.find().sort({ createdAt: -1 }), req.query)
        .searchForms()
        .filter()

    const forms = await apiFeatures.query

    res.status(200).json({
        success: true,
        forms
    })
})

//get single form => /api/v1/form/:formId
exports.getSingleForm = catchAsyncErrors(async (req, res, next) => {
    const form = await Form.findById(req.params.formId);
    if (!form) { return next(new ErrorHandler('Form Id does not exist')) }
    res.status(200).json({
        success: true,
        form
    })
})

// Update form => /api/v1/form/:formId
exports.updateForm = catchAsyncErrors(async (req, res, next) => {
    let form = await Form.findById(req.params.formId)

    if (!form) { return next(new ErrorHandler('Form Id does not exist')) }

    let newFormName, newFormFiles, newFormDescription

    if (req.body.title == null || req.body.title == '') {
        newFormName = form.title
    } else {
        newFormName = req.body.title
    }

    if (req.body.description == null || req.body.description == '') {
        newFormDescription = form.description
    } else {
        newFormDescription = req.body.description
    }

    const filesAttached = form.attachments
    const fileLength = filesAttached.length
    let arrayIds = []

    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].filename)
    }

    if (req.files == null || req.files == '') {
        newFormFiles = form.attachments
    } else {
        if (arrayIds.length != 0) {
            for (let x = 0; x < arrayIds.length; x++) {
                cloudinary.uploader.destroy(arrayIds[x],
                    { resource_type: 'raw' })
            }
        }
        newFormFiles = req.files
    }

    let newFormsData = {
        title: newFormName,
        description: newFormDescription,
        attachments: newFormFiles,
        updatedBy: req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName,
    }

    form = await Form.findByIdAndUpdate(req.params.formId, newFormsData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        form
    })

})

// Delete form => /api/v1/form/:formId

exports.deleteForm = catchAsyncErrors(async (req, res, next) => {
    const form = await Form.findById(req.params.formId)

    if (!form) { return next(new ErrorHandler('Form Id does not exist')) }

    const filesAttached = form.attachments
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

    await form.remove()
    res.status(200).json({
        success: true,
        message: "Form deleted"
    })
})