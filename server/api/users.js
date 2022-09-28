const router = require("express").Router();
const session = require("express-session");
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");

module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "isAdmin",
        "imageURL",
        "fullName",
        "email",
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      attributes: ["id", "username"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    res.json(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user.dataValues.isAdmin === false) {
      await user.destroy();
      res.send(user);
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});
