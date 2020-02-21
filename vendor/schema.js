let Joi = require('joi');

let schema ={
    createVendor: Joi.object().keys({
            name: Joi.string().min(1).max(24),
            key: Joi.string().min(1).max(24)
        }),
    updateVendor: {
        body: {
            name: Joi.string().min(1).max(24),
            key: Joi.string().min(1).max(24)
        }
    },
    getVebdors: {
        params: {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
          }
    }
};
module.exports = schema;