const tilesProvider= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

let myMap = L.map('myMap').setView([1.2 , -77.267], 13)

L.tileLayer(tilesProvider, {
  maxZoom: 17,
  minZoom: 12,
}).addTo(myMap)

let iconMarker = L.icon({
  iconUrl: 'images/señal.png',
  iconSize: [30, 30],
  iconAnchor: [30, 30]
})

let marker1 = L.marker([1.21287 , -77.29139], {icon: iconMarker}).addTo(myMap)
