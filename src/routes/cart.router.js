import { Router } from "express";
import { CartManagerMongo } from "../persistencia/DAOs/managers/carts/cartManagerMongo.js";
import { isUser } from "../middlewares/auth.middleware.js";
import logger from "../winston.js";

const cartRouter = Router();
const CM = new CartManagerMongo();



// Crear carrito
cartRouter.post("/", (req, res) => {
    const newCart = CM.createCarts();
    logger.info("Cart created");
    res.status(400).json(newCart);
});

// Agregar productos al carrito
cartRouter.post("/:cid/product/:pid", isUser, async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    if (!quantity || isNaN(quantity)) {
        logger.error("Not possible");
        return res.status(404).send({status: "error", message: "Not possible"});
    };
    const cart = CM.addProductsInCart(cid, pid, quantity);
    if (!cart) {
        logger.error("Not possible");
        return res.status(404).send({status: "error", message: "Not possible"});
    };
    res.json(cart);
});

// Actualizar productos
cartRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body.products;
    try {
        const cart = await CM.updateProductsInCart(cid, products);
        res.json(cart);
    } catch (error) {
        logger.error("Cant actualize cart");
        res.status(404).json({status: "error", message: "Cant actualize cart"});
    }
});

// Eliminar producto 
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const cart = await CM.deleteProductsInCart(cid, pid);
        if (!cart) {
            logger.error("Cant find cart");
            return res.status(404).send({status: "error", message: "Cant find cart"});
        }
        res.json(cart);
    } catch (error) {
        logger.error("Cant eliminate product");
        return res.status(404).send({status: "error", message: "Cant eliminate product"});
    };
});

//  Purchase
cartRouter.post("/:cid/purchase", async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cartsService.getCartsById(cid);
        if (!cart) {
            return res.status(300).json({error: "Cant dinf cart"});
        }
        for (const productsOnCart of cart.products) {
            const product = await productsService.getProductsById(productsOnCart.product);
            if (!product) {
                return res.status(404).json({error: "product not found"});
            }
            if (productsOnCart.quantity > product.stock) {
                return res.status(400).json({error: "Not enough stock for this product"});
            }
            product.stock -= productsOnCart.quantity;
            await product.save();
        }
        await cartsService.totalQuantityInCart(cart);
        // Ticket
        const ticketCompra = {
            code: await generateUniqueCode(),
            purchase_datetime: new Date(),
            amount: cart.totalAmount,
            purchaser: "purchaser"
        };
        const ticket = await ticketService.createTickets(ticketCompra);
        await cartsService.clearCart(cid);
        res.status(200).json({message: "Purchase complete", ticket});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default cartRouter;