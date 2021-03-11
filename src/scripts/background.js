const svg = document.getElementById('background-svg')
const uri = 'http://www.w3.org/2000/svg'

const triangleOuter = document.createElementNS(uri,'polygon')
triangleOuter.id = 'outer-triangle'
triangleOuter.setAttribute('points', '250,41.5 125,258.5 375,258.5')

svg.appendChild(triangleOuter)