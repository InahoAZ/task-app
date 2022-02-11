import express from "express";
import routes from "../server/routes/index.mjs";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((err, req, res, next) => {
    res.status(err.status).json({
        status: err.status,
        message: err.message,
    });
});

export default app;
