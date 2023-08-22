import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    cart_name: {
        type: String,
        required: true
    },
   
    //más adelante vamos a er como relacionar esto y agregar la lista de productos seleccionados
});


export const cartsModels = mongoose.model("carts", cartsSchema)


