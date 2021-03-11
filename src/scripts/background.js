const svg = document.getElementById('background-svg')
const uri = 'http://www.w3.org/2000/svg'
const xMid = 150, yMid = 175 //centroid coordinates of the svg triangles

const createTrianglePointsStr = (xMid, yUpper, x1, yLower, x2) => {
    return `${xMid},${yUpper} ${x1},${yLower} ${x2},${yLower}`
}

const appendTriangle = (points, id) => {
    const triangle = document.createElementNS(uri,'polygon')
    triangle.id = id
    triangle.setAttribute('points', points)
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
    appendTriangle(points, id)

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
    appendTriangle(points, id)
}

const [yUpper, yLower] = createTriangle(100, 'inner-triangle')
appendRelativeTriangle(yUpper, yLower, 20, 'middle-triangle')
appendRelativeTriangle(yUpper, yLower, 40, 'outer-triangle')