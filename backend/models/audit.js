const mongoose = require('mongoose')
const auditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    eventInfo: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    dateAudit: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model('Audit', auditSchema)