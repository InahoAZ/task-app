import express from "express";
import routes from "../server/routes/index.mjs";
import bodyParser from "body-parser";
import expressValidation from "express-validation";
import authenticate from "./jwt.mjs";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authenticate);
app.use("/api", routes);

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res.status(err.status).json(err);
    } else {
        res.status(500).json({
            status: err.status,
            message: err.message,
        });
    }
});

export default app;
