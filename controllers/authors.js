const router = require("express").Router();
const { fn, col } = require("sequelize/types/index.js");

const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    group: ["author"],
    attributes: [
      "author",
      [fn("COUNT", col("id")), "articles"],
      [fn("SUM", col("likes")), "likes"],
    ],
  });
  res.send(blogs);
});

module.exports = router;
