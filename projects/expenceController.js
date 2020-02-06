// expenceController.js
// Import expence model
Expences = require('./expenceModel');
// Handle index actions
exports.index = function (req, res) {
    Expences.get(function (err, expences) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Expences retrieved successfully",
            data: expences
        });
    });
};
// Handle create expence actions
exports.new = function (req, res) {
    var expence = new Expences();
    expence.category = req.body.category ? req.body.category : expence.category;
    expence.project_id = req.body.project_id;
    // save the expence and check for errors
    expence.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New expence created!',
            data: expence
        });
    });
};
// Handle view expence info
exports.view = function (req, res) {
    Expences.findById(req.params.id, function (err, expence) {
        if (err)
            res.send(err);
        res.json({
            message: 'Expences details loading..',
            data: expence
        });
    });
};
// Handle update expence info
exports.update = function (req, res) {
Expences.findById(req.params.id, function (err, expence) {
        if (err)
            res.send(err);
            expence.category = req.body.category ? req.body.category : expence.category;
            expence.project_id = req.body.project_id;
       // save the expence and check for errors
        expence.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Expences Info updated',
                data: expence
            });
        });
    });
};
// Handle delete expence
exports.delete = function (req, res) {
    Expences.remove({
        _id: req.params.id
    }, function (err, expence) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Expences deleted'
        });
    });
};