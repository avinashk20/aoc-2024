const fs = require('node:fs')
const readline = require('node:readline')

async function main() {
    try {
        /*
        let data = await fs.readFile('a.txt', {encoding: 'utf8'})
        let grid = data.split("\n")
        console.log(grid.length)
        */

        const inStream = fs.createReadStream('a.txt')
        const rl = readline.createInterface({
            input: inStream,
            crlfDelay: Infinity
        })
        let grid = []
        for await (let line of rl) {
            grid.push(line)
        }
/*
        const t = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
        grid = t.split('\n');
*/

        const dir = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]
        const target = "XMAS"
        let count = 0, m = grid.length;
        for(let i = 0; i < m; ++i) {
            let n = grid[i].length
            for(let j = 0; j < n; ++j) {
                if(grid[i][j] == 'X') {

                dir.forEach(([x, y]) => {
                    let p = 1
                    let i1 = i, j1 = j
                    while(p < target.length) {
                        i1 += x
                        j1 += y
                        if(i1 < 0 || j1 < 0 || i1 >= m || j1 >= n || grid[i1][j1] != target[p]) break 
                        p++
                    }
                    if(p == target.length) count++
                } )                
                }
            }
        }
        console.log(count)
    } catch (e) {
        console.log(e)
    }
}

main()

