const fs = require('node:fs')
const readline = require('node:readline')

async function main() {
    const inStream = fs.createReadStream('b.txt') 
    const rl = readline.createInterface({
        input: inStream,
        crlfDelay: Infinity,
    })

    let yXlistMap = {}
    let section1 = true
    let total = 0

    for await (let line of rl) {
        if(line == "") {
            section1 = false
            continue
        }
        if(section1) {
            let [x,y] = line.split('|').map(Number)
            let m = yXlistMap[y]
            if(m) yXlistMap[y].push(x)
            else yXlistMap[y] = [x]
        }

        else {

            let update = line.split(',').map(Number)
            let idmap = {}
            update.forEach((pg,id) => {idmap[pg]=id})

            const inProperOrder = update.every((pg,i) => {
                xList = yXlistMap[pg]
                if(xList == undefined) return true
                return xList.every(x => {
                    let idx = idmap[x]
                    if(idx != undefined && idx > i) return false
                    return true
                })
            })

            if(!inProperOrder) {
                let n = update.length
                let mid = Math.floor(n/2)
                let properUpdate = []
                let rem = new Set(update)
                while(properUpdate.length < n) {
                    let pgs = rem.keys()
                    for(let pg of pgs) { 
                        let xList = yXlistMap[pg]
                        if(xList == undefined || xList.every(x => !rem.has(x))) {
                            rem.delete(pg)
                            properUpdate.push(pg)
                            break
                        }
                    }
                }
                total += properUpdate[mid]
                if(n % 2 == 0) {
                    total += properUpdate[mid-1] 
                }
            }
        }
    }
    console.log(total)

}

main()
