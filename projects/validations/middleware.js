const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
  const { value, error } = Joi.validate(req.body, schema); 
console.log("error",error);
  if (!error) { 
    next(); 
  } else { 
    console.log(error);
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
    console.log("error", message); 
    res.status(422).json({ error: "Invalid Request" }) } 
  } 
} 
module.exports = middleware;