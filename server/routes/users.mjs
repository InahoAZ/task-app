import express from "express";
import userCtrl from "../controllers/users.mjs";
import user from "../models/user.mjs";
import authenticate from "../../config/jwt.mjs";

const router = express.Router();

router
    .route("/")
    /** GET /api/users - Get a list of users */
    .get(authenticate, userCtrl.list)

    /** POST /api/users - Create a new user */
    .post(userCtrl.create);

router
    .route("/:userId")
    /** GET /api/users/:userId Get user */
    .get(userCtrl.get)
    /** PUT /api/users/:userId Update user */
    .put(userCtrl.update)
    /** DELETE /api/users/:userId Delete user */
    .delete(userCtrl.remove);

/**Load user when API use userId as param */
router.param("userId", userCtrl.load);

export default router;
