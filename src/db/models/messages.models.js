import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    message:{
type:String,
    },
})

export const messageModels= mongoose.model("messge", messageSchema)