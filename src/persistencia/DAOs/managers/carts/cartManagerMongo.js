import { cartsModels } from '../../../db/models/carts.models.js';

class CartManagerMongo {
    constructor() {
        this.loadCarts();
    };

    async loadCarts() {
        this.carts = await cartsModels.find();
    };

    async saveCarts(cart) {
        await cart.save();
    };

    async createCarts() {
        const newCart = new cartsModels({
            products: [],
        });
        const savedCarts = await this.saveCarts(newCart);
        return savedCarts;
    };

    async getCartsById(cid) {
        return await cartsModels.findById(cid);
    };

    async addProductsInCart(cid, pid, quantity) {
        const cart = await this.getCartsById(cid);
        const productExist = cart.products.find((p) => p.product.equals(pid));
        if (productExist) {
            productExist.quantity += quantity || 1;
        } else {
            cart.products.push({product: pid, quantity: quantity || 1});
        }
        await this.saveCarts(cart);
        return cart;
    };

    async deleteProductsInCart(cid, pid) {
        const cart = await this.getCartsById(cid);
        cart.products = cart.products.filter((p) => !p.product.equals(pid));
        await this.saveCarts(cart);
        return cart;
    };

    async updateProductsInCart(cid, newProductsInCart) {
        const cart = await this.getCartsById(cid);
        newProductsInCart.forEach((newProducts) => {
            const productExist = cart.products.find(
                (product) => product.product.toString() === newProducts.product
            );
            if(productExist) {
                productExist.quantity += newProducts.quantity;
            } else {
                cart.products.push(newProducts);
            }
        });
        await this.saveCarts(cart);
        return cart;
    };

    async updateProductsQuantityInCart(cid, pid, newQuantity) {
        const cart = await this.getCartsById(cid);
        const product = cart.products.find((p) => p.product.equals(pid));
        if(product) {
            product.quantity += newQuantity;
        } else {
            cart.products.push({product: pid, quantity: newQuantity});
        }
        await this.saveCarts(cart);
        return cart;
    };

    async clearCart(cid) {
        const cart = await this.getCartsById(cid);
        cart.products = [];
        await this.saveCarts(cart);
        return cart;
    };
};


export {CartManagerMongo};
