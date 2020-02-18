var mongoose = require('mongoose');
// Setup schema
var projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    manager_id: {
        type: Number,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
// Export Project model
var Project = module.exports = mongoose.model('projects', projectSchema);
module.exports.get = function (callback, limit) {
    Project.find(callback).limit(limit);
}