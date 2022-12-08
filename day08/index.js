var data = require('fs').readFileSync('day08/input.txt', 'utf8').trim()
data = data.split('\n').map(row => row.split('').map(s => Number(s)))


//Part 1
let part1 = 0
data.map((row, y) => row.map((item, x) => part1 += isVisible(y, x, data) ? 1 : 0))
console.log('Part 1:', part1) //1693

//Part 2
let part2 = []
data.map((row, y) => row.map((item, x) => part2.push(viewingDistance(y, x, data))))
console.log('Part 2:', Math.max(...part2)) //422059

function isVisible(row, col, grid) {
    let visible = false
    const height = grid[row][col]

    let trees = []
    for (let x = col - 1; x >= 0; x--) trees.push(grid[row][x])//left
    if (Math.max(...trees) < height) visible = true

    trees = []
    for (let x = col + 1; x < grid[0].length; x++) trees.push(grid[row][x])//right
    if (Math.max(...trees) < height) visible = true

    trees = []
    for (let y = row - 1; y >= 0; y--) trees.push(grid[y][col])//up
    if (Math.max(...trees) < height) visible = true

    trees = []
    for (let y = row + 1; y < grid.length; y++) trees.push(grid[y][col])//down
    if (Math.max(...trees) < height) visible = true

    return visible
}

function viewingDistance(row, col, grid) {
    const height = grid[row][col]
    let distances = []

    let dist = 0
    for (let x = col - 1; x >= 0; x--) { //left
        dist++
        if (grid[row][x] >= height) break
    }
    distances.push(dist)

    dist = 0
    for (let x = col + 1; x < grid[0].length; x++) { //right
        dist++
        if (grid[row][x] >= height) break
    }
    distances.push(dist)

    dist = 0
    for (let y = row - 1; y >= 0; y--) { //up
        dist++
        if (grid[y][col] >= height) break
    }
    distances.push(dist)

    dist = 0
    for (let y = row + 1; y < grid.length; y++) { //up
        dist++
        if (grid[y][col] >= height) break
    }
    distances.push(dist)

    return distances.reduce((acc, n) => acc * n, 1)
}