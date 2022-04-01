const Joi = require("joi");

const ingredientValidator = (data) => {
  let schema;
  if (data.method === "POST") {
    schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": "product_name_null",
      }),
      price: Joi.number().min(0).required().messages({
        "any.required": "product_price_null",
        "number.min": "product_price_size",
      }),
      isComplete: Joi.boolean(),
      quantity: Joi.number(),
    });
  } else {
    schema = Joi.object({
      name: Joi.string(),
      price: Joi.number().min(0).messages({
        "number.min": "product_price_size",
      }),
      isComplete: Joi.boolean(),
      quantity: Joi.number(),
    });
  }

  return schema.validate(data.body);
};

module.exports = ingredientValidator;
