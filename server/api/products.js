const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAllPriceConversion();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOnePriceConversion(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get("/tags/:tagname", async (req, res, next) => {
  try {
    const tag = await Product.findByTagPriceConversion(req.params.tagname);
    res.json(tag);
  } catch (err) {
    next(err);
  }
});

router.get("/multipleTags/:tags", async (req, res, next) => {
  const splitTags = req.params.tags.split(",");

  try {
    const multipleTags = await Product.findByMultipleTags(splitTags);
    res.json(multipleTags);
  } catch (err) {
    next(err);
  }
});

router.post("/new", requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/inventory/:id", async (req, res, next) => {
  try {
    const product = await Product.findOnePriceConversion(req.params.id);
    res.send(await product.update({ inventory: req.body.inventory }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
