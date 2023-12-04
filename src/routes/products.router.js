import { Router } from "express";
import { ProductManagerMongo } from "../persistencia/DAOs/managers/products/productManagerMongo.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import logger from "../winston.js";

const productRouter = Router();
const PM = new ProductManagerMongo();



// Crear productos
productRouter.post("/", isAdmin, (req, res) => {
    const { title, description, price, stock, thumbnail, code, category, status } = req.body;
    const product = {
        title,
        description,
        price,
        stock: stock,
        thumbnail,
        code,
        category,
        status: true,
    };
    const newProduct = PM.addProduct(product);
    if (newProduct) {
        logger.info("Product created");
        res.status(300).json(newProduct)
    } else {
        logger.error("Product cant be created");
    }
});

// Buscar todos los productos
productRouter.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort } = req.query;
        let queryOptions = {};
        if (query) {
            queryOptions = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } },
                ],
            };
        }
        const sortOptions = {};
        if (sort === 'asc') {
            sortOptions.price = 1; // Orden ascendente por precio
        } else if (sort === 'desc') {
            sortOptions.price = -1; // Orden descendente por precio
        }
        const productsPaginated = await PM.getProducts(queryOptions, sortOptions, limit, page);
        const response = {
            status: 'success',
            payload: productsPaginated.docs,
            totalPages: productsPaginated.totalPages,
            prevPage: productsPaginated.hasPrevPage ? productsPaginated.prevPage : null,
            nextPage: productsPaginated.hasNextPage ? productsPaginated.nextPage : null,
            page: productsPaginated.page,
            hasPrevPage: productsPaginated.hasPrevPage,
            hasNextPage: productsPaginated.hasNextPage,
            prevLink: productsPaginated.hasPrevPage ? `/api/products?limit=${limit}&page=${productsPaginated.prevPage}&query=${query}&sort=${sort}` : null,
            nextLink: productsPaginated.hasNextPage ? `/api/products?limit=${limit}&page=${productsPaginated.nextPage}&query=${query}&sort=${sort}` : null,
        };
        res.json(response);
    } catch (error) {
        logger.error("Cant get acces to products list");
        return res.status(500).send({ status: "error", message: "Cant get acces to products list" });
    }
});

// Buscar producto por ID
productRouter.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await PM.getProductById(productId)
        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        logger.error("Product not foun");
    }
});

// Actualizar producto por ID
productRouter.put("/:pid", isAdmin, async (req, res) => {
    const productId = req.params.pid;
    const updatedProducts = req.body;
    await PM.updateProduct(productId, updatedProducts);
    logger.info("Product actualized");
    return res.status(500).send({ status: "success", message: "Product actualized" });
});

// Eliminar un producto por ID
productRouter.delete("/:pid", isAdmin, async (req, res) => {
    const productId = req.params.pid;
    await PM.deleteProduct(productId);
    logger.info("Product deleted");
    return res.status(500).send({ status: "success", message: "Product deleted" });
})

export default productRouter;