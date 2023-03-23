//VUE

const { createApp } = Vue

createApp({
    data(){
         return{
              arrayEventos: [],
              nombreIngresado: '',
              eventosFiltro: [],
              arrayCategorias: [],
              dupCats: [],
              checked: []
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {    
              this.arrayEventos = data.events
              this.crearChecks(this.arrayEventos)
              this.eventosFiltro = this.arrayEventos
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
          this.filtro()
      },

     filtro (){
          this.eventosFiltro = this.arrayEventos.filter( evento => {
           return (this.checked.includes(evento.category) || this.checked.length === 0) && evento.name.toLowerCase().includes(this.nombreIngresado.toLowerCase())
          })
      }
    },
    computed:{},
    
}).mount("#app")















 





