const mongoose = require('mongoose')
const auditSchema = new mongoose.Schema({
    userAudit: {
        type: String,
        required: true
    },
    requestAudit: {
        type: String,
        required: true
    },
    actionAudit: {
        type: String,
        required: true
    },
    dateAudit: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model('Audit', auditSchema)