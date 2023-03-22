async function traerEvents() {
    try {
      const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
      console.log(response)
      const data = await response.json()
      console.log(data)
      const events = data.events
      console.log(events)
  
      const table = document.getElementById("table1")
      mostrarTable(events, table)
  
      let filAssis = events.filter (event => event.assistance)
      let filEstim = events.filter (event => event.estimate)
      mostrarTableA(filEstim, tableGroup2)
      mostrarTableA(filAssis, tableGroup3)
  
  
      function mostrarTable(array, container) {
  
        let attendanceHigh = array.filter(event => event.assistance).reduce((event1, event2) => 
           (event1.assistance / event1.capacity) > (event2.assistance / event2.capacity)? event1 : event2
        )
  
        let attendanceLow = array.filter(event => event.assistance).reduce((event1, event2) => 
          (event1.assistance / event1.capacity) < (event2.assistance / event2.capacity)? event1: event2
        )
  
        let capacityLarger = array.reduce((event1, event2) => (event1.capacity >= event2.capacity)?  event1 : event2
        )
  
  
        let newTr = document.createElement('tr')
        newTr.innerHTML = `
                  <td><b>${attendanceHigh.name}:</b> ${(attendanceHigh.assistance / attendanceHigh.capacity * 100).toFixed(2)} %</td>
                  <td><b>${attendanceLow.name}:</b> ${(attendanceLow.assistance / attendanceLow.capacity * 100).toFixed(2)} %</td>
                  <td><b>${capacityLarger.name}:</b> ${capacityLarger.capacity}</td>`
  
        container.appendChild(newTr)
      }
  
      function ingresos(array, categoryName) {
  
        let byCategory = array.filter(event => event.category == categoryName)
        let byEvents = byCategory.reduce((suma, event) => event.assistance != undefined ? suma += event.assistance * event.price : suma += event.estimate * event.price, 0)
        return byEvents
      }
  
      function porcentajeAsistencia(array, categoryName) {
  
        let byCategory = array.filter(event => event.category == categoryName)
        console.log(byCategory)
        let byEvents = byCategory.reduce((total, event) => event.assistance != undefined ? total += (event.assistance / event.capacity) * 100 : total += (event.estimate / event.capacity)*100, 0)
        console.log(byEvents)
        return (byEvents / byCategory.length).toFixed(2)
      }
  
      function mostrarTableA(array, container) {
  
        let categories = [... new Set(array.map(event => event.category))]
        console.log(categories)
  
  
        let fragment = document.createDocumentFragment()
  
        for (let category of categories) {
          let newTr = document.createElement('tr')
          newTr.innerHTML = `
                        <td><b>${category}</b></td>
                        <td> &#36 ${ingresos(array, category)}</td>
                        <td>${porcentajeAsistencia(array, category)} %</td>`
  
          fragment.appendChild(newTr)
        }
        container.appendChild(fragment)
  
      }
  
    }
    catch (error) {
        console.log(error = "No se ha logrado traer la informacion de la API")
    }
  }
  
  traerEvents()
  