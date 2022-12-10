var data = require('fs').readFileSync('day10/input.txt', 'utf8').trim()
data = data.split('\n').map(row => row.split(' '))

function getRegister(cycles, data) {
    let register = 1
    let cycle = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == 'addx') {
            cycle++
            if (cycle == cycles) return register
            cycle++
            if (cycle == cycles) return register
            register += Number(data[i][1])
        } else {
            cycle++
        }
        if (cycle == cycles) return register
    }
}


//Part 1
let part1 = [20, 60, 100, 140, 180, 220].reduce((sum, s) => sum + getRegister(s, data) * s, 0)
console.log(part1); //11720

//Part 2
let screen = new Array(6).fill().map(s => s = new Array(40).fill(' '))
let sprite = 1
for (let row = 0; row < 6; row++) {
    for (let i = 0; i < 40; i++) {
        sprite = getRegister(i + 1 + row * 40, data)
        screen[row][i] = (i == sprite || i - 1 == sprite || i + 1 == sprite) ? '#' : '.'
    }
}
screen.map(row => console.log(row.join(''))) //ERCREPCJ