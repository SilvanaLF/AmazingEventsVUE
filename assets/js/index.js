const traerDatos = async () => {
    try{
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        //console.log(response)
        let data = await response.json()
        //console.log(data)
        let events = data.events
        //console.log(events)
        check_category.appendChild(checkbox(data.events))
        cardCreate(data.events)
        
        //Check evento
        let inputValues = []
        let textSearch = ""

        const checkboxes = document.querySelectorAll('input[type=checkbox]')

        checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', mostrarSeleccion)
        })

        function mostrarSeleccion(eventos){
        inputValues = Array.from(checkboxes).filter(check => check.checked).map(input => input.value)
        allFilter(data.events)

        }
 
 
        function arrayFilter(checkArray, events){
        if(checkArray == 0){
        return events
        }else{
        const eventosFiltrados = events.filter(objeto => checkArray.includes(objeto.category.split(' ').join('_')))
        return eventosFiltrados
        }
        }
// Search

        function filterSearch(string, events){
        if(string == ""){
        return events
        }else{         
        let nuevoArray = events.filter(element => element.name.toLowerCase().includes(textSearch.toLowerCase().trim()))
        return nuevoArray
        }
        }

        // Search Evento
        const inputForm = document.getElementById('inputForm');
        inputForm.addEventListener('keyup', (e) => {
        textSearch = inputForm.value
        allFilter(data.events)
        })

        // Filtros Cruzados

        function allFilter(){
            const eventosChequeados = arrayFilter(inputValues, data.events)
            const eventosBuscados = filterSearch(textSearch, eventosChequeados)
            cardCreate(eventosBuscados)
        }



    }catch(error) {
        console.error('Error al traer datos')
    }
}
traerDatos()

//VUE

const {createApp} = Vue 
//console.log(Vue)

createApp({
data(){
    return{
        mensaje:"Amazing Events",
        arrayOriginal : []
    }
},
created(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        this.arrayOriginal = data
        console.log(this.arrayOriginal)
    })
    
}




})

// CARDS

function cardCreate(eventos){
    
    const container = document.getElementById('card_index')
    container.innerHTML=''
    if(eventos.length > 0){
    let fragment = document.createDocumentFragment()

    for(let element of eventos){
        let div = document.createElement('div')
        div.classList.add("card")
        div.style.width = "18rem"
        div.innerHTML = `<img src="${element.image}" class="card-img-top" style="height: 150px" alt="Race">
        <div class="card-body d-flex flex-column justify-content-between">
        <h3 class="card-title">${element.name}</h3>
        <p class="card-text">${element.description}</p>
        <p>Price: ${element.price} $</p>
        <a href="./details.html?id=${element._id}" class="btn btn-dark nav-item p-2 me-1 ms-1 mb-1"
            style="color: #e0046c; background-color: #e9ecef">Detail</a>
        </div>`
        fragment.appendChild(div)
        }
        container.appendChild(fragment)
    }else{
        let div = document.createElement('div')
        div.innerHTML = `<p class="card-text">There are no events to show</p>`
        container.appendChild(div)
    }
}

//cardCreate(data.events)

//CHECKBOX

const check_category = document.getElementById('cat-check')

function checkbox(events) {

    const arrayCategoria = events.map(event => event.category)
    const theCategory = [...new Set(arrayCategoria)]


let fragmentCheck = document.createDocumentFragment()

 for(let cat of theCategory){
     let div = document.createElement('div')
     div.className="form-check form-check-inline"
     div.style.color="#e0046c"
     div.innerHTML = `<input class="form-check-input" type="checkbox" id=${cat.split(' ').join('_')} value=${cat.split(' ').join('_')}>
     <label class="form-check-label" style="color: #e0046c" for=${cat.split(' ').join('_')}>${cat}</label>`
         fragmentCheck.appendChild(div)
 }
 return fragmentCheck
 }

//check_category.appendChild(checkbox(data.events))

//EVENTOS CHECKBOX

/*
let textSearch = ""
let inputValues = []
const checkboxes = document.querySelectorAll('input[type=checkbox]')

 checkboxes.forEach(checkbox => {
     checkbox.addEventListener('change', mostrarSeleccion)
 })

 function mostrarSeleccion(eventos){
    inputValues = Array.from(checkboxes).filter(check => check.checked).map(input => input.value)
    allFilter(data.events)

 }
 
 
 function arrayFilter(checkArray, events){
    if(checkArray == 0){
        return events
    }else{
    const eventosFiltrados = events.filter(objeto => checkArray.includes(objeto.category.split(' ').join('_')))
        return eventosFiltrados
    }
 }*/


//SEARCH

 /*function filterSearch(string, events){
         if(string == ""){
            return events
         }else{         
         let nuevoArray = events.filter(element => element.name.toLowerCase().includes(textSearch.toLowerCase().trim()))
         return nuevoArray
        }
 }*/

 /*const inputForm = document.getElementById('inputForm');
 inputForm.addEventListener('keyup', (e) => {
     textSearch = inputForm.value
     allFilter(data.events)
 })*/

 //FILTROS CRUZADOS

  /*function allFilter(){
      const eventosChequeados = arrayFilter(inputValues, data.events)
      const eventosBuscados = filterSearch(textSearch, eventosChequeados)
      cardCreate(eventosBuscados)
  }*/














 





