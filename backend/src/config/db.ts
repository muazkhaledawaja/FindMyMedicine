import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Logger } from "../helpers/Logger";
import * as models from "../models"; // <-- Import everything from models index

dotenv.config({ path: ".env" });

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, ENVIRONMENT } = process.env;

if (!DB_NAME || !DB_USER || !DB_HOST || !DB_PORT) {
  console.error("Missing required database configuration in environment variables.");
  process.exit(1);
}

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: ENVIRONMENT === "development" ? console.log : false,
  models: Object.values(models), // <-- Dynamically register all models
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    Logger.info("Database connected successfully!");
  } catch (error) {
    Logger.error(new Error("Unable to connect to the database:"), error);
    process.exit(1);
  }
})();

export default sequelize;
