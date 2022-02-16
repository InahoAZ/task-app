import express from "express";
import routes from "../server/routes/index.mjs";
import bodyParser from "body-parser";
import expressValidation from "express-validation";
import authenticate from "./jwt.mjs";
import env from "dotenv/config";



const app = express();

//utilidades que nos facilitan las responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Definimos una capa de autenticacion en cada request
if (!process.env.NODE_ENV === "test") app.use(authenticate);

//definimos los archivos estaticos de la carpeta public
app.use(express.static('/home/santyyvii/Documentos/Proyectos/task-app/server/public'));

app.use("/api", routes);
//Manejador de errores
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
