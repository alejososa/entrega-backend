import { productService } from "../services/products.services.js";

class ProductsControllers{

    async findAll(req,res){
        try {
            const products = await productService.findAll()
            res.status(200).json({message:"success", products});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    
    async findOne(req,res){
        const{productId}= req.params;
        try {
            const product= await productService.findById(productId);
            res.status(200).json({message:"success", product});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async createOne(req,res){
        const{product_title, product_description, product_price, product_code, product_stock, product_category, product_thumbnail}= req.body;
        if(!product_title|| !product_description|| !product_price || !product_code ||!product_stock || !product_category || !product_thumbnail){
            return res.status(400).json({message:"Product data is missing"});
        }
        try {
            const newProduct= await productService.createOne(req.body);
            res.status(200).json({message:"New product created", newProduct})
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteOne(req,res){
        const{productId}= req.params;
        const deletedProduct= await productService.deleteOne(productId);
        return res.status(200).json({message:"Product deleted"})

        }
    }

export const productsControllers= new ProductsControllers();