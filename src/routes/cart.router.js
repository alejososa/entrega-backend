import { Router } from "express"
import cartManager from "../CartManager.js";



const router = Router();



// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
    const newCartId = cartManager.createCart();
    if (newCartId !== null) {
        res.status(201).json({ id: newCartId });
    } else {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

// Ruta para obtener un carrito por su ID
router.get('/:cartId', async (req, res) => {
    const {cartId} = req.params
    try {
        const cart = await cartManager.getCartById(+cartId);

        if (cart !== null) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Cart not founded' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Cant obtain cart' });
    }
});

// Ruta para agregar un producto a un carrito
router.post('/:cartId/products/:productId', (req, res) => {
    const {cartId, productId} = req.params;
    
    const {quantity} = req.body; 

    
    cartManager.addProductToCart(+cartId, +productId, +quantity);

    res.status(200).json({ message: 'Product added.' });
});








export default router;
