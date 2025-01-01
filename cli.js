require("dotenv/lib/main.js").config();
const { Sequelize, DataTypes, Model } = require("sequelize/types/index.js");
const express = require("express");
const app = express();
app.use(express.json());
const sequelize = new Sequelize(
  "postgres://postgres:xdE4vtJ41ml6PW6@localhost:5432/postgres"
);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "blog" }
);

const main = async () => {
  const blogs = await Blog.findAll({});

  blogs.map((blog) => {
    console.log(
      `${blog.dataValues.author}: ${blog.dataValues.title}, ${blog.dataValues.likes} likes`
    );
  });
};

main();
