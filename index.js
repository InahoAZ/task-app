import app from "./config/express-conf.mjs";
import config from "./config/env/index.mjs";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect(config.default.db);
mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${config.default.db}`);
});
mongoose.connection.on("connected", () => {
    console.log(`Connected to database: ${config.default.db}`);
});
if (config.env === "development") {
    mongoose.set("debug", true);
}



app.listen(config.default.port, () => {
    console.log(
        `API Server started and listening on port ${config.default.port}`
    );
});

export default app;
