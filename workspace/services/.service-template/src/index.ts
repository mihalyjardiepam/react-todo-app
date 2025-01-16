import express from "express";
import { router } from "./routes";

const app = express();
app.use(router);

const server = app.listen(0, "localhost", (err) => {
    if (err) {
        console.error("Failed to start service: ", err);
        return process.exit(1);
    }

    const address = server.address();
    if (typeof address == "object") {
        console.log(`Server listening on ${address.family} http://${address.address}:${address.port}`);
    }
});
