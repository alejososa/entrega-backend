const socketClient = io();

socketClient.on('connect', () => {
    console.log("connected to websocket server");
});

socketClient.on('addProduct', (newProduct) => {

    const productList = document.getElementById("productList");

    const newProductItem = document.createElement("li");


    newProductItem.innerHTML = `
    Title: ${newProduct.title} <div></div>
    Price: $ ${newProduct.price} <div></div>
    Description: ${newProduct.description} <div></div>
    Code: ${newProduct.code} <div></div>
    ID NRO: ${newProduct.id}
    `;


    productList.appendChild(newProductItem);
});


document.getElementById('newProductForm').addEventListener('submit', (event) => {
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

