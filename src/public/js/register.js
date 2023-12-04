

// le pido que busque un  documento que tenga ese id( el cual yo ya puse en el form)
const form = document.getElementById("register_form");


//necdesito todo esto para la comunicaion del back y el front
form.addEventListener('submit', event=>{
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/session/register',{
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>result.json()).then(json =>console.log(json))
        window.location.replace('http://localhost:8080/api/views/login');
    
})




//window.location.replace('http://localhost:8080/api/views/login');