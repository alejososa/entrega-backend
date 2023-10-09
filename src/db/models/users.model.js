import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fromGithub: { type: Boolean, default: false },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'premium'],
        default: 'client',
    }

})

const userModel = mongoose.model('Users', userSchema);

export default userModel;