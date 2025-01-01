const Sequelize = require("sequelize/types/index.js");
const { Umzug, SequelizeStorage } = require("umzug/lib/index.js");

const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    console.log("connected to database");
  } catch (err) {
    console.log("failed to connect to database", err);
    return process.exit(1);
  }
  return null;
};
module.exports = { connectToDatabase, sequelize };
