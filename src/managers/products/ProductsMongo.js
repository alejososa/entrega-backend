import { productsModels } from '../../db/models/products.model.js'

class ProductsMongo {
    async findAllViews() {
        try {
            const products = await productsModels.find()          
            return products
        } catch (error) {
            return error
        }
    }
    ////////// nuevo findAll con paginate////////

    async findAll(obj) {
        try {
            const { limit = 3, page = 1, sortProduct_price, ...query } = obj
            console.log(query);
            const products = await productsModels.paginate(query, { limit, page, sort: { product_price: sortProduct_price } })

            const info = {
                status: rest ? "succes" : "error",
                payload: products.docs,
                totalPages: products.totalPages,
                prePage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                nextPageLink: `http://localhost:8080/api/products?page=${products.nextPage}`,
                prevPageLink: `http://localhost:8080/api/products?page=${products.prevPage}`,


            }
            return info
        } catch (error) {
            return error
        }
    }


    async createOne(obj) {
        try {
            const newProduct = await productsModels.create(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }

    async findById(id) {
        try {
            const product = await productsModels.findById(id)
            return product
        } catch (error) {
            return error
        }
    }

    async updateOne(id, obj) {
        try {
            const response = await productsModels.findByIdAndUpdate({ _id: id }, { ...obj })
            return response
        } catch (error) {
            return error
        }
    }

    async deleteOne(id) {
        try {
            const response = await productsModels.findByIdAndDelete(id)
            return response
        } catch (error) {
            return "id not founded"
        }
    }

    async aggregationMet() {
        try {
            const response = await productsModels.aggregate([
                { $match: { product_code: { $lt: 400 } } },
                {
                    $group: {
                        _id: '$product_description',
                        product_count: { $count: {} },
                        promedio_precio: { $avg: '$product_price' },
                    }
                },
                { $sort: { product_count: 1 } }
                //{$count:"products less than 400"}
            ])


            return response
        } catch (error) {
            return error
        }
    }
}

export const productsMongo = new ProductsMongo()