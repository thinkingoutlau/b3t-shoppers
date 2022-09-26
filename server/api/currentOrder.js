const router = require("express").Router();
const {
  models: { Order, Product, Order_Product },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
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

    res.json(cart.products);
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

router.put("/:id", async (req, res, next) => {
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

    const currentProduct = cart.products.filter(
      (obj) => obj.id === req.body.productId
    )[0].order_products;

    await currentProduct.update(req.body);

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
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.id,
        status: "unfulfilled",
      },
      include: {
        model: Product,
      },
    });

    const currentProduct = cart.products.filter(
      (obj) => obj.id === req.body.productId
    )[0];

    const deleteProduct = await Order_Product.findOne({
      where: {
        productId: currentProduct.id,
        orderId: cart.id,
      },
    });

    await deleteProduct.destroy();
    res.json(deleteProduct);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
