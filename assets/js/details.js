const { createApp } = Vue

createApp({
    data(){
         return{
              
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {
                this.arrayEventos = data.events
                const id = new URLSearchParams(location.search).get("id");
                console.log(id);
                this.eventosFiltro = this.arrayEventos.find(evento => evento._id == id)
                console.log(this.eventosFiltro)
         })
         .catch(error => console.log(error))
    },
    methods:{},
    computed:{},
    
}).mount("#app")

/*    
function mostrarCard(eventObjet) {

    const container = document.getElementById('detailsCard')
    let nuevoDiv = document.createElement('div')
    nuevoDiv.className = "card mt-3 mb-3"
    nuevoDiv.style.width ="18rem"
    nuevoDiv.innerHTML = `<img src="${eventosFiltro.image}" class="card-img-top" style="height: 150px" alt="Race">
        <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="card-title">${eventosFiltro.name}</h3>
        <p class="card-text">Category: ${eventosFiltro.category}</p>
        <p class="card-text">Date: ${eventosFiltro.date}</p>
        <p class="card-text">${eventosFiltro.description}</p>
        <p class="card-text">Place: ${eventosFiltro.place}</p>
        <p class="card-text">Capacity: ${eventosFiltro.capacity}</p>
        <p class="card-text">Assistance: : ${eventosFiltro.assistance ? eventosFiltro.assistance : eventosFiltro.estimate}</p>
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
   */

