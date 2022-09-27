const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  inventory: {
    type: Sequelize.INTEGER,
  },
});

Product.beforeSave(function (product) {
  product.price = product.price * 100;
});

module.exports = Product;
