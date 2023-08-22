import {cartsModels} from '../../db/models/carts.models.js';

class CartsMongo{

    async findAll(){
        try {
            const carts= await cartsModels.find({})
            return carts
        } catch (error) {
            return error
        }
            }
        
            async createOne(obj){

                try {
                    const newCart= await cartsModels.create(obj)
                    return newCart
                } catch (error) {
                    return error
                }
            }
        
            async findById(id){
                try {
                    const cart= await cartsModels.findById(id)
                    return cart
                } catch (error) {
                    return error
                }
            }
        
            async addProductToCart(cartId, productId, quantity) {
                const cart = await this.getCartById(cartId);
                const existingProduct = cart.products.find((p) => p.product.equals(productId));
                
                if (existingProduct) {
                existingProduct.quantity += quantity || 1;  
                } else {
                cart.products.push({ product: productId, quantity: quantity || 1 });
                }
            
                try {
                await this.saveCart(cart);
                console.log(`product added ${cartId}`);
                } catch (error) {
                throw new Error('not possible: ' + error.message);
                }
            
                return cart;
                }
            
        
            async deleteById(id){
                try {
                    const response = await cartsModels.deleteById(id)
                    return "cart deleted"
                } catch (error) {
                    return "id not founded"
                }
            }
}

export const cartsMongo = new CartsMongo()