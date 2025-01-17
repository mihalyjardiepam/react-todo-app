import "./instrumentation";
import express from "express";
import { router } from "./routes";
import { ServiceConfig } from "./config";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { Logger } from "./logger";
import dotenv from "dotenv";
import { existsSync } from "fs";

if (existsSync(".env")) {
    dotenv.config();
}

const app = express();
app.use(helmet())
app.use(morgan("tiny"))
app.use(router);

const server = app.listen(0, "localhost", async (err) => {
    const fullName = `${ServiceConfig.serviceName}:${ServiceConfig.serviceVersion}`;
    const logger = Logger(fullName);
    if (err) {
        logger.error(`failed to start: ${err}`);
        return process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        logger.log(`MongoDB connected`);
    } catch (error) {
        logger.error(`failed to connect to MongoDB: ${error}`);
        process.exit(2);
    }

    const address = server.address();
    if (typeof address == "object") {
        logger.log(
            `listening on ${address.family} http://${address.address}:${address.port}`
        );
    }
});
