

// le pido que busque un  documento que tenga ese id( el cual yo ya puse en el form)
const form = document.getElementById("register_form");


//necdesito todo esto para la comunicaion del back y el front
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    const response = await fetch("/api/sessions/register", {
        method: 'POST',
        body: JSON.stringify(obj),
        //fundamental meter el headers, para aclarar que tipo de dato estoy recibiendo
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseData = await response.json();
    console.log(responseData);
    //y ahora redirecciono a login en caso de que se registre bien
    if (responseData.status === "success") {
        window.location.replace('http://localhost:8080/api/views/login');
    }
    console.log("llegamos aca");


});

