const router = require("express").Router();
const {
  models: { User },
} = require("../db");

module.exports = router;

const adminsOnly = (req, res, next) => {
  console.log("req", req.token);
  let { id, fullName, email, password, isAdmin } = req.user.dataValues;

  if (id && fullName && email && password) {
    if (!isAdmin) {
      const err = new Error(
        "You don't have the correct admin rights to do this!"
      );
      err.status = 401;
      return next(err);
    }
  } else {
    const err = new Error("Please log in as admin to do this!");
    err.status = 401;
    return next(err);
  }
};

router.get("/", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
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
