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

Product.findAllPriceConversion = async function () {
  const allProducts = await this.findAll();
  for (let i = 0; i < allProducts.length; i++) {
    allProducts[i].price = allProducts[i].price / 100;
  }
  return allProducts;
};

Product.findOnePriceConversion = async function (id) {
  const product = await this.findByPk(id);
  product.price = product.price / 100;
  return product;
};

module.exports = Product;
