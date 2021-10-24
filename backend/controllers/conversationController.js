const Conversation = require('../models/conversation')
const Audit = require('../models/audit')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const User = require('../models/user')
const Message = require('../models/message')

// create conversaation
exports.createConversation = catchAsyncErrors(async (req, res, next) => {
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
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//get conv of user
exports.getConversations = catchAsyncErrors(async (req, res, next) => {
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
exports.getBothConversation = catchAsyncErrors(async (req, res, next) => {
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

exports.deleteConversation = catchAsyncErrors(async (req, res, next) => {
    const conversation = await Conversation.findById(req.params.id)

    // if (!conversation) { return next(new ErrorHandler('Conversation Not Found', 404)) }
    if (!conversation) { return next() }

    const member = req.user._id != conversation.members[0] ? conversation.members[0] : conversation.members[1]

    await conversation.remove()
    messages = await Message.deleteMany({ conversationId: req.params.id })

    const userName = req.user.firstName + ' ' + req.user.lastName

    await Audit.create({
        name: "Conversation deletion",
        eventInfo: `Conversation with user ${member} deleted.`,
        user: userName,
        dateAudit: Date.now()
    })

    res.status(200).json({
        success: true,
        message: "Conversation deleted"
    })
})