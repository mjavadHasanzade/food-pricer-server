const Joi = require("joi");

const userValidator = (data, type) => {
  let schema;
  if (type === "register") {
    if (data.method === "POST") {
      schema = Joi.object({
        name: Joi.string().required().messages({
          "any.required": "user_name_null",
        }),
        family: Joi.string().required().messages({
          "any.required": "user_family_null",
        }),
        email: Joi.string().email().required().messages({
          "any.required": "user_email_null",
        }),
        password: Joi.string().required().messages({
          "any.required": "user_password_null",
        }),
      });
    } else {
      schema = Joi.object({
        name: Joi.string(),
        family: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
      });
    }
  } else {
    if (data.method === "POST") {
      schema = Joi.object({
        email: Joi.string().email().required().messages({
          "any.required": "user_email_null",
        }),
        password: Joi.string().required().messages({
          "any.required": "user_password_null",
        }),
      });
    } else {
      schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
      });
    }
  }

  return schema.validate(data.body);
};

module.exports = userValidator;
