
import {cartsMongo} from "../persistencia/DAOs/managers/carts/CartsMongo.js";




class CartService {

async createCart(obj){
const response= await cartsMongo.createOne(obj);
return response 
}

async deleteCart(id){
    const response = await cartsMongo.deleteOne(id)
    return response
}

async findById(id){
    const response = await cartsMongo.findById(id)
    return response
}

async addProductToCart(cartId, productId, quantity) {

const response = await cartsMongo.addProductToCart(cartId, productId, quantity);
return response
}
async deleteProductFromCart(cartId, productId){
    const response= await cartsMongo.deleteProductFromCart(cartId, productId)
    return response
}

async clearCart(cartId) {
    const cart = await this.cartsMongo.clearCart(cartId);
    return cart;
};



}

export const cartService= new CartService();

