import express from "express";
import authCtrl from "../controllers/auth.mjs";

const router = express.Router();

router
    .route("/token")
    /** POST /api/auth/token - Get JWT auth token */
    .post(authCtrl.authenticate, authCtrl.generateToken, authCtrl.respondJWT);

export default router;
