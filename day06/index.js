var data = require('fs').readFileSync('day06/input.txt', 'utf8')
data = data.trim()

function findMarker(str, markerLength) {
    for (let i = markerLength - 1; i < str.length; i++) {
        let marker = str.split('').splice(i - (markerLength - 1), markerLength)
        if ([...new Set(marker)].length == markerLength) return i + 1
    }
}

//Part 1
console.log(findMarker(data, 4)) //1804

//Part 2
console.log(findMarker(data, 14)) //2508