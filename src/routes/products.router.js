import { Router } from "express";
import productManager from "../ProductManager.js";


const router =Router() ;


router.get('/', async (req, res)=>{
    try {
        const products = await productManager.getProducts()

        const limit= req.query.limit
        const resLimit= products.slice(0,limit)
        res.status(200).json({message:"Products", resLimit})
        
    } catch (error) {
        res.status(500).json({error})
    }
})

//get
router.get('/:productId', async (req, res)=>{
    const {productId}= req.params    
    try {
        const product= await productManager.getProductById(+productId)
        res.status(200).json({message:"product", product})
    } catch (error) {
        res.status(500).json({error})
    }
})

//post
router.post('/', async (req, res)=>{
    try {
        const newProduct= await productManager.addProduct(req.body)
        res.status(200).json({message:"Product created", user: newProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})
//delete
router.delete('/:productId', async (req, res)=>{
    const {productId}= req.params
    try {
        const response = await productManager.deleteProduct(+productId)
        res.status(200).json({message:'Product deleted'})
    } catch (error) {
        res.status(500).json({error})
    }
})

//put
router.put('/:productId', async (req, res)=>{
    const {productId}= req.params
    try {
        const updatedProduct= await productManager.updateProduct(+productId, req.body)
        res.status(200).json({message:'Product updated'})
    } catch (error) {
        res.status(500).json({error})
    }
})





export default router;