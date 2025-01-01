const { DataTypes } = require("sequelize/types/index.js");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropColumn("blogs", "year");
  },
};
