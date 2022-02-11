import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

//Escribimos un middleware para encriptar los passwords antes de guardar cualquier usuario
UserSchema.pre("save", function (next) {
    const user = this;
    //Si no hay ningun cambio en un pw existente no se hace nada pasando al siguiente middleware.
    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) return next(hashErr);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (toCompare, done) {

    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if (err) done(err);
        else done(err, isMatch);
    });
};

export default mongoose.model("User", UserSchema);
