import config from "./env/index.mjs";
import jwt from "express-jwt";

const authenticate = jwt({
    secret: config.default.jwtSecret,
});

export default authenticate;
