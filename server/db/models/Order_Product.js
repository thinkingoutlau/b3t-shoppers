const Sequelize = require("sequelize");
const db = require("../db");

const Order_Product = db.define("order_products", {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Order_Product;
