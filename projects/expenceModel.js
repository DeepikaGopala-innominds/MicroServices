var mongoose = require('mongoose');
// Setup schema
var expenceSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    project_id: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
// Export Expence model
var Expence = module.exports = mongoose.model('expences', expenceSchema);
module.exports.get = function (callback, limit) {
    Expence.find(callback).limit(limit);
}