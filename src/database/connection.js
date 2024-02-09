import { Sequelize } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.db_host,
  database: config.db_name,
  username: config.db_user,
  password: config.db_password,
});

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced.");
  } catch (error) {
    console.error(`Error synchronizing database: ${error}`);
  }
};
