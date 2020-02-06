// Initialize express router
let router = require('express').Router();
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
    .get(vendorController.index)
    .post(vendorController.new);
router.route('/vendor/:id')
    .get(vendorController.view)
    .patch(vendorController.update)
    .put(vendorController.update)
    .delete(vendorController.delete);
// Export API routes
module.exports = router;