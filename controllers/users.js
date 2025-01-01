const router = require("express").Router();
const { where } = require("sequelize/types/index.js");
const { User, Blog, ReadingList } = require("../models");
router.get("/", async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.send(users);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.send(user);
  } else {
    res.status(404).end();
  }
});

router.get("/:id", async (req, res) => {
  const where = {};
  if (req.query.read) {
    where.isRead = req.query.read === "true";
  }
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: "readings",
        through: {
          attributes: ["id", "isRead"],
          as: "readinglists",
          where,
        },
      },
    ],
  });
  res.send(user);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
});
module.exports = router;
