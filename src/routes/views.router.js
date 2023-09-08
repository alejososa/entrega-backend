import { Router } from "express";
//import productManager from "../managers/products/ProductManager.js";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { productsModels } from "../db/models/products.model.js";
import { cartsMongo } from "../managers/carts/CartsMongo.js";

const router = Router();

//listado de productos renderizados desde "home"
router.get("/", async (req, res) => {
  try {
    const response = await productsMongo.findAll(req.query);
    res.render("home", response );
  } catch (error) {
    res.status(500).json({ error: "Cant obtain product list" });
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

router.get("/carts/:id", async(req,res)=>{
  const cartId=req.params.id
  try {
    const response = await cartsMongo.findById(cartId)
    console.log(response);
    res.render("carts", response)
  } catch (error) {
    res.status(500).json({ error: "Cant obtain carts list" });
    
  }
})

//rutas para la session

router.get("/register", (req,res)=>{
  res.render('register');
})

router.get('/login', (req,res)=>{
  res.render("login");
})

router.get('/profile',(req,res)=>{
  res.render('profile',{
      user:req.sessions.user
  })
  })


export default router;
