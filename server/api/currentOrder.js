const router = require("express").Router();
const {
  models: { Order, User, Product },
} = require("../db");
const Order_Product = require("../db/models/Order_Product");

router.get("/:id", async (req, res, next) => {
  try {
    let cart = await Order.findOne({
      where: {
        userId: req.params.id,
        status: "unfulfilled",
      },
      include: {
        model: Product,
      },
    });

    if (!cart) {
      cart = await Order.create({
        userId: req.params.id,
      });
    }

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    let cart = await Order.findOne({
      where: {
        userId: req.params.id,
        status: "unfulfilled",
      },
      include: {
        model: Product,
      },
    });

    await Order_Product.create({
      orderId: cart.id,
      productId: req.body.productId,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    cart = await Order.findOne({
      where: {
        userId: req.params.id,
        status: "unfulfilled",
      },
      include: {
        model: Product,
      },
    });

    res.json(cart.products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;