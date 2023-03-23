const { createApp } = Vue
createApp({
  data() {
    return {
      datos: {},
      dataEvents: [],
      upcoming: [],
      past: [],
      tableUp: [],
      tablePast: [],
      statistics: []
    }
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then(response => response.json())
      .then(datos => {
        this.datos = datos
        this.dataEvents = datos.events
        this.upcoming = datos.events.filter(event => new Date(event.date) > new Date(this.datos.currentDate))
        this.past = datos.events.filter(event => new Date(event.date) < new Date(this.datos.currentDate))
        this.statistics = this.tablaA(this.dataEvents)
        this.tablasPorCategoria(this.upcoming, this.tableUp)
        this.tablasPorCategoria(this.past, this.tablePast)


      })
      .catch(error => console.log(error))

  },
  methods: {

    tablaA(eventos) {
      let moreAssistance = eventos.filter(event => event.assistance).reduce((evento1, evento2) =>
        (evento1.assistance / evento1.capacity) > (evento2.assistance / evento2.capacity) ? evento1 : evento2
      )
      let lessAssistance = eventos.filter(event => event.assistance).reduce((evento1, evento2) =>
        (evento1.assistance / evento1.capacity) < (evento2.assistance / evento2.capacity) ? evento1 : evento2
      )
      let capacity = eventos.reduce((evento1, evento2) =>
        evento1.capacity > evento2.capacity ? evento1 : evento2
      )
      return [moreAssistance, lessAssistance, capacity]
    },
    revenue(eventos) {
      return eventos.reduce((total, event) => {
        event.assistance == undefined ? total += (event.estimate * event.price) : total += (event.assistance * event.price)
        return total
      }, 0)
    },
    porcentaje(eventos) {
      return (eventos.reduce((total, event) => {
        event.assistance == undefined ? total += (event.estimate / event.capacity) : total += (event.assistance / event.capacity)
        return total
      }, 0) * 100 / eventos.length).toFixed(2)
    },
    tablasPorCategoria(eventos, table) {
      let categorias = [...new Set(eventos.map(evento => evento.category))]
      categorias.forEach(category => {
        let objet = {}
        objet.category = category
        let eventsByCategory = eventos.filter(event => event.category == category)
        objet.revenue = this.revenue(eventsByCategory)

        objet.porcentaje = this.porcentaje(eventsByCategory)

        table.push(objet)

      })
      table.sort((a,b)=>a.category>b.category)
    }

  }

}).mount('#app')