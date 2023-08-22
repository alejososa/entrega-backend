import mongoose from "mongoose";

const productsSchema=new mongoose.Schema({
    product_title:{
        type:String,
        required: true
    },
    product_description:{
        type: String,
        required: true
    },
    product_price:{
        type: Number,
        required: true
    },
    product_code:{
        type:Number,
        required:true,
        unique: true
    },
    product_stock:{
        type: Number,
        required: true
    },
    product_category:{
        type: String,
        required: true
    },
    product_thumbnail:{
        type: String,
    },

})


export const productsModels= mongoose.model('products', productsSchema);