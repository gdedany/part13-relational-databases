const { userFinder } = require("../middleware");
const { ReadingList } = require("../models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  res.send(readingList);
});

router.put("/:id", userFinder, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (req.user.id !== readingList.userId) {
    res.status(403).send("not allowed");
  }
  readingList.isRead = req.body.isRead;
  await readingList.save();
  res.send(readingList);
});

module.exports = router;
