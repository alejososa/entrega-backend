import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CARTS_FILE_PATH = path.join(__dirname, "cart.json");

class CartManager {
    constructor() {
        if (!fs.existsSync(CARTS_FILE_PATH)) {
            fs.writeFileSync(CARTS_FILE_PATH, "[]", "utf8");
        }
    }

    // Resto de los métodos del CartManager...
    async createCart() {
        try {

            const data = await fs.promises.readFile(CARTS_FILE_PATH, "utf8");
            const carts = JSON.parse(data);

            //el generador de id de siempre
            const newCartId = carts[carts.length - 1]?.id + 1 || 1;


            const newCart = {
                id: newCartId,
                products: [],
            };

            // Agregar el nuevo carrito 
            carts.push(newCart);

            // Guardar los cambios 
            await fs.promises.writeFile(
                CARTS_FILE_PATH,
                JSON.stringify(carts, null, 2),
                "utf8"
            );

            console.log("Cart created id:", newCartId);

            return newCartId;
        } catch (err) {
            console.error("Error:", err);
            return null;
        }
    }

    async getCartById(cartId) {
        try {
            // traigo y leo el json
            const data = await fs.promises.readFile(CARTS_FILE_PATH, "utf8");
            const carts = JSON.parse(data);

            // busco el id
            const cart = carts.find((cart) => cart.id === cartId);

            if (!cart) {
                console.log("Cart id does not match:", cartId);
                return null;
            }

            return cart;
        } catch (err) {
            console.error("Error:", err);
            throw err;
        }
    }



    async addProductToCart(cartId, productId, quantity) {
        try {
            // arranco igual
            const data = await fs.promises.readFile(CARTS_FILE_PATH, "utf8");
            const carts = JSON.parse(data);



            const cartIndex = carts.findIndex((cart) => cart.id === cartId);
            if (cartIndex === -1) {
                console.error("Cart id does not exist:", cartId);
                return;
            }

            //verifico que este
            const existingProductIndex = carts[cartIndex].products.findIndex(
                (product) => product.productId === productId
            );
            if (existingProductIndex !== -1) {

                carts[cartIndex].products[existingProductIndex].quantity += quantity;
            } else {

                carts[cartIndex].products.push({ productId, quantity });
            }

            await fs.promises.writeFile(
                CARTS_FILE_PATH,
                JSON.stringify(carts, null, 2),
                "utf8"
            );
            console.log("Product corrrectly added.");
        } catch (err) {
            console.error("Error:", err);
        }
    }
}


const cartManager = new CartManager();
export default cartManager;


