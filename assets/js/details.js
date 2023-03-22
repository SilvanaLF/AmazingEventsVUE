
const traerDatos = async () => {
    try{
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        console.log(response)
        let data = await response.json()
        console.log([data])
        let events = data.events
        console.log(events)

        const id = new URLSearchParams(location.search).get("id");
        console.log(id);
        const eventObjet = data.events.find(elemento => elemento._id == id);
        console.log(eventObjet);
        mostrarCard(eventObjet)



    }catch(error) {
        console.error('Error al traer datos')
    }
}
    traerDatos()

    
function mostrarCard(eventObjet) {

    const container = document.getElementById('detailsCard')
    let nuevoDiv = document.createElement('div')
    nuevoDiv.className = "card mt-3 mb-3"
    nuevoDiv.style.width ="18rem"
    nuevoDiv.innerHTML = `<img src="${eventObjet.image}" class="card-img-top" style="height: 150px" alt="Race">
        <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="card-title">${eventObjet.name}</h3>
        <p class="card-text">Category: ${eventObjet.category}</p>
        <p class="card-text">Date: ${eventObjet.date}</p>
        <p class="card-text">${eventObjet.description}</p>
        <p class="card-text">Place: ${eventObjet.place}</p>
        <p class="card-text">Capacity: ${eventObjet.capacity}</p>
        <p class="card-text">Assistance: : ${eventObjet.assistance ? eventObjet.assistance : eventObjet.estimate}</p>
        </div>`
        container.appendChild(nuevoDiv)
    let botonInicio = document.createElement('button')
    botonInicio.className = "btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
    botonInicio.style = "color: #e0046c; background-color: #e9ecef"
    botonInicio.textContent = "Back to Home"
    botonInicio.addEventListener('click', () => {
    window.location.href = "./index.html"
    })
        nuevoDiv.appendChild(botonInicio)

    }
    //mostrarCard(eventObjet)

