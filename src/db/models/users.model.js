import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name:String,
    last_name: String,
    email: String,
    pasword:String
})

const userModel=  mongoose.model('Users',userSchema);

export default userModel;