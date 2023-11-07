import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  cart_name: {
    type: String,
    required: true,
    unique: true
  },

  products: {
    type: [
    {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
     ] ,
default:[]
        
  }

});
cartsSchema.pre("find", function (next) {
  this.populate("products._id");
  next();
});


export const cartsModels = mongoose.model("carts", cartsSchema)


