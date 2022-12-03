var data = require('fs').readFileSync('day03/input.txt', 'utf8')
data = data.trim().split('\n')

//Part 1
//Split rows
let sacks = data.map(s => {
    return { 'sack1': s.slice(0, s.length / 2), 'sack2': s.slice(s.length / 2) }
})

//Find duplicates
sacks = sacks.map(s => {
    s.sack1.split('').map(item => {
        if (s.sack2.includes(item)) s.duplicate = item
    })
    s.priority = itemPriority(s.duplicate)
    return s
})
let prioritiesSum = sacks.reduce((sum, n) => sum += n.priority, 0)
console.log('Part 1:', prioritiesSum) //7848


//Part 2
let groups = []
for (let i = 0; i < data.length; i += 3) {
    groups.push({ 'sacks': [data[i], data[i + 1], data[i + 2]] })
}
groups = groups.map(group => {
    group.sacks[0].split('').map(item => {
        if (group.sacks[1].includes(item) && group.sacks[2].includes(item)) group.duplicate = item
    })
    group.priority = itemPriority(group.duplicate)
    return group
})
prioritiesSum = groups.reduce((sum, n) => sum += n.priority, 0)
console.log('Part 2:', prioritiesSum) //2616


function itemPriority(item) {
    if (item == item.toLowerCase()) {
        return item.charCodeAt() - 96
    } else {
        return item.charCodeAt() - 38
    }
}