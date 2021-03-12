const svg = document.getElementById('background-svg')
const uri = 'http://www.w3.org/2000/svg'
const xMid = 150, yMid = 130//centroid coordinates of the svg triangles
const yCorrection = 24

// const circle = document.createElementNS(uri, 'circle')
// circle.setAttribute('cx', xMid)
// circle.setAttribute('cy', yMid + 24)
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
    triangle.setAttribute('transform-origin', `${xMid} ${yMid + yCorrection}`)
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

const [yUpper, yLower] = createTriangle(200, 'outer-triangle')
appendRelativeTriangle(yUpper, yLower, -20, 'middle-triangle')
appendRelativeTriangle(yUpper, yLower, -40, 'inner-triangle')

const innerTri = document.getElementById('inner-triangle')
const middleTri = document.getElementById('middle-triangle')
const outerTri = document.getElementById('outer-triangle')

const animationTuple = (iter) => {
    const keyframes = [
        {transform: `rotateZ(${60 + (iter - 1) * 60}deg)`},
        {transform: `rotateZ(${60 + iter * 60}deg)`}
    ]

    const options = {
        delay: 1000,
        duration: 300,
        fill: "forwards",
        easing: 'ease-out'
    }

    return [keyframes, options]
}

var animateInner = (iter) => {
    iter = iter % 6
    const [keyframes, options] = animationTuple(iter)
    innerTri.animate(keyframes, options).onfinish = () => {
        animateMiddle(iter)
    }
}

var animateOuter = (iter) => {
    const [keyframes, options] = animationTuple(iter)
    outerTri.animate(keyframes, options).onfinish = () => {
        animateInner(iter + 1)
    }
}

var animateMiddle = (iter) => {
    const [keyframes, options] = animationTuple(iter)
    middleTri.animate(keyframes, options).onfinish = () => {
        animateOuter(iter)
    }
}

animateInner(0)