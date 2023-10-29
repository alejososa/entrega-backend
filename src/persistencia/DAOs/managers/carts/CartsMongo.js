import { cartsModels } from '../../../db/models/carts.models.js';

class CartsMongo {
    //crear carrito con nombre y arrays de productos vacio
    async createOne(obj) {

        try {
            const newCart = await cartsModels.create(obj)
            return newCart
        } catch (error) {
            return error
        }
    }
    //buscar todos los carritos
    async findAll() {
        try {
            const carts = await cartsModels.find({})

            return carts
        } catch (error) {
            return error
        }
    }


    //buscar carrrito por id
    async findById(id) {
        try {
            const cart = await cartsModels.findById(id)
            return cart

        } catch (error) {
            return error
        }
    }

    async PopulatedCartById(_id) {
        try {
            const cart = await cartsModels.findById(_id).populate('cart_products.product');
            if (cart) {
                return cart;
            } else {
                throw new Error('Carrito no encontrado');
            }
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }
    //sumar producto al cart
    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.findById(cartId);

        const existingProductIndex = cart.cart_products.findIndex((p) => p.product_id === productId);

        if (existingProductIndex !== -1) {
            cart.cart_products[existingProductIndex].quantity += quantity || 1;
        } else {
            cart.cart_products.push({ product_id: productId, quantity: quantity || 1 });
        }

        try {
            await cart.save(); // Guarda los cambios en la base de datos
            console.log(`Cart Updated ${cartId}`);
            return cart;
        } catch (error) {
            throw new Error('Can\'t update cart: ' + error.message);
        }
    }
    //delete one cart by id    
    async deleteOne(id) {
        try {
            const response = await cartsModels.findByIdAndDelete(id)
            return response
        } catch (error) {
            return "id not founded"
        }
    }
    //deletea un producto del cart seleccionado  
    async deleteProductFromCart(cartId, productId) {
        const cart = await this.findById(cartId);
        const existingProductIndex = cart.cart_products.findIndex((p) => p.product_id === productId);
        if (existingProductIndex) {
            cart.cart_products.pull({ product_id: productId })

        } else {
            throw new error("this cart does not hace that product")
        }
        try {
            await cart.save();
            console.log(`Product ${productId} from cart ${cartId}, was deleted`);
        } catch (error) {
            return error
        }

        // try {
        //     const cart = await cartsModels.findById(cartId)
        //     if(!cart) throw new error ("Cart doens exist")
        //     const response= await cartsModels.updateOne({_id:cartId},{$pull:{cart_products:productId}})
        //     return response

        // } catch (error) {
        //     return error
        // }
    }

    async clearCart(cid) {
        const cart = await this.getCartsById(cid);
        cart.products = [];
        await this.saveCarts(cart);
        return cart;
    };
}

export const cartsMongo = new CartsMongo()