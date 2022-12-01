var data = require('fs').readFileSync('day01/input.txt', 'utf8')
data = data.split('\n\n').map(s=>s.split('\n').map(Number))

let elves = data.map(arr => arr.reduce((sum, n) => sum + n, 0)).sort((a,b)=> b-a)

//Part 1
console.log(`Part 1: ${elves[0]}`) //72240

//Part 2
console.log(`Part 2: ${elves[0]+elves[1]+elves[2]}`) //210957