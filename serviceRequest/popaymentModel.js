var mongoose = require('mongoose');
// Setup schema
var popaymentSchema = mongoose.Schema({
    request_type: {
        type: String,
        required: true
    },
    project_id: {
        type: String,
        required: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    currency: {
        type: Number,
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
    status: {
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
    assignee: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: false
    }
});
// Export Project model
var PoPayment = module.exports = mongoose.model('popayment', popaymentSchema);
module.exports.get = function (callback, limit) {
    PoPayment.find(callback).limit(limit);
}