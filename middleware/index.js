const { Blog, User, ActiveSession } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const userFinder = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.substring(7)
    : null;

  const decodedToken = jwt.verify(token, SECRET);
  const userId = decodedToken.id;
  req.user = await User.findByPk(userId);
  const activeSession = await ActiveSession.findOne({ where: { token } });
  console.log("activeSession :", activeSession);
  if (!activeSession || !req.user || req.user.isDisabled) {
    res.status(401).send({ error: "invalid token" });
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "TypeError") {
    return response
      .status(400)
      .send({ error: "unexpected error", details: error.message });
  }
  if (error.name === "SyntaxError") {
    return response.status(400).send({ error: "malformatted payload" });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(403).send({ error: "invalid auth token" });
  }

  next(error);
};

module.exports = { blogFinder, errorHandler, userFinder };
