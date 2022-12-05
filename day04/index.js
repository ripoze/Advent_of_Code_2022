var data = require('fs').readFileSync('day04/input.txt', 'utf8')
data = data.trim().split('\n')
data = data.map(s => s.split(',').map(s => s.split('-')))


//Part 1
let part1 = data.reduce((sum, pair) => {
    let [[pair1Start, pair1End], [pair2Start, pair2End]] = pair
    if (inRange(pair1Start, pair2Start, pair2End) && inRange(pair1End, pair2Start, pair2End) ||
        (inRange(pair2Start, pair1Start, pair1End) && inRange(pair2End, pair1Start, pair1End))) {
        sum++
    }
    return sum
}, 0)
console.log('Part 1:', part1) //413


//Part 2
let part2 = data.reduce((sum, pair) => {
    let [[pair1Start, pair1End], [pair2Start, pair2End]] = pair
    if (inRange(pair1Start, pair2Start, pair2End) || inRange(pair1End, pair2Start, pair2End) ||
        inRange(pair2Start, pair1Start, pair1End) || inRange(pair2End, pair1Start, pair1End)) {
        sum++
    }
    return sum
}, 0)
console.log('Part 2:', part2) //806

function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0)
}