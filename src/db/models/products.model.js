import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";




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

//asocio el schema al plugin de paginate
productsSchema.plugin(mongoosePaginate)

export const productsModels= mongoose.model('products', productsSchema);