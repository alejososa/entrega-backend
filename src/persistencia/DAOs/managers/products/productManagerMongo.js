import { productsModels } from "../../../db/models/products.model.js";

class ProductManagerMongo {
  async addProduct(product) {
    const newProduct = new productsModel(product);
    await newProduct.save();
    return newProduct;
  }

  async getProductsCount(queryOptions = {}) {
    return await productsModels.countDocuments(queryOptions);
  }

  async getProducts(queryOptions = {}, sortOptions = {}, limit = 10, page = 1) {
    const options = {
      sort: sortOptions,
      page: page,
      limit: limit,
      lean: true,
    };

    const result = await productsModels.paginate(queryOptions, options);
    return result;
  }

  async getProductById(id) {
    return await productsModels.findById(id);
  }

  async updateProduct(id, updatedProducts) {
    const updatedProduct = await productsModels.findByIdAndUpdate(id, updatedProducts, { new: true });
    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await productsModels.findByIdAndDelete(id);
    return deletedProduct;
  }
}

export { ProductManagerMongo };