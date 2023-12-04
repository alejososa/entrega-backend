import {Router} from "express";
import { ProductManagerMongo } from "../persistencia/DAOs/managers/products/productManagerMongo.js";

const pm = new ProductManagerMongo();
const viewRouter = Router()

// Vista Home 
viewRouter.get("/", async (req, res) => {
    try {
        const products = await pm.getProducts();
        res.render("products", {products})
    } catch (error) {
        res.status(500).json({error: "Cant show product list"});
    }
});

// Vista Products (/api/views/products)
viewRouter.get("/products", async (req, res) => {
    try {
        const products = await pm.getProducts();
        res.render("products", {products, user: req.session.passport.user});
    } catch (error) {
        res.status(500).json({error: "Cant show products list"});
    }
});

// Vista RealTimeProducts (/api/views/realtimeproducts)
viewRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await pm.getProducts();
        res.render("realTimeProducts", {products});
    } catch (error) {
        res.status(500).json({error: "Cant get products list"});
    }
});

// Login, Register y Profile
const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect("/profile");
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
};

viewRouter.get("/register", publicAccess, (req, res) => {
    res.render("register")
});

viewRouter.get("/login", publicAccess, (req, res) => {
    res.render("login")
});

viewRouter.get("/profile", privateAccess, (req, res) => {
    res.render("profile", {
        user: req.session.user,
    })
});

// Email
viewRouter.get("/email", (req, res) => {
    res.render("Mail");
});

export default viewRouter;