const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.put("/editPassword", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    if (token) {
      const user = await User.findByToken(token);
      const newUser = await user.update({ password: req.body.newPassword });
      const newToken = await User.authenticate({
        username: req.body.username,
        password: req.body.newPassword,
      });
      res.send(newToken);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, fullName, email } = req.body;
    const user = await User.create({ username, password, fullName, email });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
