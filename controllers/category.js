const { Food, Category, CategoryResto } = require("../models");

class Controller {
  static async allCategory(req, res, next) {
    try {
      const category = await Category.findAll({
        include: [{ model: CategoryResto }, { model: Food }],
      });

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: { id },
        include: [{ model: CategoryResto }, { model: Food }],
      });

      if (!category) throw { name: "Not found", msg: "Id not found" };

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
