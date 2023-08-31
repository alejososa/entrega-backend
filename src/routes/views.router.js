import { Router } from "express";
//import productManager from "../managers/products/ProductManager.js";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { productsModels } from "../db/models/products.model.js";

const router = Router()


//listado de productos renderizados desde "home"
router.get('/', async (req, res) => {
    const products = await productsMongo.findAllViews();
    res.render('home', { products });

});

router.get('/realTimeProducts', async (req, res) => {
    try {
        const products = await productsMongo.findAllViews();
        res.render('realTimeProducts', { products })

    } catch (error) {
        res.status(500).json({ error: 'Cant obtain products list' });
    }
});



export default router;