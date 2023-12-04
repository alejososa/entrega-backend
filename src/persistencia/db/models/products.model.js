import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";




const productsSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});

//asocio el schema al plugin de paginate
productsSchema.plugin(mongoosePaginate)

export const productsModels= mongoose.model('Products', productsSchema);