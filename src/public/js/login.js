// le pido que busque un  documento que tenga ese id( el cual yo ya puse en el form)
const form = document.getElementById("login_form");


//necdesito todo esto para la comunicaion del back y el front
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    const response = await fetch("/api/sessions/login", {
        method: 'POST',
        body: JSON.stringify(obj),
        //fundamental meter el headers, para aclarar que tipo de dato estoy recibiendo
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status === "success") {
        window.location.replace('http://localhost:8080/api/views/products');
    }
});