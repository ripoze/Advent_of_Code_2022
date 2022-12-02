const { off } = require('process')

var data = require('fs').readFileSync('day02/input.txt', 'utf8')
data = data.trim().split('\n').map(s => s.split(' ')).map(s => s = { opponent: s[0], me: s[1], score: 0 })

function calculateScore(data) {
    let score = 0
    data.map(s => {
        score += s.me === 'X' ? 1 : 0 //+1 if rock
        score += s.me === 'Y' ? 2 : 0 //+2 if paper
        score += s.me === 'Z' ? 3 : 0 //+3 if scissors
        score += s.me === 'X' && s.opponent === 'C' ? 6 : 0
        score += s.me === 'Y' && s.opponent === 'A' ? 6 : 0
        score += s.me === 'Z' && s.opponent === 'B' ? 6 : 0
        score += s.me === 'X' && s.opponent === 'A' ? 3 : 0
        score += s.me === 'Y' && s.opponent === 'B' ? 3 : 0
        score += s.me === 'Z' && s.opponent === 'C' ? 3 : 0
    })
    return score
}
//Part 1
console.log('Part 1:', calculateScore(data)) // 14264

//Part 2
data = data.map(s => {
    s.score = 0
    if (s.me === 'X') { //need to lose
        if (s.opponent === 'A') s.me = 'Z'
        if (s.opponent === 'B') s.me = 'X'
        if (s.opponent === 'C') s.me = 'Y'
        return s
    }
    if (s.me === 'Y') { //need  round
        if (s.opponent === 'A') s.me = 'X'
        if (s.opponent === 'B') s.me = 'Y'
        if (s.opponent === 'C') s.me = 'Z'
        return s
    }
    if (s.me === 'Z') { //need to win
        if (s.opponent === 'A') s.me = 'Y'
        if (s.opponent === 'B') s.me = 'Z'
        if (s.opponent === 'C') s.me = 'X'
        return s
    }
})
console.log('Part 2:', calculateScore(data)) // 12382