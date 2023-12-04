

const form = document.getElementById("login_form");

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    console.log(data);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    //cambio estas lineas para indicar donde hacer el fetch

    
    fetch('/api/session/login',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace('http://localhost:8080/api/views/profile');
        }
    })
})
