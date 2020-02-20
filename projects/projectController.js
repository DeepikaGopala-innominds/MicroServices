// projectController.js
// Import project model
Project = require('./projectModel');
Team = require('./teamsModel');
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
            statusCode: 200,
            message: "Projects retrieved successfully",
            data: projects
        });
    });
};
// Handle create project actions
exports.new = function (req, res) {
    var  project = new Project();
    project.name = req.body.name ? req.body.name : project.name;
    project.manager_id = req.body.manager_id;
    project.email_id = req.body.email_id;
    project.customer = req.body.customer;
    project.created_date = req.body.created_date;
    project.status = req.body.status;
    var that = req.body.teamMembers;
    // save the project and check for errors
    Project.findOne({ name: req.body.name }, function (err, success) {
        if (err) {
            console.log("error",err);
            res.send(err);
        }
        else {
            console.log("success",success);
            if (success == null) {           
                project.save(function (err) {
                    // if (err)
                    //     res.json(err);
                    var projectArray = [];
                    if(typeof that !== "undefined" && that.length > 0){      
                        that.forEach(team => {
                            var projectTeam = new Team();
                            projectTeam.project_id = project._id;
                            projectTeam.user_id = team.user_id;
                            projectTeam.role = team.role;
                            projectTeam.department = team.department;
                            projectArray.push(projectTeam);
                        });
                    }    
                    project.teamMembers = projectArray;
                    if(projectArray.length > 0){
                        projectArray.forEach(projectTeams => {
                            projectTeams.save(function (err) {
                                if (err){
                                    res.json(err);
                                }else{
                                    res.json({
                                        statusCode: 200,
                                        message: 'Project with team members created successfully!',
                                        data: project
                                    });
                            }
                        });
                        });    
                    }else {
                        res.json({
                            statusCode: 200,
                            message: 'Project created Successfully!',
                            data: project
                        });
                    }                
                });
            } else {
                res.send({
                    status: 200,
                    message: "Project with the name already exists!"});
            }
        }
    })

};
// Handle view project info
exports.view = function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            message: 'Loading project details..',
            data: project
        });
    });
};
// Handle update project info
exports.update = function (req, res) {
Project.findById(req.params.id, function (err, project) {
        if (err)
            res.send(err);
            project.name = req.body.name ? req.body.name : project.name;
            project.manager_id = req.body.manager_id;
            project.email_id = req.body.email_id;
            project.customer = req.body.customer;
            project.created_date = req.body.created_date;
            project.status = req.body.status;
// save the project and check for errors
        project.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Project Info updated',
                data: project
            });
        });
    });
};
// Handle delete project
exports.delete = function (req, res) {
    Project.deleteOne({
        _id: req.params.id
    }, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Project deleted'
        });
    });
};

