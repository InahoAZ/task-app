import express from "express";
import taskCtrl from "../controllers/tasks.mjs";
import validate from "express-validation";
import validation from "./validations/tasks.mjs";
import multer from "multer";

const router = express.Router();

/**Manage Server Files Routes */
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.HOME + "/Documentos/Proyectos/task-app/server/public/images/attached_task");
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = "";
        if (file.mimetype === "image/gif") {
            filetype = "gif";
        }
        if (file.mimetype === "image/png") {
            filetype = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "jpg";
        }
        cb(null, "task-attach" + "-" + Date.now() + '.' + filetype);
    },
});

var upload = multer({ storage: storage });

/**API Routes Endpoints*/
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

/** Route for attach files to a task */
router.post('/attachFile',upload.single('file'), taskCtrl.attachFile);
/** Load task when API with taskId route parameter is hit */
router.param("taskId", validate(validation.getTask));
router.param("taskId", taskCtrl.load);

export default router;
