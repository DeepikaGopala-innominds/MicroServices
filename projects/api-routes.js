// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

var projectController = require('./projectController');
router.route('/projects')
    .get(projectController.index)
    .post(projectController.new);
router.route('/projects/:id')
    .get(projectController.view)
    .patch(projectController.update)
    .put(projectController.update)
    .delete(projectController.delete);

var teamsController = require('./teamsController');
router.route('/projects/:id/teams')
    .get(teamsController.index)
    .post(teamsController.new);
router.route('/projects/:id/teams')
    .get(teamsController.view)
    .patch(teamsController.update)
    .put(teamsController.update)
    .delete(teamsController.delete);

// var expenceController = require('./expenceController');
//     router.route('/project/:id/expences')
//         .get(expenceController.index)
//         .post(expenceController.new);
//     router.route('/projects/:id/expences/:id')
//         .get(expenceController.view)
//         .patch(expenceController.update)
//         .put(expenceController.update)
//         .delete(expenceController.delete);
    

module.exports = router;