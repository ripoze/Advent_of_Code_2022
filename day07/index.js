var data = require('fs').readFileSync('day07/input.txt', 'utf8')
data = data.split('\n')

let directories = []
let files = []
let currentDirectory = '/'
directories.push({ 'name': '/', parent: '/', 'size': undefined, 'subdirectories': [] })
data.map(row => {
    if (row.match(/\$ cd (\w+)/)) { //cd command
        currentDirectory = currentDirectory + row.match(/\$ cd (\w+)/)[1] + '/'
    }
    if (row.match(/dir (\w+)/)) { //directory in list
        directories.push({ 'name': currentDirectory + row.match(/dir (\w+)/)[1] + '/', parent: currentDirectory, 'size': undefined, 'subdirectories': [] })
        directories.filter(f => f.name == currentDirectory)[0].subdirectories.push(currentDirectory + row.match(/dir (\w+)/)[1] + '/')
    }
    if (row.match(/(\d+) (.+)/)) { //file in list
        files.push({ 'directory': currentDirectory, name: row.match(/(\d+) (\w+)/)[2], size: row.match(/(\d+) (\w+)/)[1] })
    }
    if (row == '$ cd ..') {
        currentDirectory = directories.filter(dir => dir.name == currentDirectory)[0].parent
    }
})

function getDirSize(directoryName) {
    directory = directories.filter(dir => dir.name == directoryName)[0]
    let filesInDirectory = files.filter(f => f.directory == directory.name)
    let size = filesInDirectory.reduce((sum, f) => sum += Number(f.size), 0)
    if (directory.subdirectories) {
        size += directory.subdirectories.reduce((sum, dir) => sum += getDirSize(dir), 0)
    }
    return size
}

directories = directories.map(dir => {
    dir.size = getDirSize(dir.name)
    return dir
})

//Part 1
let part1 = directories.filter(dir => dir.size <= 100000).reduce((sum, dir) => sum += dir.size, 0)
console.log('Part 1:', part1) //1642503

//Part 2
const diskSize = 70000000
const spaceUsed = directories[0].size
const freeSpace = diskSize - spaceUsed
const freeSpaceNeeded = 30000000
const moreFreeSpaceNeeded = freeSpaceNeeded - freeSpace

let part2 = directories.filter(dir => dir.size >= moreFreeSpaceNeeded).sort((a, b) => a.size - b.size)[0].size
console.log('Part 2:', part2) //6999588