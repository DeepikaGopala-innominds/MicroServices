// projectController.js
// Import project model
Projectexpence = require('./projectexpenceModel');
// Handle index actions
exports.index = function (req, res) {
    Projectexpence.get(function (err, expences) {
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
// Handle create project actions
exports.new = function (req, res) {
    var projectExpence = new Projectexpence();
    projectExpence.project_id = req.body.project_id;
    projectExpence.vendor_id = req.body.vendor_id;
    projectExpence.currency = req.body.currency;
    projectExpence.category_id = req.body.category_id;
    projectExpence.subcategory_id = req.body.subcategory_id;
    projectExpence.payment_status = req.body.payment_status;
    projectExpence.date = req.body.date;
    projectExpence.due_date = req.body.due_date;
    projectExpence.remarks = req.body.remarks ? req.body.remarks : projectExpence.remarks;

// save the project and check for errors
projectExpence.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New project created!',
            data: project
        });
    });
};
// Handle view project info
exports.view = function (req, res) {
    Projectexpence.findById(req.params.id, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            message: 'Project expence details loading..',
            data: project
        });
    });
};
// Handle update project info
exports.update = function (req, res) {
Projectexpence.findById(req.params.id, function (err, projectExpence) {
        if (err)
            res.send(err);
            projectExpence.project_id = req.body.project_id;
            projectExpence.vendor_id = req.body.vendor_id;
            projectExpence.currency = req.body.currency;
            projectExpence.category_id = req.body.category_id;
            projectExpence.subcategory_id = req.body.subcategory_id;
            projectExpence.payment_status = req.body.payment_status;
            projectExpence.date = req.body.date;
            projectExpence.due_date = req.body.due_date;
            projectExpence.remarks = req.body.remarks ? req.body.remarks : projectExpence.remarks;
// save the project and check for errors
        project.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Project expence Info updated',
                data: project
            });
        });
    });
};
// Handle delete project
exports.delete = function (req, res) {
    Projectexpence.remove({
        _id: req.params.id
    }, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Project expence deleted'
        });
    });
};