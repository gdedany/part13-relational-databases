const { DataTypes } = require("sequelize/types/index.js");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "is_disabled", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.createTable("active_sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropColumn("users", "is_disabled");
    await queryInterface.dropTable("active_sessions");
  },
};
