const Conversation = require('../models/conversation');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/user');
const Message = require('../models/message')

// Create conversation => /createConversation
exports.createConversation = catchAsyncErrors(async (req, res, next) => {
    const receiverUser = await User.findById(req.body.receiverId);

    if (!receiverUser) { return next(new ErrorHandler(`User not found with this id:(${req.body.receiverId})`)) }

    const exisitingConversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })

    if (!existingConversation) { return next(new ErrorHandler(`Conversation exists`)) }

    const newConversation = new Conversation({
        members: [req.user.id, req.body.receiverId]
    });

    try {
        const savedConversation = await newConversation.save()

        res.status(201).json({
            success: true,
            savedConversation
        })
    } catch (err) {
        return next(new ErrorHandler(err))
    }

})

// Get All user Conversations => /conversations
exports.getConversations = catchAsyncErrors(async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.user.id] }
        })

        res.status(201).json({
            success: true,
            conversations
        })

    } catch (err) {
        return next(new ErrorHandler(err))
    }
})

// Get single conversation => /conversation/:conversationId
exports.getSingleConversation = catchAsyncErrors(async (req, res, next) => {
    const conversation = await Conversation.findById(req.params.conversationId)
    const checkConversation = (conversation.members.includes(req.user.id))

    if (checkConversation == false) { return next(new ErrorHandler('User is not a part of this conversation', 404)) }
    if (!conversation) { return next(new ErrorHandler('Conversation not found', 404)) }

    res.status(200).json({
        success: true,
        conversation
    })

})

//from github
//new conv
exports.createConvo = catchAsyncErrors(async (req, res, next) => {
    //check if user is same
    const receiverUser = await User.findById(req.body.receiverId)

    if (req.body.receiverId === req.body.senderId) { return next(new ErrorHandler(`Cannot create conversation with self`)) }

    //check if existing
    const existingConversation = await Conversation.findOne({
        members: { $all: [req.body.receiverId, req.body.senderId] },
    })

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
        names: [req.body.firstMember, req.body.secondMember]
    })

    try {
        let conversation = {}, message = ''

        if (existingConversation) {
            conversation = existingConversation
            message = null
        } else {
            conversation = await newConversation.save()
            message = 'Conversation created'
        }

        res.status(200).json({
            conversation,
            message
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

//get conv of user
exports.getConvo = catchAsyncErrors(async (req, res, next) => {
    try {
        const apiFeatures = new APIFeatures(Conversation.find({ members: { $in: [req.user.id] } }).sort({ updatedAt: -1 }), req.query)
            .searchUser()
            .filter()

        const conversations = await apiFeatures.query

        res.status(201).json({
            success: true,
            length: conversations.length,
            conversations
        })

    } catch (err) {
        res.status(500).json(err)
    }
})

//get conv of both users
exports.getBothConvo = catchAsyncErrors(async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        })

        res.status(200).json({
            success: true,
            conversation
        })
    } catch (err) {
        res.status(500).json(err)
    }
})
