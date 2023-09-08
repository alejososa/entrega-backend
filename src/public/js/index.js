const socketClient = io();

socketClient.on('connect', () => {
    console.log("connected to websocket server");
});

socketClient.on('addProduct', (newProduct) => {

    const productList = document.getElementById("productList");
    const newItem = document.createElement("li");


    newItem.innerHTML =

        `
        Title: ${newProduct.title} <div></div>
        Price: ${newProduct.price} <div></div>
        Description: ${newProduct.description} <div></div>
        Stock : ${newProduct.stock} <div></div>
        Thumbnail: ${newProduct.thumbnail} <div></div>
        Code: ${newProduct.code} <div></div>
        Category : ${newProduct.category} <div></div>
        Id : ${newProduct.id}
        `;
    console.log(newProduct);
    productList.appendChild(newItem);
});


document.getElementById('addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newProduct = {};
    formData.forEach((value, key) => {
        newProduct[key] = value;
    });
    socketClient.emit('addProduct', newProduct);
    form.reset();
});

document.getElementById('deleteProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
        const formData = new FormData(form);
    const productId = formData.get('productId');
    socketClient.emit('deleteProduct', productId);
    form.reset();
});

socketClient.on('productDeleted', (productId) => {
    const productList = document.getElementById('productList');
    const productItem = productList.querySelector(`li[data-product-id="${productId}"]`);
    if (productItem) {
        productList.removeChild(productItem);
    }
});