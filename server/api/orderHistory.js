const router = require("express").Router();
const {
  models: { Order, Product },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");

router.get("/:id", requireToken, async (req, res, next) => {
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
