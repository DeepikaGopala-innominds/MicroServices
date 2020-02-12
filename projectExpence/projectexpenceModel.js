var mongoose = require('mongoose');
// Setup schema
var projectExpenceSchema = mongoose.Schema({
     project_id: {
        type: String,
        required: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    project_category_id: {
        type: Number,
        required: true
    },
    project_subcategory_id: {
        type: Number,
        required: true
    },
    payment_status: {
        type: Boolean,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
        required: false
    }
});
// Export Project model
var ProjectExpences = module.exports = mongoose.model('projectExpence', projectExpenceSchema);
module.exports.get = function (callback, limit) {
    ProjectExpences.find(callback).limit(limit);
}