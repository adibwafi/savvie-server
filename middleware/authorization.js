const { Favourite, Food } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: authorId } = req.user;
    const favourite = await Favourite.findByPk(id);
    if (!favourite) throw { name: "Not found", message: "Id not found" };

    if (favourite.UserId === authorId) {
      next();
    } else {
      throw { name: "Forbidden", message: "You have no access" };
    }
  } catch (error) {
    next(error);
  }
};

const authorizationResto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { restoId: authorId } = req.user;
    const food = await Food.findByPk(id);
    if (!food) throw { name: "Not found", message: "Id not found" };

    if (food.RestaurantId === authorId) {
      next();
    } else {
      throw { name: "Forbidden", message: "You have no access" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {authorization, authorizationResto};
