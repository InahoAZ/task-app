import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    //WIP: Que se puedan adjuntar multiples archivos a una tarea.
    attached_file: {
        filename: String,
        path: String
    },
    done: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Task", TaskSchema);
