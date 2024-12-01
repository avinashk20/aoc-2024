const fs = require('node:fs')
const readline = require('node:readline')
const INPUT_PATH = 'b.txt'

const l1 = []
const l2 = []

async function processInput() {
    const istream = fs.createReadStream(INPUT_PATH)
    const rl = readline.createInterface({
        input: istream,
        crlfDelay: Infinity,
    })
    for await (line of rl) {
       let [a, b] = line.split("   ").map(Number)
       l1.push(a)
       l2.push(b)
    }
}

async function main() {

    await processInput()
    
    const l2Fq = {}
    let total = 0
    
    for(let num of l2) {
        let fq = l2Fq[num] ?? 0 
        l2Fq[num] = fq + 1 
    }

    console.log(l2Fq) 

    for(let num of l1) {
        total += (num * (l2Fq[num] ?? 0)) 
    }        

    console.log(total)
}

main()
