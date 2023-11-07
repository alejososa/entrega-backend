
import { cartsMongo } from "../persistencia/DAOs/managers/carts/CartsMongo.js";
import { productService } from "./products.services.js";



class CartService {


    async createCart(obj) {
        const response = await cartsMongo.createOne(obj);
        return response
    }

    async deleteCart(id) {
        const response = await cartsMongo.deleteOne(id)
        return response
    }

    async findById(id) {
        const response = await cartsMongo.findById(id)
        return response
    }

    async addProductToCart(cartId, productId, quantity) {

        const response = await cartsMongo.addProductToCart(cartId, productId, quantity);
        return response
    }
    async deleteProductFromCart(cartId, productId) {
        const response = await cartsMongo.deleteProductFromCart(cartId, productId)
        return response
    }

    async clearCart(cartId) {
        const cart = await this.cartsMongo.clearCart(cartId);
        return cart;
    };


    async calculateTotalAmount(cart) {
        try {

            if (!cart) {

                throw new Error('Carrito no encontrado');
            }
            if (!Array.isArray(cart.products) || cart.products.length === 0) {

                throw new Error('Carrito sin productos');
            }
            let totalAmount = 0;


            for (const productInfo of cart.products) {
                console.log("Iterando dentro del bucle");
                console.log("productInfo.product:", productInfo);
                const product = await productService.findById(productInfo);


                if (product !== null) {

                    totalAmount += productInfo.price * productInfo.quantity;

                }
            }
            
            console.log("saliendo del bucle");
            cart.totalAmount = totalAmount;
            await cartsMongo.saveCart(cart);

            return cart;
            
        } catch (error) {
            throw new Error('Error al calcular el total: ' + error.message);
        }
    }
}



export const cartService = new CartService();

