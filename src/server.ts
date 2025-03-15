import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/db";
import { Logger } from "./helpers/Logger";

dotenv.config();

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.ENVIRONMENT?.toUpperCase() || "DEVELOPMENT";
const DB_SYNC = process.env.DB_SYNC === "true"; // Convert DB_SYNC to boolean


const startServer = async () => {
    try {
        // Environment banner
        const banner = `
    ##############################################
    #          ENVIRONMENT: ${ENVIRONMENT}          #
    ##############################################
    `;
        Logger.info(`Environment banner:\n${banner.trim()}`);

        Logger.info(`Starting server in ${ENVIRONMENT} environment...`);

        // Database connection
        Logger.info("Connecting to the database...");
        await sequelize.authenticate();
        Logger.info("Database connected successfully!");

        // Database synchronization
        if (ENVIRONMENT === "DEVELOPMENT" || DB_SYNC) {
            Logger.info(
                `Database synchronization ${ENVIRONMENT === "DEVELOPMENT" ? "enabled (DEVELOPMENT mode)" : "forced by DB_SYNC=true"
                }...`
            );
            try {
                await sequelize.sync({ alter: true }); // Alter schema for development or forced sync
                Logger.info("Database synchronized successfully!");
            } catch (syncError: any) {
                Logger.error(
                    new Error(`Database synchronization failed with error: ${syncError.message}`)
                );
                Logger.error(new Error(
                    `Full error details: ${JSON.stringify(
                        {
                            name: syncError.name,
                            message: syncError.message,
                            stack: syncError.stack,
                        },
                        null,
                        2
                    )}`
                ));
                throw syncError; // Rethrow to trigger unhandled rejection
            }
        } else {
            Logger.warn(
                `Database synchronization is disabled in the ${ENVIRONMENT} environment. Ensure migrations are applied.`
            );
        }

        // Start server
        app.listen(PORT, () => {
            Logger.info(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error: any) {
        Logger.error(new Error(`Failed to start the server: ${error.message}`));
        Logger.error(new Error(
            `Full error details: ${JSON.stringify(
                {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                },
                null,
                2
            )}`
        ));
        process.exit(1); // Exit on failure
    }
};

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err: Error) => {
    Logger.error(new Error(`Uncaught Exception: ${err.message}`));
    Logger.error(new Error(`Stack trace: ${err.stack}`));
    process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
    Logger.error(new Error("Unhandled Rejection"));
    Logger.error(
        new Error(`Rejection details: ${JSON.stringify(reason, null, 2) || "No rejection details available"}`)
    );
    process.exit(1);
});

// Start the server
startServer();
