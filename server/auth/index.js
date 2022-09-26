const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
    console.log("print token", req.body.password);
  } catch (err) {
    next(err);
  }
});

router.put("/editPassword", async (req, res, next) => {
  try {
    const updatePassword = await User.findByToken(req.params.id);
    await updatePassword.update(req.body.password);
    const updateToNewPassword = await User.findByToken(req.params.id);
    res.send(updateToNewPassword);
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
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
