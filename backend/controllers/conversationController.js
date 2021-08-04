const Conversation = require('../models/conversation');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/user');

// Create conversation => /createConversation

exports.createConversation = catchAsyncErrors (async (req,res,next)=>{
    const receiverUser = await User.findById(req.body.receiverId);
    if(!receiverUser){
        return next(new ErrorHandler(`User not found with this id:(${req.body.receiverId})`));
    }
    
    const newConversation = new Conversation({
        members: [req.user.id,req.body.receiverId],
    });
    try{
        const savedConversation = await newConversation.save();
        res.status(201).json({
            success: true,
            savedConversation
        })
    }catch(err){
        return next(new ErrorHandler(err))
    }
    
})

// Get All user Conversations => /conversations
exports.getConversations = catchAsyncErrors (async (req,res,next)=>{
    try{
        const conversations = await Conversation.find({
            members : { $in: [req.user.id]}
        });
        res.status(201).json({
            success: true,
            conversations
        })

    }catch(err){
        return next(new ErrorHandler(err))
    }

})

// Get single conversation => /conversation/:conversationId
exports.getSingleConversation = catchAsyncErrors (async (req,res,next)=>{
    const conversation = await Conversation.findById(req.params.conversationId);
    const checkConversation = (conversation.members.includes(req.user.id));

    if (checkConversation == false){
        return next(new ErrorHandler('User is not a part of this conversation', 404))
    }
    if(!conversation){
       return next(new ErrorHandler('Conversation not found', 404))
    }
    res.status(200).json({
        success: true,
        conversation
    })

})

