const { DataTypes } = require("sequelize/types/index.js");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("reading_lists", "is_read", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropColumn("reading_lists", "is_read");
  },
};
