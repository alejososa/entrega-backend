import { Router } from "express";
import productManager from "../ProductManager.js";

const router= Router()


//listado de productos renderizados desde "home"
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', {products});
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products})
});

export default router;