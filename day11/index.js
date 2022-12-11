var data = require('fs').readFileSync('day11/input.txt', 'utf8').trim()
data = data.split('\n\n').map(monkey => monkey.split('\n').map(s => s.trim()))

data = data.map(monkey => {
    return {
        'monkey': Number(monkey[0].match(/\d/)[0]),
        'items': monkey[1].match(/\d+/g).map(Number),
        'operation': [monkey[2].slice(21, 22), monkey[2].match(/\d+/)],
        'testDivisibleBy': Number(monkey[3].match(/\d+/g)[0]),
        'ifTrueThrowTo': Number(monkey[4].match(/\d+/g)[0]),
        'ifFalseThrowTo': Number(monkey[5].match(/\d+/g)[0]),
        'itemsInspected': 0
    }

})

function inspectItems(monkeys, index, divider) {
    let monkey = monkeys[index]
    monkey.items = monkey.items.map(item => {
        if (monkey.operation[0] == "+") item += Number(monkey.operation[1][0])
        if (monkey.operation[0] == "*" && monkey.operation[1]) item *= Number(monkey.operation[1][0])
        if (monkey.operation[0] == "*" && !monkey.operation[1]) item *= item
        item = Math.floor(item / divider) % mod
        if (item % monkey.testDivisibleBy == 0) {
            monkeys[monkey.ifTrueThrowTo].items.push(item)
        } else {
            monkeys[monkey.ifFalseThrowTo].items.push(item)
        }
    })
    monkey.itemsInspected += monkey.items.length
    monkey.items = []
}

let mod = data.reduce((a, c) => a * c.testDivisibleBy, 1);

//Part 1
let dataPt1 = JSON.parse(JSON.stringify(data))
for (let round = 1; round <= 20; round++) {
    for (let i = 0; i < dataPt1.length; i++) {
        inspectItems(dataPt1, i, 3)
    }
}
let itemsInspected = dataPt1.map(monkey => monkey.itemsInspected).sort((a, b) => b - a)
console.log('Part 1:', itemsInspected[0] * itemsInspected[1]); //58794

//Part 2
let dataPt2 = JSON.parse(JSON.stringify(data))
for (let round = 1; round <= 10000; round++) {
    for (let i = 0; i < dataPt2.length; i++) {
        inspectItems(dataPt2, i, 1)
    }
}
itemsInspected = dataPt2.map(monkey => monkey.itemsInspected).sort((a, b) => b - a)
console.log('Part 2:', itemsInspected[0] * itemsInspected[1]); //20151213744