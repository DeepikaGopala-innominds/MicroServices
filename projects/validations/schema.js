let Joi = require('joi');

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
            email_id: Joi.string().required(),
            manager_id: Joi.required(),
            customer: Joi.string().required(),
            status: Joi.boolean(),
            name: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }
    },
    getProject: {
        params: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
          }
    }
};
module.exports = schema;