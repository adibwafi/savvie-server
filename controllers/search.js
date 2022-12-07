const { Op } = require('sequelize');
const {Food, Restaurant} = require('../models');

class Controller {
  static async search(req, res, next){
    try {
      let { name } = req.query
      let find = {}
      if (name) {
        find = {...find, name: {[Op.iLike]: `%${name}%`}};
      }
      const food = await Restaurant.findAll({
        include: [{
          model: Food,
          where: find
        }]
      })
      let restaurant = await Restaurant.findAll({
        where: find,
        include: [{
          model: Food,
          where: find
        }]
      })
      if(restaurant.length == 0) {
        restaurant = await Restaurant.findAll({
          where: find
        })
      }
      let data = [...food, ...restaurant]
      const seen = new Set();
      const filteredArr = data.filter(el => {
        const duplicate = seen.has(el.id);
        seen.add(el.id);
        return !duplicate;
      });
      res.status(200).json(filteredArr)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller