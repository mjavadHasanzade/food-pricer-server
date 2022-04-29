const Joi = require("joi");

const menuValidator = (data) => {
  let schema;

  if (data.method === "POST") {
    schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": "menu_name_null",
      }),
      isActive: Joi.boolean(),

      foods: Joi.array()
        .items(
          Joi.object().keys({
            foodId: Joi.number().required(),
          })
        )
        .required()
        .unique((a, b) => a === b)
        .min(1)
        .required(),
    });
  } else {
    schema = Joi.object({
      name: Joi.string().messages({
        "any.required": "menu_name_null",
      }),
      isActive: Joi.boolean(),

      foods: Joi.array()
        .items(
          Joi.object().keys({
            foodId: Joi.number().required(),
          })
        )
        .unique((a, b) => a === b)
        .min(1)
        .required(),
    });
  }

  return schema.validate(data.body);
};

module.exports = menuValidator;
