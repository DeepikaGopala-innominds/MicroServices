// teamController.js
// Import project model
Team = require('./teamsModel');
// Handle index actions
exports.index = function (req, res) {
    Team.get(function (err, teams) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
            return;
        }
        res.json({
            status: "success",
            message: "Teams retrieved successfully",
            data: teams
        });
    });
};
// Handle create team actions
exports.new = function (req, res) {
    var team = new Team();
    console.log(req);
    team.project_id = req.params.pid;
    team.user_id = req.body.user_id;
    team.role = req.body.role;
    team.department = req.body.department;
    
// save the team and check for errors
    team.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New team created!',
            id: req.params.tid,
            data: team
        });
    });
};
// Handle view team info
exports.view = function (req, res) {
    Team.findById(req.params.tid, function (err, team) {
        if (err)
            res.send(err);
        res.json({
            message: 'Team details loading..',
            data: team
        });
    });
};
// Handle update team info
exports.update = function (req, res) {
Team.findById(req.params.tid, function (err, team) {
        if (err)
            res.send(err);
        if(team){
            team.project_id = req.body.project_id;
            team.user_id = req.body.user_id;
            team.role = req.body.role;
            
            // save the team and check for errors
            team.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Team Info updated',
                    data: team
                });
            });
        }else{
            res.json({
                message: 'Team Info not found, Operation Not allowed',
                data: team
            });
        }
          
    });
};
// Handle delete team
exports.delete = function (req, res) {
    Team.deleteOne({
        _id: req.params.tid
    }, function (err, project) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Team deleted'
        });
    });
};