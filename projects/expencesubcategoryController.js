// expenceController.js
// Import expence model
ExpenceSubCategory = require('./expencesubcategoryModel');
// Handle index actions
exports.index = function (req, res) {
    ExpenceSubCategory.get(function (err, expences) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Expence's sub category retrieved successfully",
            data: expences
        });
    });
};
// Handle create expence actions
exports.new = function (req, res) {
    var expence = new ExpenceSubCategory();
    expence.expence_category_id = req.body.expence_category_id ? req.body.expence_category_id : expence.expence_category_id;
    expence.category = req.body.category;
    expence.project_id = req.body.project_id;
    // save the expence and check for errors
    expence.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New expence sub category created!',
            data: expence
        });
    });
};
// Handle view expence info
exports.view = function (req, res) {
    ExpenceSubCategory.findById(req.params.eid, function (err, expence) {
        if (err)
            res.send(err);
        res.json({
            message: 'Expence Sub-Category details loading..',
            data: expence
        });
    });
};
// Handle update expence info
exports.update = function (req, res) {
ExpenceSubCategory.findById(req.params.eid, function (err, expence) {
        if (err)
            res.send(err);
            expence.expence_category_id = req.body.expence_category_id ? req.body.expence_category_id : expence.expence_category_id;
            expence.project_id = req.body.project_id;
            expence.category = req.body.category;
            // save the expence and check for errors
        expence.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Expence Sub-Category Info updated',
                data: expence
            });
        });
    });
};
// Handle delete expence
exports.delete = function (req, res) {
    ExpenceSubCategory.remove({
        _id: req.params.eid
    }, function (err, expence) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Expence Sub-Category deleted'
        });
    });
};