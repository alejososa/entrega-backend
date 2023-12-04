
import { CartManagerMongo } from "../persistencia/DAOs/managers/carts/cartManagerMongo.js";

class CartsService {
    constructor() {
        this.cartManager = new CartManagerMongo();
    };

    async createCarts() {
        const newCart = await this.cartManager.createCarts();
        return newCart;
    };

    async getCartsById(cid) {
        const cart = await this.cartManager.getCartsById(cid);
        return cart;
    };

    async addProductsInCart(cid, pid, quantity) {
        try {
            const cart = await this.cartManager.addProductsInCart(cid, pid, quantity);
            return this.totalQuantityInCart(cart)
        } catch (error) {
            return error
        }
    };

    async deleteProductsInCart(cid, pid) {
        const cart = await this.cartManager.deleteProductsInCart(cid, pid);
        return cart;
    };

    async updateProductsInCart(cid, newProductsInCart) {
        const cart = await this.cartManager.updateProductsInCart(cid, newProductsInCart);
        return cart;
    };

    async clearCart(cid) {
        const cart = await this.cartManager.clearCart(cid);
        return cart;
    };
};

export const cartsService = new CartsService();