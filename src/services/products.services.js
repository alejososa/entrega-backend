import { productsMongo } from "../persistencia/DAOs/managers/products/ProductsMongo.js";
import ProductDto from "../persistencia/DTOs/products.dto.js";

class ProductServices{

    async findAll(obj){
        const response = await productsMongo.findAll(obj);
        return response
    }

    async findById(id){
        const response = await productsMongo.findById(id);
        return response
    }
    async createOne(obj){
        const productDto= new ProductDto({...obj});
        const response = await productsMongo.createOne(productDto);
        return response
    }
    //preguntar por este
    async updateOne(obj){

    }

    async deleteOne(id){
        const deletedProduct= await productsMongo.deleteOne(id);
        return deletedProduct;
    }
}

export const productService= new ProductServices();