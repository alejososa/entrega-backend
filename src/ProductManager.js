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
        const { title, description, price, thumbnail, code, stock, category,} = product;
        try {
            const products = await this.getProducts();

            // id generator
            let id = products[products.length - 1]?.id + 1 || 1;
            
            //confirmacion de los campos
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                
                    return {error:"Complete all fields"};
                
            }

            //uso de codigo único
            if (products.find((product) => product.code === code)) {
                //console.log("The product code is already in use");
                return {error:"The product code is already in use"};
                
            }
            const newproduct = { id, title, description, price, thumbnail, code, stock,category, status:true };
            products.push(newproduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return newproduct;
        } catch (error) {
            return {error:"error al agregar el nuevo producto"};
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

export default productManager;


