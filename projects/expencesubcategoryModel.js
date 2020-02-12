var mongoose = require('mongoose');
// Setup schema
var subexpenceSchema = mongoose.Schema({
    expence_category_id: {
        type: String,
        required: true
    },
    sub_category: {
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
var expenceSubCategory = module.exports = mongoose.model('expencesubcategory', subexpenceSchema);
module.exports.get = function (callback, limit) {
    expenceSubCategory.find(callback).limit(limit);
}