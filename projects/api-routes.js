// Initialize express router
let router = require('express').Router();
const schema = require("./validations/project/schema");
const middleware = require('./validations/middleware'); 
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
router.route('/projects/:pid/teams')
    .get(teamsController.index)
router.route('/projects/:pid/teams/:tid?')
    .get(teamsController.view)
    .delete(teamsController.delete);

var expenceController = require('./expenceController');
    router.route('/project/:pid/expences')
        .get(expenceController.index)
        .post(expenceController.new);
    router.route('/projects/:pid/expences/:eid')
        .get(expenceController.view)
        .patch(expenceController.update)
        .put(expenceController.update)
        .delete(expenceController.delete);

var expencesubcategoryController = require('./expencesubcategoryController');
router.route('/project/:pid/expences/:eid/subcategory')
    .get(expencesubcategoryController.index)
    .post(expencesubcategoryController.new);
router.route('/projects/:pid/expences/:eid/subcategory/:esid')
    .get(expencesubcategoryController.view)
    .patch(expencesubcategoryController.update)
    .put(expencesubcategoryController.update)
    .delete(expencesubcategoryController.delete);  


module.exports = router;