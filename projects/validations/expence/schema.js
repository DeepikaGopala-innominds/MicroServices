let Joi = require('joi');

let schema ={
    createExpence: Joi.object().keys({
            project_id: Joi.number().required(),
            category: Joi.string().min(1).max(24)
        }),
    updateExpence: {
        body: {
            project_id: Joi.number().required(),
            category: Joi.string().min(1).max(24)
        }
    },
    getExpences: {
        params: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
          }
    }
};
module.exports = schema;