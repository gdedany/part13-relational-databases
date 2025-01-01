const express = require("express");
const app = express();

const { errorHandler } = require("./middleware");
require("express-async-errors");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

app.use(express.json());

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs/", blogsRouter);
const usersRouter = require("./controllers/users");
app.use("/api/users/", usersRouter);
const loginRouter = require("./controllers/login");
app.use("/api/login/", loginRouter);
const authorsRouter = require("./controllers/authors");
app.use("/api/authors/", authorsRouter);
const readingsRouter = require("./controllers/readingLists");
app.use("/api/readinglists/", readingsRouter);
const logoutRouter = require("./controllers/logout");
app.use("/api/logout/", logoutRouter);

app.use(errorHandler);
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => console.log(`running on ${PORT}`));
};
start();
