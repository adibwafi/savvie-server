const { Op } = require("sequelize");
const {
  Food,
  Restaurant,
  Sequelize,
  OrderItem,
  User,
  Payment,
} = require("../models");

class Controller {
  static async showFood(req, res, next) {
    try {
      const data = await Food.findAll({
        where: {
          RestaurantId: req.user.restoId,
        },
        order: [["quantity", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async filterFood(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Food.findAll({
        where: {
          RestaurantId: req.user.restoId,
        },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Payment,
                where: {
                  updatedAt: {
                    [Op.gte]: Sequelize.literal(`NOW() - INTERVAL \'${id}d\'`),
                  },
                },
              },
            ],
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async filterFoodDate(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Food.findAll({
        where: {
          RestaurantId: req.user.restoId,
        },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Payment,
                where: {
                  updatedAt: {
                    [Op.gte]: Sequelize.literal(`NOW() - INTERVAL \'${id}d\'`),
                  },
                },
              },
            ],
          },
        ],
      });
      function formatDate(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        date = mm + "/" + dd;
        return date;
      }
      let labels = [];
      for (var i = 0; i < id; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(d.toString().substring(0, 10).split("-").join("/"));
      }
      const arrayQuantity = [];
      const arrayDate = [];
      const obj = {};
      const array = []
      data.map((x) => {
        x.OrderItems.map((y) => {
          arrayQuantity.push(y.quantity);
          arrayDate.push(
            y.Payment.updatedAt.toString().substring(0, 10).split("-").join("/")
          );
        });
      });
      // console.log(arrayQuantity, arrayDate)
      // console.log(labels)
      arrayDate.forEach((element, index) => {
        if(!obj[element]){
          obj[element] = +arrayQuantity[index];
        }else{
          obj[element] += +arrayQuantity[index]
        }
      });
      console.log(obj)
      for (let key in obj) {
        labels.forEach((x, i) => {
          console.log(key, x, i)
          if (key == x) {
            // console.log(array[i], key, x)
            if (!array[i]) {
              // console.log(array[i], "<<<<<<<<<<<<<");
              array[i] = obj[key];
            } else {
              console.log("TESTTTTTTTTTTTTTTTTTTT")
              array[i] += obj[key];
            }
          }
        });
      }
      console.log(array)
      res.status(200).json(array);
    } catch (error) {
      next(error);
    }
  }
  static async detailFood(req, res, next) {
    try {
      const data = await Food.findByPk(req.params.id);
      // if (!data) throw { name: "Not found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addFood(req, res, next) {
    try {
      const {
        name,
        price,
        imageUrl,
        description,
        discount = 0,
        quantity,
        CategoryId,
      } = req.body;
      const data = await Food.create({
        name,
        price,
        rate: 0,
        imageUrl,
        description,
        status: "new",
        quantity,
        sales: 0,
        discount,
        is_active: true,
        CategoryId,
        RestaurantId: req.user.restoId,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteFood(req, res, next) {
    try {
      const findData = await Food.findByPk(req.params.id);
      // if (!findData) throw { name: "Not found" };
      await Food.destroy({ where: { id: req.params.id } });
      res
        .status(200)
        .json({ message: `Food with id ${req.params.id} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async editFood(req, res, next) {
    try {
      const findData = await Food.findByPk(req.params.id);
      // if (!findData) throw { name: "Not found" };
      const {
        name,
        price,
        imageUrl,
        description,
        quantity,
        sales,
        discount,
        CategoryId,
      } = req.body;
      await Food.update(
        {
          name,
          price,
          imageUrl,
          description,
          quantity,
          sales,
          discount,
          CategoryId,
          newPrice: price - (discount / 100) * price,
        },
        { where: { id: req.params.id } }
      );
      res
        .status(200)
        .json({ message: `Food with id ${req.params.id} edited success` });
    } catch (error) {
      next(error);
    }
  }
  static async statusFood(req, res, next) {
    try {
      const findData = await Food.findByPk(req.params.id);
      // if (!findData) throw { name: "Not found" };
      const { status } = req.body;
      await Food.update({ status }, { where: { id: req.params.id } });
      res.status(200).json({ message: "Update status success" });
    } catch (error) {
      next(error);
    }
  }
  static async activeFood(req, res, next) {
    try {
      const findData = await Food.findByPk(req.params.id);
      // if (!findData) throw { name: "Not found" };
      const { is_active } = req.body;
      await Food.update({ is_active }, { where: { id: req.params.id } });
      res.status(200).json({ message: "Update status success" });
    } catch (error) {
      next(error);
    }
  }

  static async myRestaurant(req, res, next) {
    try {
      const data = await Restaurant.findOne({ where: { UserId: req.user.id } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async createRestaurant(req, res, next) {
    try {
      const { id } = req.user;
      const {
        name,
        logoUrl,
        description,
        type,
        open_time,
        close_time,
        address,
        latitude,
        longitude,
      } = req.body;
      const restaurant = await Restaurant.create({
        name,
        rate: 0,
        logoUrl,
        description,
        income: 0,
        type,
        is_open: false,
        open_time,
        close_time,
        is_pickup: false,
        is_delivery: false,
        review_count: 0,
        address,
        location: Sequelize.fn(
          "ST_GeomFromText",
          `POINT(${latitude} ${longitude})`
        ),
        UserId: id,
      });

      // if (!restaurant) throw { name: "Not found", msg: "Id not found" };

      res.status(201).json({
        message: "Restaurant success to create",
        restaurant,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editRestaurant(req, res, next) {
    try {
      const {
        name,
        type,
        logoUrl,
        description,
        is_open,
        open_time,
        close_time,
        is_pickup,
        is_delivery,
        address,
        longitude,
        latitude,
      } = req.body;
      await Restaurant.update(
        {
          name,
          type,
          logoUrl,
          description,
          is_open,
          open_time,
          close_time,
          is_pickup,
          is_delivery,
          address,
          longitude,
          latitude,
        },
        { where: { UserId: req.user.id } }
      );
      res
        .status(200)
        .json({ message: `Restaurant with id ${req.user.id} edited success` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteRestaurant(req, res, next) {
    try {
      await Restaurant.destroy({ where: { UserId: req.user.id } });
      res.status(200).json({
        message: `Restaurant with id ${req.user.id} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async allOrder(req, res, next) {
    try {
      let data = await Restaurant.findByPk(req.user.restoId, {
        include: [
          {
            model: Food,
            include: [
              {
                model: OrderItem,
                include: [
                  {
                    model: Payment,
                    order: [["id", "ASC"]],
                    include: [User],
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async allOrderPayment(req, res, next) {
    try {
      let data = await Restaurant.findByPk(req.user.restoId, {
        include: [
          {
            model: Food,
            include: [
              {
                model: OrderItem,
                include: [
                  {
                    model: Payment,
                    order: [["id", "ASC"]],
                    include: [User],
                  },
                ],
              },
            ],
          },
        ],
      });
      let order = [] 
      data.Food.forEach(x => {
        if(x.OrderItems.length > 0){
          x.OrderItems.map(y => {
            order.push(y.Payment)
          })
        }
      })
      let resto = await Restaurant.findByPk(req.user.restoId)
      res.status(200).json({order, resto});
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
