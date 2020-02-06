// vendorController.js
// Import vendor model
Vendor = require('./vendorModel');
// Handle index actions
exports.index = function (req, res) {
    Vendor.get(function (err, vendor) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Vendors retrieved successfully",
            data: vendor
        });
    });
};
// Handle create vendor actions
exports.new = function (req, res) {
    var vendor = new Vendor();
    vendor.name = req.body.name ? req.body.name : vendor.name;
    vendor.key = req.body.key;
    vendor.created_date = req.body.created_date;
// save the vendor and check for errors
    vendor.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New vendor created!',
            data: vendor
        });
    });
};
// Handle view vendor info
exports.view = function (req, res) {
    Vendor.findById(req.params.id, function (err, vendor) {
        if (err)
            res.send(err);
        res.json({
            message: 'Vendor details loading..',
            data: vendor
        });
    });
};
// Handle update vendor info
exports.update = function (req, res) {
Vendor.findById(req.params.id, function (err, vendor) {
        if (err)
            res.send(err);
            vendor.name = req.body.name ? req.body.name : vendor.name;
            vendor.key = req.body.key;
            vendor.created_date = req.body.created_date;
// save the vendor and check for errors
        vendor.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Vendor Info updated',
                data: vendor
            });
        });
    });
};
// Handle delete vendor
exports.delete = function (req, res) {
    Vendor.remove({
        _id: req.params.id
    }, function (err, vendor) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Vendor deleted'
        });
    });
};