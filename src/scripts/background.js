const svg = document.getElementById('background-svg')
const uri = 'http://www.w3.org/2000/svg'
const xMid = 150, yMid = 150//centroid coordinates of the svg triangles

// const circle = document.createElementNS(uri, 'circle')
// circle.setAttribute('cx', xMid)
// circle.setAttribute('cy', yMid)
// circle.setAttribute('r', 10)
// circle.setAttribute('fill', 'yellow')
// svg.appendChild(circle)

const createTrianglePointsStr = (xMid, yUpper, x1, yLower, x2) => {
    return `${xMid},${yUpper} ${x1},${yLower} ${x2},${yLower}`
}

const appendTriangle = (points, id) => {
    const triangle = document.createElementNS(uri,'polygon')
    triangle.id = id
    triangle.setAttribute('points', points)
    triangle.setAttribute('transform-origin', `${xMid} ${yMid + 12}`)
    svg.appendChild(triangle)
}

const createTriangle = (sideLen, id) => {
    const halfLen = sideLen / 2
    const x1 = xMid - halfLen
    const x2 = xMid + halfLen

    const vLen = Math.sqrt(sideLen * sideLen - halfLen * halfLen)
    const yUpper = yMid - vLen / 2
    const yLower = yMid + vLen / 2

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

const innerTri = document.getElementById('inner-triangle')
const middleTri = document.getElementById('middle-triangle')
const outerTri = document.getElementById('outer-triangle')

var animateInner = (iter) => {
    iter = (iter % 6)
    console.log('angle', 60 + iter * 60)
    innerTri.animate([
        {transform: `rotateZ(${60 + (iter - 1) * 60}deg)`},
        {transform: `rotateZ(${60 + iter * 60}deg)`}
    ], {
        delay: 1000,
        duration: 300,
        fill: "forwards",
        easing: 'ease-out'
    }).onfinish = () => {
        animateMiddle(iter)
    }
}

var animateOuter = (iter) => {
    outerTri.animate([
        {transform: `rotateZ(${60 + (iter - 1) * 60}deg)`},
        {transform: `rotateZ(${60 + iter * 60}deg)`}
    ], {
        delay: 1000,
        duration: 300,
        fill: "forwards",
        easing: 'ease-out'
    }).onfinish = () => {
        animateInner(iter + 1)
    }
}

var animateMiddle = (iter) => {
    middleTri.animate([
        {transform: `rotateZ(${60 + (iter - 1) * 60}deg)`},
        {transform: `rotateZ(${60 + iter * 60}deg)`}
    ], {
        delay: 1000,
        duration: 300,
        fill: "forwards",
        easing: 'ease-out'
    }).onfinish = () => {
        animateOuter(iter)
    }
}

animateInner(0)