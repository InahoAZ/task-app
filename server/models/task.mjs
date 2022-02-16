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
    attached_file:{
        data: Buffer,
        contentType: String
    },
    done: {
        type: Boolean,
        default: false,
    },
});


export default mongoose.model("Task", TaskSchema);
