const Foods = require("../Models/foods");
const Ingredients = require("../Models/ingredients");
const ingredientValidator = require("../validators/ingredients");

const getAll = async (req, res) => {
  const ingredients = await Ingredients.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: { userId: req.user.userId },
  });

  res.send(ingredients);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const ingredient = await Ingredients.findOne({
    where: { id, userId: req.user.userId },
  });
  if (!ingredient) {
    res.status(404).send({ message: "Ingredient Not Found" });
    return;
  }
  res.send(ingredient);
};

const createOne = async (req, res) => {
  const { error } = ingredientValidator(req);

  if (error) {
    return res.status(400).send({ message: error.message });
  }
  req.body.UserId = req.user.userId;

  const ingredient = await Ingredients.create(req.body);
  res.send({ ingredient, message: "Ingredient created seccessfuly" });
};

const editOne = async (req, res) => {
  const id = req.params.id;

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).send({ message: "invalid ID" });
    return;
  }

  const { error } = ingredientValidator(req);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const body = req.body;

  const ingredient = await Ingredients.update(body, {
    where: { id, userId: req.user.userId },
  });

  if (ingredient[0] == 0) {
    res.status(404).send({ message: "Ingredient Not Found" });
    return;
  }

  res.send({ ingredient, message: "Ingredient edited seccessfuly" });
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).send({ message: "invalid_id_exception" });
    return;
  }

  const ingredient = await Ingredients.destroy({
    where: { id: id, userId: req.user.userId },
  });

  if (ingredient == 0) {
    res.status(404).send({ message: "ingredient_not_found_exception" });
    return;
  }

  res.send({ message: "ingredient_delete_success" });
};

module.exports = { getAll, getOne, createOne, editOne, deleteOne };
