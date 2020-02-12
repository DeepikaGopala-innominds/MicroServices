// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Service Request API Its Working',
        message: 'Welcome to Service request!',
    });
});

var popaymentController = require('./popaymentController');
router.route('/servicerequest')
    .get(popaymentController.index)
    .post(popaymentController.new);
router.route('/servicerequest/:id')
    .get(popaymentController.view)
    .patch(popaymentController.update)
    .put(popaymentController.update)
    .delete(popaymentController.delete);

module.exports = router;