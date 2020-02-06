var mongoose = require("mongoose");

var vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Vendor = module.exports = mongoose.model('vendor', vendorSchema);
module.exports.get = function (callback, limit) {
    Vendor.find(callback).limit(limit);
}