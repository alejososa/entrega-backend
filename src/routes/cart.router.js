import { Router } from "express"
//comiteado para usar mongoose
//import cartManager from "../CartManager.js";
import {cartsMongo} from "../managers/carts/CartsMongo.js";


const router = Router();



// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    //const newCartId = cartManager.createCart();
    const {cart_name}=req.body;
if(!cart_name){
    return res.status("complete all  fields")
}
    //const newCartId= cartsMongo.createOne()
    //if (newCartId !== null) {
      //  res.status(201).json({ id: newCartId });
    //} else {
      //  res.status(500).json({ error: 'Error al crear el carrito' });
    //}
    try {
        const newCart = cartsMongo.createOne(req.body)
        res.status(200).json({message: "cart created", user:newCart})
    } catch (error) {
        res.status(500).json({error}) 
    }
});
//ruta para obetener todos los carritos

router.get('/', async (req,res)=>{
    try {
        const carts = await cartsMongo.findAll()
        res.status(200).json({message:"Carts", carts})
        return carts
    } catch (error) {
        res.status(500).json({error})
    }
    
});
// Ruta para obtener un carrito por su ID
router.get('/:id', async (req, res) => {
    const cartId = req.params.id
    try {
        //const cart = await cartManager.getCartById(+cartId);
        const cart = await cartsMongo.PopulatedCartById(cartId)
        res.json(cart.products)
        res.status(200).json({message:"cart founded", cart})
    } catch (err) {
        res.status(500).json({message:"cart not founded"})
    }
});
//ruta para borrar carrito

router.delete('/:id', async (req,res)=>{
    const cartId = req.params.id
    try {
        const response= await cartsMongo.deleteOne(cartId)
        res.status(200).json({message: "cart deleted"})
    } catch (error) {
        res.status(500).json({message: "id not founded"})
    }
})
// Ruta para agregar un producto a un carrito, todo por body

router.put('/', async (req,res)=>{
    try {
        const {cartId, productId, quantity} = req.body
        if (!cartId || !productId || isNaN(quantity)) {
            return res.status(400).json({ message: "Invalid input" });}
            const response = await cartsMongo.addProductToCart(cartId, productId, quantity);
            res.status(200).json({ message: "Cart updated", cart: response });
        } catch (error) {
            res.status(500).json({ message: "Can't update cart", error: error.message });
        }
})

//ruta para deletear un producto de un carrito determinado 

router.delete('/:cartId/products/:productId', async(req,res)=>{
    
    try {
        const{cartId,productId}=req.params
        const result = await cartsMongo.deleteProductFromCart(cartId,productId);
        res.status(200).json({message:"product deleted"});
    } catch (error) {
        res.status(500).json({error})
    }
})



export default router;
