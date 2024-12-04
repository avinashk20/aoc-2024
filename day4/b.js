const fs = require('node:fs/promises')
const readline = require('node:readline')

async function main() {
    try {
        let data = await fs.readFile('a.txt', {encoding: 'utf8'})
        let grid = data.split("\n")
        /*
const t = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`
        grid = t.split('\n');
*/

        const cmap = [
            [1, 1, 'S'],
            [1, -1, 'S'],
            [-1, 1, 'M'],
            [-1, -1, 'M'],
        ]

        const cmap1 = [
            [1, 1, 'M'],
            [1, -1, 'M'],
            [-1, 1, 'S'],
            [-1, -1, 'S'],
        ]

        const cmap2 = [
            [1, 1, 'M'],
            [1, -1, 'S'],
            [-1, 1, 'M'],
            [-1, -1, 'S'],
        ]

        const cmap3 = [
            [1, 1, 'S'],
            [1, -1, 'M'],
            [-1, 1, 'S'],
            [-1, -1, 'M'],
        ]

        const states = [cmap, cmap1, cmap2, cmap3]

        let count = 0, m = grid.length;
        for(let i = 0; i < m; ++i) {
            let n = grid[i].length
            for(let j = 0; j < n; ++j) {
                if(grid[i][j] == 'A') {
                    states.forEach(a => {
                        let match = a.every(([x,y,c]) => {
                            let i1 = i+x, j1 = j+y
                            return (i1 >= 0 && i1 < m && j1 >= 0 && j1 < n && grid[i1][j1] == c)
                        })
                        if(match) count++
                    })
                }
            }
        }
        console.log(count)
    } catch (e) {
        console.log(e)
    }
}

main()

