const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.STRING,
    defaultValue: "unfulfilled",
  },
});

module.exports = Order;
