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
        }else{
            res.json({
                status: "success",
                message: "Expences retrieved successfully",
                data: expences
            });
        }
        
    });
};
// Handle create expence actions
exports.new = function (req, res) {
    var expence = new Expences();
    expence.category = req.body.category;
    expence.project_id = req.body.project_id;
    // save the expence and check for errors
    //console.log(Expences.findOne({ category: expence.category, project_id: expence.project_id }));
    Expences.findOne({ category: expence.category, project_id: expence.project_id }, function(error, success){
        if(error){
            res.send(error);
        }else{
            if(success == null){
                expence.save(function (err) {
                    // if (err)
                    //     res.json(err);
                    res.json({
                        message: 'New expence created!',
                        data: expence
                    });
                });
            }else{
                res.send({
                    statusCode: 200,
                    message: 'Expence for the project is already created!'
                });
            }
        }         
    });
};
// Handle view expence info
exports.view = function (req, res) {
    Expences.findById(req.params.eid, function (err, expence) {
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
Expences.findById(req.params.eid, function (err, expence) {
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
    console.log(req.params.eid);
    Expences.deleteOne({
        _id: req.params.eid
    }, function (err, expence) {
        if (err){
            res.send(err);
        }else{
            res.json({
                status: "success",
                message: 'Expences deleted'
            });
        }        
  
    });
};