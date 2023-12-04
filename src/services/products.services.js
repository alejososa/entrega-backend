import { ProductManagerMongo } from "../persistencia/DAOs/managers/products/productManagerMongo.js";

class ProductsService {
    constructor() {
        this.productsManager = new ProductManagerMongo();
    };
    async addProducts(product) {
        const newProduct = await this.productsManager.addProducts(product);
        return newProduct;
    };

    async getProducts(queryOptions = {}, sortOptions = {}, limit = 10, page = 1) {
        const products = await this.productsManager.getProducts(queryOptions, sortOptions, limit, page);
        return products;
    };

    async getProductsById(pid) {
        const product = await this.productsManager.getProductsById(pid);
        return product;
    };

    async updateProducts(pid, updatedProducts) {
        const updateProducts = await this.productsManager.updateProducts(pid, updatedProducts);
        return updateProducts;
    };

    async deleteProducts(pid) {
        const deletedProducts = await this.productsManager.deleteProducts(pid);
        return deletedProducts;
    };
};

export const productsService = new ProductsService();