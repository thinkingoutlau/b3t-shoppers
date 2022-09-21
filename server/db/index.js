//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const OrderHistory = require("./models/OrderHistory");

//associations could go here!
User.hasMany(OrderHistory);
OrderHistory.belongsTo(User);
OrderHistory.belongsTo(Product);
Product.hasMany(OrderHistory);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderHistory,
  },
};
