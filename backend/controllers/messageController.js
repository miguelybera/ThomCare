const Message = require('../models/message');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const Conversation = require('../models/conversation');
const User = require('../models/user');

// add a message

exports.createMessage = catchAsyncErrors (async (req,res,next)=>{
    const conversation = await Conversation.findById(req.params.conversationId);
    if(!conversation){
        return next(new ErrorHandler(`Conversation does not exist with this id:(${req.params.conversationId})`));
    }
    const checkConversation = (conversation.members.includes(req.user.id));
    if (checkConversation == false){
        return next(new ErrorHandler('User is not a part of this conversation', 404))
    }
    req.body.sender = req.user.id
    req.body.conversationId = req.params.conversationId;
    const newMessage = new Message(req.body)
    
    try{
        const savedMessage = await newMessage.save();
        res.status(201).json({
            success: true,
            savedMessage
        })
    }catch(err){
        return next(new ErrorHandler(err))
    }

})

// get messages of a conversation

exports.getMessages = catchAsyncErrors (async (req,res,next)=>{
    const conversation = await Conversation.findById(req.params.conversationId);
    if(!conversation){
        return next(new ErrorHandler(`Conversation does not exist with this id:(${req.params.conversationId})`));
    }
    const checkConversation = (conversation.members.includes(req.user.id));
    if (checkConversation == false){
        return next(new ErrorHandler('User does not have access to the messages', 404))
    }
    
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(201).json({
            success: true,
            messages
        })
    }catch(err){
        return next(new ErrorHandler(err))
    }
})