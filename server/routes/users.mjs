import express from "express";
import userCtrl from "../controllers/users.mjs";
import user from "../models/user.mjs";
import authenticate from "../../config/jwt.mjs";
import validate from "express-validation";
import validation from "./validations/users.mjs";

const router = express.Router();

router
    .route("/")
    /** GET /api/users - Get a list of users */
    .get(userCtrl.list)

    /** POST /api/users - Create a new user */
    .post(validate(validation.createUser), userCtrl.create);

router
    .route("/:userId")
    /** GET /api/users/:userId Get user */
    .get(userCtrl.get)
    /** PUT /api/users/:userId Update user */
    .put(validate(validation.updateTask, userCtrl.update))
    /** DELETE /api/users/:userId Delete user */
    .delete(validate(validation.updateTask, userCtrl.remove));

/**Load user when API use userId as param */
router.param("userId", validate(validation.getUser));
router.param("userId", userCtrl.load);

export default router;
