const Joi = require("joi");

const foodValidator = (data) => {
  let schema;

  if (data.method === "POST") {
    schema = Joi.object({
      name: Joi.string().required().messages({
        "any.required": "product_name_null",
      }),
      priceByRestaurant: Joi.number().required().min(0).messages({
        "number.min": "product_price_size",
      }),
      priceByIngredient: Joi.number().required().min(0).messages({
        "number.min": "product_price_size",
      }),
      ingredients: Joi.array()
        .items(
          Joi.object().keys({
            ingId: Joi.number().required(),
            qty: Joi.number().required(),
          })
        )
        .required()
        .unique((a, b) => a === b).min(1).required(),
      benefit: Joi.number().required().min(0).messages({
        "number.min": "product_price_size",
      }),
    });
  } else {
    schema = Joi.object({
      name: Joi.string().messages({
        "any.required": "product_name_null",
      }),
      priceByRestaurant: Joi.number().min(0).messages({
        "number.min": "product_price_size",
      }),
      priceByIngredient: Joi.number().min(0).messages({
        "number.min": "product_price_size",
      }),
      ingredients: Joi.array()
        .items(
          Joi.object().keys({
            ingId: Joi.number().required(),
            qty: Joi.number().required(),
          })
        )
        .unique((a, b) => a === b),
      benefit: Joi.number().min(0).messages({
        "number.min": "product_price_size",
      }),
    });
  }

  return schema.validate(data.body);
};

module.exports = foodValidator;
