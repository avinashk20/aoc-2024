const fs = require('node:fs')
const readline = require('node:readline')


async function main() {
    const ins = fs.createReadStream('a.txt')
    const rl = readline.createInterface({
        input: ins,
        crlfDelay: Infinity,
    })

    let grid = []
    for await (let l of rl) { grid.push(l.split('')) }

    let count = 0
    let i, j, d
    const dirs = ['^', '>', 'v', '<']
    const step = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]

    grid.some((row, ri) => row.some((col, ci) => dirs.some((dir, di) => {
        if(dir == grid[ri][ci]) {
            i = ri
            j = ci
            d = di
            return true
        }
        return false
    })))


    while(i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
        if(grid[i][j] != 'x') {
            grid[i][j] = 'x'
            count++
        }
        let i1 = i + step[d][0]
        let j1 = j + step[d][1]
        if(i1 < 0 || j1 < 0 || i1 >= grid.length || j1 >= grid[i1].length) break
        if(grid[i1][j1] != '#') {
            i = i1
            j = j1
        }
        else {
            d = (d + 1) % dirs.length
        }
    }
    
    console.log(count)
}

main()

