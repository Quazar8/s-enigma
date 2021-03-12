const svg = document.getElementById('background-svg')
const uri = 'http://www.w3.org/2000/svg'
const xMid = 150, yMid = 175 //centroid coordinates of the svg triangles

const createTrianglePointsStr = (xMid, yUpper, x1, yLower, x2) => {
    return `${xMid},${yUpper} ${x1},${yLower} ${x2},${yLower}`
}

const appendTriangle = (points, id, cx, cy) => {
    const triangle = document.createElementNS(uri,'polygon')
    triangle.id = id
    triangle.setAttribute('points', points)
    triangle.setAttribute('transform-origin', `${cx} ${cy}`)
    svg.appendChild(triangle)
}

const createTriangle = (sideLen, id) => {
    const halfLen = sideLen / 2
    const x1 = xMid - halfLen
    const x2 = xMid + halfLen

    const vLen = Math.sqrt(sideLen * sideLen - halfLen * halfLen)
    const yUpper = yMid - vLen / 2
    const yLower = yMid + vLen / 2

    // const points = `${xMid},${yUpper} ${x1},${yLower} ${x2},${yLower}`
    const points = createTrianglePointsStr(xMid, yUpper,
        x1, yLower, x2)
    const cy = (yLower + yUpper) / 2
    const cx = (x1 + x2) / 2 
    appendTriangle(points, id, cx, cy + 12.5)

    return [yUpper, yLower]
}

const appendRelativeTriangle = (yUpper, yLower, distance, id) => {
    const correction = 80 * distance / 100
    const yUpperNew = yUpper - distance - correction
    const yLowerNew = yLower + distance
    const c = yLowerNew - yUpperNew

    const a = Math.sqrt(4*(c*c) / 3)
    const halfLen = a / 2
    const x1 = xMid - halfLen
    const x2 = xMid + halfLen

    const points = createTrianglePointsStr(xMid, yUpperNew,
        x1, yLowerNew, x2)
    const cy = (yUpperNew + yLowerNew) / 2
    const cx = (x1 + x2) / 2
    appendTriangle(points, id, cx, cy)
}

const [yUpper, yLower] = createTriangle(100, 'inner-triangle')
appendRelativeTriangle(yUpper, yLower, 20, 'middle-triangle')
appendRelativeTriangle(yUpper, yLower, 40, 'outer-triangle')

// const innerTri = document.getElementById('inner-triangle')
// innerTri.animate([
//     {transform: 'rotateZ(360deg)'}
// ], {
//     duration: 10000,
//     iterations: Infinity
// })