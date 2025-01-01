const router = require("express").Router();
const { User, ActiveSession } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { userFinder } = require("../middleware");

router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && req.body.password == "secret") {
    const userForToken = {
      username: user.username,
      id: user.id,
    };
    const token = jwt.sign(userForToken, SECRET);
    await ActiveSession.create({ token });
    res.send({ token, username: user.username, id: user.id });
  } else {
    res.status(401).send({ error: "invalid username or password" });
  }
});

router.get("/me", userFinder, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
