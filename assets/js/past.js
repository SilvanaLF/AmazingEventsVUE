const { createApp } = Vue

createApp({
    data(){
         return{
              arrayEventos: [],
              nombreIngresado: '',
              eventosFiltro: [],
              arrayCategorias: [],
              dupCats: [],
              fechaActual: '',
              checked: []
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {
              this.fechaActual = Date.parse(data.currentDate)
              this.arrayEventos = data.events.filter(el => Date.parse(el.date) < this.fechaActual)
              this.eventosFiltro = this.arrayEventos
              this.crearChecks(this.arrayEventos)

         })
         .catch(error => console.log(error))
    },
    methods:{
     crearChecks(array){
          let categorias=[]
          let dupCats = []
          for (categoria of array){
              categorias.push(categoria.category);
          }
          dupCats = categorias.filter((cat, indice) => {
              return categorias.indexOf(cat) === indice;
          })
          this.dupCats = dupCats
      },
     filtro (){
          this.eventosFiltro = this.arrayEventos.filter( evento => {
           return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.nombreIngresado.toLowerCase())
          })
      }
    },
    computed:{}
}).mount("#app")