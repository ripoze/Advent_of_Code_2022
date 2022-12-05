var data = require('fs').readFileSync('day05/input.txt', 'utf8')
let [stacks, instructions] = data.split('\n\n')

//Create array of instructions
instructions = instructions.trim().split('\n').map(s => s.match(/\d+/g))
instructions = instructions.map(s => {
    s = s.map(Number)
    return { 'move': s[0], 'from': s[1], 'to': s[2] }
})

//Push items in array of 9 arrays
stacks = stacks.split('\n')
stacks.pop()
let newStacks = new Array(9).fill(0).map(arr => [])
stacks.map(s => {
    for (let i = 0; i < 9; i += 1) {
        let item = s[i * 4 + 1]
        if (item != ' ') newStacks[i].push(item)
    }
})
stacks = newStacks.map(stack => stack.reverse())

function moveItemsOneAtTime(stacks, instruction) {
    let items = stacks[instruction.from - 1].splice(-instruction.move).reverse()
    stacks[instruction.to - 1].push(...items)
}
function moveItemsManyAtOnce(stacks, instruction) {
    let items = stacks[instruction.from - 1].splice(-instruction.move)
    stacks[instruction.to - 1].push(...items)
}

//Part 1
part1Stacks = JSON.parse(JSON.stringify(stacks))
instructions.map(instruction => moveItemsOneAtTime(part1Stacks, instruction))
console.log('Part 1: ', part1Stacks.reduce((str, stack) => str += stack[stack.length-1], '')) //HNSNMTLHQ

//Part 2
part2Stacks = JSON.parse(JSON.stringify(stacks))
instructions.map(instruction => moveItemsManyAtOnce(part2Stacks, instruction))
console.log('Part 2: ', part2Stacks.reduce((str, stack) => str += stack[stack.length-1], '')) //RNLFDJMCT

