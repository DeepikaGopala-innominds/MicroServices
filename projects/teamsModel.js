var mongoose = require('mongoose');
// Setup schema
var teamSchema = mongoose.Schema({
    project_id: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['initiator', 'financer', 'resolver']
    },
    department: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Teams = module.exports = mongoose.model('teams', teamSchema);
module.exports.get = function (callback, limit) {
    Teams.find(callback).limit(limit);
}