exports.getAnnouncements = (req,res,next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all announcements in database'
    })
}