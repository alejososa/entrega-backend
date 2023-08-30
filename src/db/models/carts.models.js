import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    cart_name: {
        type: String,
        required: true,
        unique: true
    },
    cart_products:[
        {
        product_id: String,
        product_title: String,
        quantity: Number        
        }
        ],
   // products:[
     //   {
       //     type: mongoose.Schema.Types.ObjectId,
         //   ref: 'products'
        //}
   // ]
        
    //más adelante vamos a er como relacionar esto y agregar la lista de productos seleccionados
});


export const cartsModels = mongoose.model("carts", cartsSchema)


