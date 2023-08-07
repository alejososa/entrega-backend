const socketClient = io();

const productData = document.getElementById("productData");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const formDelete = document.getElementById("deleteProduct");
const id = document.getElementById("id");

socketClient.on('connect', () => {
    console.log("connected to websocket server");
});

socketClient.on("addProduct", (newProduct) => {

    const products = document.createElement("li");
    products.textContent = `${newProduct.title}/ ${newProduct.price} / ${newProduct.description}`;
    
})

productData.onsubmit = (data) => {
    data.preventDefault();

};

