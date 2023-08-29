import {productsModels} from '../../db/models/products.model.js'

class ProductsMongo{
    async findAll(){
try {
    const products= await productsModels.find({})
    return products
} catch (error) {
    return error
}
    }

    async createOne(obj){
        try {
            const newProduct= await productsModels.create(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async findById(id){
        try {
            const product= await productsModels.findById(id)
            return product
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj){
        try {
            const response = await productsModels.findByIdAndUpdate({_id:id},{...obj})
            return response
        } catch (error) {
            return error
        }
    }

    async deleteOne(id){
        try {
            const response = await productsModels.findByIdAndDelete(id)
            return response
        } catch (error) {
            return "id not founded"
        }
    }
}

export const productsMongo= new ProductsMongo()