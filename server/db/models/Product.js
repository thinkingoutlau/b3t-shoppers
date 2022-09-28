const Sequelize = require("sequelize");
const db = require("../db");
const { Op } = require("sequelize");

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

Product.findByTagPriceConversion = async function (tag) {
  const product = await this.findAll({
    where: {
      type: tag,
    },
  });
  for (let i = 0; i < product.length; i++) {
    product[i].price = product[i].price / 100;
  }
  return product;
};

Product.findByMultipleTags = async function (multipleTags) {
  const tag = await Product.findAll({
    where: {
      type: {
        [Op.in]: multipleTags,
      },
    },
  });
  for (let i = 0; i < tag.length; i++) {
    tag[i].price = tag[i].price / 100;
  }

  return tag;
};

module.exports = Product;
