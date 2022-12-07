const { Food, Category, Restaurant } = require("../models");

class Controller {
  static async allFood(req, res, next) {
    try {
      const food = await Food.findAll({
        include: [{ model: Category }, 
          { 
            model: Restaurant,
            where: {is_open: true}
          }],
        where: {is_active: true}
      });
      
      res.status(200).json(food);
    } catch (error) {
      next(error);
    }
  }

  static async getFoodById(req, res, next) {
    try {
      const { id } = req.params;
      const food = await Food.findOne({
        where: { id },
        include: [{ model: Category }, { model: Restaurant }],
      });

      if (!food) throw { name: "Not found", msg: "Id not found" };

      res.status(200).json(food);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
