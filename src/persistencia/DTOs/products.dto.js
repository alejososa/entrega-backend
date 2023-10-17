export default class ProductDto{
    constructor(product){

        this.title= product.product_title;   
        this.description= product.product_description;
        this.price= product.product_price;
        this.code= product.product_code;
        this.stock= product.product_sotck;
        this.category= product.product_category;
        this.thumbnail= product.product_thumbnail
    }
}