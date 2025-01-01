const { Model, DataTypes } = require("sequelize/types/index.js");
const { sequelize } = require("../util/db");
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: "user" }
);
module.exports = User;
