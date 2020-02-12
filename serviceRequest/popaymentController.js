// projectController.js
// Import project model
PopaymentModel = require('./popaymentModel');
// Handle index actions
exports.index = function (req, res) {
    Project.get(function (err, projects) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Projects retrieved successfully",
            data: projects
        });
    });
};
// Handle create project actions
exports.new = function (req, res) {
    var serviceRequest = new PopaymentModel();
    serviceRequest.request_type = req.body.request_type;
    serviceRequest.project_id = req.body.project_id;
    serviceRequest.vendor_id = req.body.vendor_id;
    serviceRequest.currency = req.body.currency;
    serviceRequest.category_id = req.body.category_id;
    serviceRequest.subcategory_id = req.body.subcategory_id;
    serviceRequest.status = req.body.status;
    serviceRequest.date = req.body.date;
    serviceRequest.due_date = req.body.due_date;
    serviceRequest.remarks = req.body.remarks ? req.body.remarks : projectExpence.remarks;
// save the project and check for errors
    project.save(function (err) {
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
    PopaymentModel.findById(req.params.id, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            message: 'PopaymentModel details loading..',
            data: project
        });
    });
};
// Handle update project info
exports.update = function (req, res) {
PopaymentModel.findById(req.params.id, function (err, project) {
        if (err)
            res.send(err);
        projectExpence.request_type = req.body.request_type;
        projectExpence.project_id = req.body.project_id;
        projectExpence.vendor_id = req.body.vendor_id;
        projectExpence.currency = req.body.currency;
        projectExpence.category_id = req.body.category_id;
        projectExpence.subcategory_id = req.body.subcategory_id;
        projectExpence.status = req.body.status;
        projectExpence.date = req.body.date;
        projectExpence.due_date = req.body.due_date;
        projectExpence.remarks = req.body.remarks ? req.body.remarks : projectExpence.remarks;
// save the project and check for errors
        project.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'PopaymentModel Info updated',
                data: project
            });
        });
    });
};
// Handle delete project
exports.delete = function (req, res) {
    PopaymentModel.remove({
        _id: req.params.id
    }, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Service Request deleted'
        });
    });
};