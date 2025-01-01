const { ActiveSession } = require("../models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const token = req.headers.authorization.substring(7);
  if (token && (await ActiveSession.destroy({ where: { token } }))) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});
module.exports = router;
