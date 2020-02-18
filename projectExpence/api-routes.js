// Initialize express router
let router = require('express').Router();
let jsontoken = require('jsonwebtoken');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Service Request API Its Working',
        message: 'Welcome to Service request!',
    });
});

var projectexpenceController = require('./projectexpenceController');
router.route('/projectexpences')
    .get(projectexpenceController.index)
    .post(projectexpenceController.new);
router.route('/projectexpences/:id')
    .get(projectexpenceController.view)
    .patch(projectexpenceController.update)
    .put(projectexpenceController.update)
    .delete(projectexpenceController.delete);

module.exports = router;