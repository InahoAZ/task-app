import express from "express";
import taskCtrl from "../controllers/tasks.mjs";
import validate from "express-validation";
import validation from "./validations/tasks.mjs";

const router = express.Router();

router
    .route("/")
    /** GET /api/tasks - Get list of tasks */
    .get(taskCtrl.list)

    /** POST /api/tasks - Create new task */
    .post(validate(validation.createTask), taskCtrl.create);

router
    .route("/:taskId")
    /** GET /api/tasks/:taskId - Get task */
    .get(taskCtrl.get)

    /** PUT /api/tasks/:taskId - Update task */
    .put(validate(validation.updateTask), taskCtrl.update)

    /** DELETE /api/tasks/:taskId - Delete task */
    .delete(validate(validation.updateTask), taskCtrl.remove);

/** Load task when API with taskId route parameter is hit */
router.param("taskId", validate(validation.getTask));
router.param("taskId", taskCtrl.load);

export default router;
