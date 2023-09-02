import { Router } from "express";
//import productManager from "../managers/products/ProductManager.js";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { productsModels } from "../db/models/products.model.js";

const router = Router();

//listado de productos renderizados desde "home"
router.get("/", async (req, res) => {
  try {
    const products = await productsMongo.findAll({
      sortProduct_price: "ASC",
      limit: 5,
      page: 1,
    });
    res.render("home", { products });
  } catch (error) {
    return error;
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await productsMongo.findAllViews();
    //const productsJSON = JSON.stringify(products);
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: "Cant obtain products list" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const response = await productsMongo.findAll(req.query);
    console.log(response)
    res.render("products", response);
  } catch (error) {
    res.status(500).json({ error: "Cant obtain products list" });
  }
});

export default router;
