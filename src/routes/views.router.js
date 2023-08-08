import { Router } from "express";
import productManager from "../ProductManager.js";

const router = Router()


//listado de productos renderizados desde "home"
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

router.get('/realTimeProducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products })

    } catch (error) {
        res.status(500).json({ error: 'Cant obtain products list' });
    }
});



export default router;