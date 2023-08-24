import {cartsModels} from '../../db/models/carts.models.js';

class CartsMongo{
            //crear carrito con nombre y arrays de productos vacio
            async createOne(obj){

                try {
                    const newCart= await cartsModels.create(obj)
                    return newCart
                } catch (error) {
                    return error
                }
            }
            //buscar todos los carritos
            async findAll(){
                try {
                    const carts= await cartsModels.find({})
                } catch (error) {
                    return error
                }
                    }
        //buscar carrrito por id
            async findById(id){
                try {
                    const cart= await cartsModels.findById(id)
                    return cart
                } catch (error) {
                    return error
                }
            }
        
            async addProductToCart(cartId, productId, quantity) {
                const cart = await this.findById(cartId);

                const existingProductIndex = cart.cart_products.findIndex((p) => p.product_id === productId);
            
                if (existingProductIndex !== -1) {
                    cart.cart_products[existingProductIndex].quantity += quantity || 1;
                } else {
                    cart.cart_products.push({ product_id: productId, quantity: quantity || 1 });
                }
            
                try {
                    await cart.save(); // Guarda los cambios en la base de datos
                    console.log(`Cart Updated ${cartId}`);
                    return cart;
                } catch (error) {
                    throw new Error('Can\'t update cart: ' + error.message);
                }
            }
                async deleteOne(id){
                    try {
                        const response = await cartsModels.findByIdAndDelete(id)
                        return response
                    } catch (error) {
                        return "id not founded"
                    }
                }
            
}

export const cartsMongo = new CartsMongo()