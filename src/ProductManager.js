import fs from 'fs';
const FILE_NAME = "products.json";

class ProductManager {
    constructor(path) {
        this.path = path;
    }


    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } else {
                fs.writeFileSync(FILE_NAME, '[]', 'utf-8');
            }
        } catch (error) {
            return error;
        }//
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock, category, status } = product;
        try {
            const products = await this.getProducts();

            // id generator
            let id = products[products.length - 1]?.id + 1 || 1;
            let status = true;
            //confirmacion de los campos
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                
                    return "Complete all fields";
                
            }

            //uso de codigo único
            if (products.find((product) => product.code === code)) {
                //console.log("The product code is already in use");
                return "The product code is already in use";
                
            }

            const product = { id, title, description, price, thumbnail, code, stock,category, status:true };
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find((product) => product.id === id);
            if (!product) {
                return undefined;
            }
            console.log(product);
            return product;
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) {
                return undefined;
            }
            const product = products[index];
            products[index] = { ...product, ...obj };
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return products[index];
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filteredProducts = products.filter((product) => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
        } catch (error) {
            return error;
        }
    }
}

const productManager = new ProductManager(FILE_NAME);
async function test() {
    
    // agrega el product con su nuevo id autoincrementable

//    await productManager.addProduct({
//        title: "coca",
 //       description:"gaseosa",
 //       price: 750,
 //       thumbnail: "no foto",
 //       code: "01",
 //       stock: 500,
 //       category:"bebida"
 //   });

    //trae la lista de todos los products del archivo .json
    //const products = await productManager.getProducts();
    //console.log(products);

    // trae el product con el id específico que se encuentra en el .json
    //const productId = 15;
    //const product = await manager.getProductById(productId);
    //if (product) {
    //    console.log(product);
    //} else {
    //    console.log(`The product id: ${productId} does not exist`);
    //}

    //borra un producto específico por su id
    //await productManager.deleteProduct(4);

    //actualiza un product ya sea completo o una propiedad escpecífica sin alterar su id
    //objeto a usar para el update
    // const productId = 1;
    // const product = await productManager.updateProduct(productId, {
    //   title: "manaos",
    //   stock: 16,
    // });
    // if (!product) {
    //   console.log(`The product id: ${productId} does not exist`);
    // }
}
export default productManager;
test();

