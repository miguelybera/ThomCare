const Announcement = require('../models/announcement');

// Create new announcement => /api/v1/announcement/new
exports.newAnnouncement = async (req,res,next)=>{
    const announcement = await Announcement.create(req.body);

    res.status(201).json({
        success: true,
        announcement
    })

}

// Get all announcements /api/v1/allAnnouncements
exports.getAnnouncements = async (req,res,next) => {

    const announcements = await Announcement.find();
    res.status(200).json({
        success: true,
        count: announcements.length,
        announcements
    })
}

// Get single announcement /api/v1/announcement/:id

exports.getSingleAnnouncement = async (req, res, next) =>{
    const announcement = await Announcement.findById(req.params.id);
    
    if(!announcement){
        return res.status(404).json({
            success: false,
            message: 'Announcement not found'
        })
    }

    res.status(200).json({
        success: true,
        announcement
    })

}

// Update announcement /api/v1/admin/announcement/:id
exports.updateAnnouncement = async(req,res,next) =>{
    let announcement = await Announcement.findById(req.params.id);
    if(!announcement){
        return res.status(404).json({
            success: false,
            message: 'Announcement not found'
        })
    }
    announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        announcement
    })

}