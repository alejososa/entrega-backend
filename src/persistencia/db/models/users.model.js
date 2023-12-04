import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
    },
    role: {
        type: String,
        default: "USER",
    },
    fromGithub: {
        type: Boolean,
        default: false,
    },
});

const userModel = mongoose.model('user', userSchema);

export default userModel;