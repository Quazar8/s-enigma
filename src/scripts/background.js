const svg = document.getElementById('background-svg')
const uri = 'http://www.w3.org/2000/svg'

const appendTriangle = (sideLen, id) => {
    const xMid = 250, yMid = 150

    const triangle = document.createElementNS(uri,'polygon')
    triangle.id = id
    
    let halfLen = sideLen / 2
    let x1 = xMid - halfLen
    let x2 = xMid + halfLen

    let vLen = Math.sqrt(sideLen * sideLen - halfLen * halfLen)
    yUpper = yMid - vLen / 2
    yLower = yMid + vLen / 2

    const points = `${xMid},${yUpper} ${x1},${yLower} ${x2},${yLower}`

    triangle.setAttribute('points', points)
    svg.appendChild(triangle)
}

appendTriangle(250, 'outer-triangle')