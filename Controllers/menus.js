const Foods = require("../Models/foods");
const MenuByFoods = require("../Models/menuByFood");
const Menus = require("../Models/menus");
const ingredientValidator = require("../validators/ingredients");
const menuValidator = require("../validators/menus");

const getAll = async (req, res) => {
  const menus = await Menus.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    distinct: true,
    where: { userId: req.user.userId },
  });

  res.send(menus);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  const menu = await Menus.findOne({
    where: { id, userId: req.user.userId },
    include: Foods,
  });
  if (!menu) {
    res.status(404).send({ message: "Menu Not Found" });
    return;
  }
  res.send(menu);
};

const createOne = async (req, res) => {
  const { error } = menuValidator(req);

  if (error) {
    return res.status(400).send({ message: error.message });
  }
  req.body.UserId = req.user.userId;

  const foodsArray = req.body.foods;
  const menu = await Menus.create(req.body);

  foodsArray.map(async (item) => {
    const foodItem = await Foods.findOne({ where: item.foodId });
    if (!foodItem) {
      return false;
    }
    await MenuByFoods.create({
      MenuId: menu.id,
      FoodId: Number(item.foodId),
    });
  });

  res.send({ menu, message: "Menu created seccessfuly" });
};

const editOne = async (req, res) => {
  const id = req.params.id;

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).send({ message: "invalid ID" });
    return;
  }

  const { error } = menuValidator(req);

  if (error) {
    return res.status(400).send({ message: error.message });
  }

  const body = req.body;
  const menu = await Menus.findOne({ where: { id, userId: req.user.userId } });

  if (!menu) {
    res.status(404).send({ message: "Menu Not Found" });
    return;
  }

  await Menus.update(body, { where: { id, userId: req.user.userId } });

  if (body.foods && body.foods.length > 0) {
    const foodsArray = req.body.foods;

    await MenuByFoods.destroy({ where: { MenuId: menu.id } });
    foodsArray.map(async (item) => {
      const foodItem = await Foods.findOne({ where: item.foodId });
      if (!foodItem) {
        return false;
      }
      await MenuByFoods.create({
        MenuId: menu.id,
        FoodId: Number(item.foodId),
      });
    });
  }

  const editedMenu = await Menus.findOne({
    where: { id, userId: req.user.userId },
    include: Foods,
  });

  res.send({ Menu: editedMenu, message: "Food edited seccessfuly" });
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).send({ message: "invalid_id_exception" });
    return;
  }

  const menu = await Menus.destroy({
    where: { id: id, userId: req.user.userId },
  });

  if (menu == 0) {
    res.status(404).send({ message: "menu_not_found_exception" });
    return;
  }

  res.send({ message: "menu_delete_success" });
};

module.exports = { getAll, getOne, createOne, editOne, deleteOne };
