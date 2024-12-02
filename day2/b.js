const fs = require('node:fs')
const readline = require('node:readline')
const INPUT_PATH = 'b.txt'

function isSafe(r) {
    if(r.length <= 1) return true 
    let diff = r[1] - r[0]

    if(diff == 0) return false

    let sign = diff > 0 ? 1 : -1

    for(let i = 1; i < r.length; ++i) {
        diff = sign * (r[i] - r[i-1])
        if(1 <= diff && diff <= 3) continue
        else return false
    }

    return true
}


async function main() {
    const inStream = fs.createReadStream(INPUT_PATH)
    const rl = readline.createInterface({
        input: inStream,
        crlfDelay: Infinity,
    })

    let count = 0
    for await (line of rl) {
        const report = line.split(" ")
        for(let i = -1; i < report.length; ++i) {
            let reportState = report.filter((_,idx) => i != idx)
            if(isSafe(reportState)) {
                count++
                break
            }
        }
    }

    console.log(count)
}

main()
