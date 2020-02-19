let Joi = require('joi');

let schema ={
    createTeam: Joi.object().keys({
            project_id: Joi.number().required(),
            user_id: Joi.number().required(),
            role: Joi.string().min(1).max(24),
            department: Joi.string().required()
        }),
    updateTeam: {
        body: {
            project_id: Joi.number().required(),
            user_id: Joi.number().required(),
            role: Joi.string().min(1).max(24),
            department: Joi.string().required()
        }
    },
    getTeams: {
        params: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
          }
    }
};
module.exports = schema;