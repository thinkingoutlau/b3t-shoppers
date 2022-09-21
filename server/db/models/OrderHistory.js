const Sequelize = require("sequelize");
const db = require("../db");

const OrderHistory = db.define("orderHistory", {
  orderNumber: {
    type: Sequelize.INTEGER,
  },
  productName: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderHistory;
