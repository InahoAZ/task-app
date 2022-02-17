import { filter } from "async";
import Task from "../models/task.mjs";
import { unlink } from "fs/promises";
import path from "path";

function load(req, res, next, id) {
    Task.findById(id)
        .exec()
        .then(
            (task) => {
                req.dbTask = task;
                return next();
            },
            (e) => next(e)
        );
}

function get(req, res) {
    return res.json(req.dbTask);
}

function create(req, res, next) {
    Task.create({
        user: req.body.user,
        description: req.body.description,
    }).then(
        (savedTask) => {
            return res.json(savedTask);
        },
        (e) => next(e)
    );
}

function update(req, res, next) {
    const task = req.dbTask;
    Object.assign(task, req.body);

    task.save().then(
        () => res.sendStatus(204),
        (e) => next(e)
    );
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Task.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then(
            (tasks) => res.json(tasks),
            (e) => next(e)
        );
}

function remove(req, res, next) {
    const task = req.dbTask;
    task.remove().then(
        () => res.sendStatus(204),
        (e) => next(e)
    );
}

function attachFile(req, res, next) {
    if (!req.file) {
        res.status(500);
        return next(err);
    }
    const path_saved = {
        filename: req.file.filename,
        path: `http://localhost:3001/images/attached_task/${req.file.filename}`,
    };
    const task = req.dbTask;
    task.attached_file = path_saved;

    task.save().then(
        () => res.sendStatus(204),
        (e) => next(e)
    );

    //WIP: Parametrizar BASE_URL
    res.json({ fileUrl: path_saved });
}

function detachFile(req, res, next) {
    const task = req.dbTask;

    //Si no hay ningun archivo que desadjuntar
    if(!task.toObject().attached_file){
        return res.sendStatus(404);
    }
    
    //WIP: ver una manera mas elegante de manejar rutas
    const static_path = path.resolve(
        "server/public/images/attached_task",
        task.attached_file.filename
    );
    console.log(static_path);
    unlink(static_path)
        .then((err) => {
            console.log("successfully deleted ");
        })
        .catch((err) => {
            next(err);
        });

    task.attached_file = null;
    task.save().then(
        () => res.sendStatus(204),
        (e) => next(e)
    );
    
}

export default {
    load,
    get,
    create,
    update,
    list,
    remove,
    attachFile,
    detachFile,
};
