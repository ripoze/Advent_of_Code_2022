var data = require('fs').readFileSync('day09/input.txt', 'utf8').trim()
data = data.split('\n').map(row => row.split(' '))

let head = [0, 0]
let tail = [0, 0]
let tailLocations = [[0, 0]]



function move(direction, amount, headLocation, tailLocation) {
    if (direction == 'U') {
        headLocation = [headLocation[0], headLocation[1] - 1]
    }
    if (direction == 'D') {
        headLocation = [headLocation[0], headLocation[1] + 1]
    }
    if (direction == 'L') {
        headLocation = [headLocation[0] - 1, headLocation[1]]
    }
    if (direction == 'R') {
        headLocation = [headLocation[0] + 1, headLocation[1]]
    }
    amount--
    tailLocation = moveTail(headLocation, tailLocation)
    tailLocations.push([...tail])
    if (amount > 0) [headLocation, tailLocation] = move(direction, amount, headLocation, tailLocation)
    return [headLocation, tailLocation]
}
function moveLong(direction, amount, ropeArray) {
    headLocation = ropeArray[0]
    if (direction == 'U') {
        headLocation = [headLocation[0], headLocation[1] - 1]
    }
    if (direction == 'D') {
        headLocation = [headLocation[0], headLocation[1] + 1]
    }
    if (direction == 'L') {
        headLocation = [headLocation[0] - 1, headLocation[1]]
    }
    if (direction == 'R') {
        headLocation = [headLocation[0] + 1, headLocation[1]]
    }
    ropeArray[0] = headLocation
    amount--
    for (let i = 1; i < ropeArray.length; i++) {
        ropeArray[i] = moveTail(ropeArray[i - 1], ropeArray[i])
    }
    tailLocations.push([...ropeArray[ropeArray.length - 1]])

    if (amount > 0) ropeArray = moveLong(direction, amount, ropeArray)
    return ropeArray
}

function moveTail(headLocation, tailLocation) {
    if (headLocation[0] > tailLocation[0] + 1) {
        tailLocation[0]++
        if (headLocation[1] > tailLocation[1]) {
            tailLocation[1]++
        }
        if (headLocation[1] < tailLocation[1]) {
            tailLocation[1]--
        }
    }
    if (headLocation[0] < tailLocation[0] - 1) {
        tailLocation[0]--
        if (headLocation[1] > tailLocation[1]) {
            tailLocation[1]++
        }
        if (headLocation[1] < tailLocation[1]) {
            tailLocation[1]--
        }
    }
    if (headLocation[1] > tailLocation[1] + 1) {
        tailLocation[1]++
        if (headLocation[0] > tailLocation[0]) {
            tailLocation[0]++
        }
        if (headLocation[0] < tailLocation[0]) {
            tailLocation[0]--
        }
    }
    if (headLocation[1] < tailLocation[1] - 1) {
        tailLocation[1]--
        if (headLocation[0] > tailLocation[0]) {
            tailLocation[0]++
        }
        if (headLocation[0] < tailLocation[0]) {
            tailLocation[0]--
        }
    }
    return tailLocation
}


//Part 1
data.map(row => {
    [head, tail] = move(row[0], Number(row[1]), head, tail)
})
let uniqueTailLocations = [... new Set(tailLocations.map(s => s.join(',')))]
console.log('Part 1:', uniqueTailLocations.length) //6376

//Part 2
tailLocations = [[0, 0]]
let rope = new Array(10).fill().map(arr => [0, 0])
data.map(row => {
    rope = moveLong(row[0], Number(row[1]), rope)
})
uniqueTailLocations = [... new Set(tailLocations.map(s => s.join(',')))]
console.log('Part 2:', uniqueTailLocations.length) //2607