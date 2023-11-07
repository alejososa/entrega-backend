
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

    async totalAmount(cart) {
        try {
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            // let totalAmount = 0;

            // for (const productInfo of cart.products) {
            //     const product = await productService.findById(productInfo.product);
            //     if (product) {
            //         totalAmount += product.price * productInfo.quantity;
            //     }
            // }

            //hacemos que cart.product sea iterable
let totalAmount=0;
            if (typeof cart.products === 'object' && cart.products !== null) {
                // Convierte los valores de las propiedades del objeto en un arreglo
                const productIds = Object.values(cart.products);

                 

                for (const productId of productIds) {
                    const product = await productService.findById(productId);
                    
                    if (!product) {
                        return res.status(400).json({ error: "Product not found" });
                    }
                    if (product) {
                    cart.totalAmount = productId.price * productId.quantity;
                    }
                }

            }

            cart.totalAmount = totalAmount;
            await cartsMongo.saveCart(cart)

            return cart;



        } catch (error) {
            throw new Error('Error al calcular el total: ' + error.message);
        }
    }
}



export const cartService = new CartService();

