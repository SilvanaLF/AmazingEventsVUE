const { createApp } = Vue

createApp({
    data(){
         return{
          arrayEventos: [],
          nombreIngresado: '',
          eventosFiltro: {},
          arrayCategorias: [],
          dupCats: [],
          checked: [],    
         }
    },
    created(){

         fetch("https://mindhub-xj03.onrender.com/api/amazing")
         .then(response => response.json())
         .then(data => {
                this.arrayEventos = data.events;
                const queryString = location.search
                const params = new URLSearchParams(queryString)
                this.id = params.get("id")
                this.eventosFiltro = this.arrayEventos.find(evento => evento._id == this.id);
                console.log(this.eventosFiltro);

                
        
         })
         .catch(error => console.log(error))
    },
    methods:{},
    computed:{},
    
}).mount("#app")

