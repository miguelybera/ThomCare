const Form = require('../models/form');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Audit = require('../models/audit');
const cloudinary = require('cloudinary').v2;

// Create or upload a new form => /api/v1/admin/new/form
exports.createForm = catchAsyncErrors(async (req, res, next) => {
    const {formName, formDescription} = req.body
    const formFiles = req.files
    const createdBy = req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName
    const updatedBy = req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName

    const form = await Form.create({
        formName,
        formDescription,
        formFiles,
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
    let form = await Form.findById(req.params.formId);
    if (!form) { return next(new ErrorHandler('Form Id does not exist')) }
    let newFormName, newFormFiles, newFormDescription
    if (req.body.formName == null || req.body.formName == '') {
        newFormName = form.formName
    } else {
        newFormName = req.body.formName
    }
    if (req.body.formDescription == null || req.body.formDescription == '') {
        newFormDescription = form.formDescription
    } else {
        newFormDescription = req.body.formDescription
    }
    if (req.files == null || req.files == ''){
        newFormFiles = form.formFiles
    }else{
        newFormFiles = req.files
    }
    let newFormsData ={
        formName: newFormName,
        formDescription: newFormDescription,
        formFiles: newFormFiles,
        updatedBy: req.user.firstName + ' ' + req.user.middleName + ' ' + req.user.lastName,
    }
    
    form = await Form.findByIdAndUpdate(req.params.formId, newFormsData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        form
    })
    
})

// Delete form => /api/v1/form/:formId

exports.deleteForm = catchAsyncErrors(async (req, res, next) => {
    const form = await Form.findById(req.params.formId);
    if (!form) { return next(new ErrorHandler('Form Id does not exist')) }
    
    const filesAttached = form.formFiles
    fileLength= filesAttached.length
    let arrayIds = []
    for (let i = 0; i < fileLength; i++) {
        arrayIds.push(filesAttached[i].filename) 
      }

      cloudinary.api.delete_resources(arrayIds, 
        { resource_type: 'raw' })

    await form.remove()
    res.status(200).json({
        success: true,
        message: "Form deleted"
    })
})