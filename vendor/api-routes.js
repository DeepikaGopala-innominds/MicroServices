// Initialize express router
let router = require('express').Router();
let schema = require('./schema');
let middleware = require('./middleware');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Expence tracker for connected Devices!',
    });
});
// Import contact controller
var vendorController = require('./vendorController');

// Contact routes
router.route('/vendor')
    .get(middleware(schema.createVendor),vendorController.index)
    .post(middleware(schema.createVendor),vendorController.new);
router.route('/vendor/:id')
    .get(vendorController.view)
    .patch(middleware(schema.createVendor), vendorController.update)
    .put(middleware(schema.createVendor),vendorController.update)
    .delete(vendorController.delete);
    
// Export API routes
module.exports = router;