let Joi = require('joi');

let team = Joi.object().keys({
    project_id: Joi.string().required(),
    user_id: Joi.string().required(),
    role:Joi.string().min(1).max(24),
    department: Joi.string().min(1).max(24),
  });


let schema ={
    createProject: Joi.object().keys({
            email_id: Joi.string().email().required(),
            manager_id: Joi.number().required(),
            customer: Joi.string().min(1).max(24),
            status: Joi.boolean(),
            name: Joi.string().min(1).max(256)
        }),
    updateProject: {
        body: {
           // email_id: Joi.string().email().required(),
            manager_id: Joi.number().required(),
            customer: Joi.string().min(1).max(24),
            status: Joi.boolean(),
            name: Joi.string().min(1).max(256)
        }
    },
    getProject: {
        params: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
          }
    }
};
module.exports = schema;