const router = require("express").Router();
const {
  models: { Order, Product },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    let cart = await Order.findOne({
      where: {
        userId: req.params.id,
        status: "fulfilled",
      },
      include: {
        model: Product,
      },
    });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
