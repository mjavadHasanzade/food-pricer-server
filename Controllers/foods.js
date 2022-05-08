const FoodByIngredients = require("../Models/foodByIngredients");
const Foods = require("../Models/foods");
const Ingredients = require("../Models/ingredients");
const foodValidator = require("../validators/foods");

const getAll = async (req, res) => {
  const food = await Foods.findAndCountAll({
    include: Ingredients,
    order: [["updatedAt", "DESC"]],
    distinct: true, //? for incorrect count after include
    where: { userId: req.user.userId },
  });

  res.send(food);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const food = await Foods.findOne({
    where: { id, userId: req.user.userId },
    include: Ingredients,
  });
  if (!food) {
    res.status(404).send({ message: "Food Not Found" });
    return;
  }
  res.send(food);
};

const createOne = async (req, res) => {
  const { error } = foodValidator(req);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  req.body.UserId = req.user.userId;
  ingredientsArray = req.body.ingredients;
  const food = await Foods.create(req.body);

  ingredientsArray.map(async (item) => {
    const IngItem = await Ingredients.findOne({ where: item.ingId });
    if (!IngItem) {
      return false;
    }
    await FoodByIngredients.create({
      FoodId: food.id,
      IngredientId: Number(item.ingId),
      IngredientQuantity: Number(item.qty),
    });
  });

  res.send({ food, message: "Food created seccessfuly" });
};

const editOne = async (req, res) => {
  const id = req.params.id;

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).send({ message: "invalid ID" });
    return;
  }

  const { error } = foodValidator(req);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const body = req.body;
  const food = await Foods.findOne({ where: { id, userId: req.user.userId } });

  if (!food) {
    res.status(404).send({ message: "Food Not Found" });
    return;
  }

  await Foods.update(body, { where: { id, userId: req.user.userId } });

  if (body.ingredients && body.ingredients.length > 0) {
    ingredientsArray = req.body.ingredients;

    await FoodByIngredients.destroy({ where: { FoodId: food.id } });
    ingredientsArray.map(async (item) => {
      const IngItem = await Ingredients.findOne({ where: item.ingId });
      if (!IngItem) {
        return false;
      }
      await FoodByIngredients.create({
        FoodId: food.id,
        IngredientId: Number(item.ingId),
        IngredientQuantity: Number(item.qty),
      });
    });
  }

  const editedFood = await Foods.findOne({ where: { id } });

  res.send({ food: editedFood, message: "Food edited seccessfuly" });
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).send({ message: "invalid_id_exception" });
    return;
  }

  const food = await Foods.destroy({
    where: { id: id, userId: req.user.userId },
  });

  if (food == 0) {
    res.status(404).send({ message: "food_not_found_exception" });
    return;
  }

  res.send({ message: "ingredient_delete_success" });
};

module.exports = { getAll, getOne, createOne, editOne, deleteOne };
