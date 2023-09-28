

const form = document.getElementById("login_form");

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    console.log(data);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })



   // const responseData = await response.json();
   // console.log(responseData);



    if (response.status === 200) {
        window.location.replace('http://localhost:8080/api/views/profile')
    }
    console.log("estamos aca");
});
