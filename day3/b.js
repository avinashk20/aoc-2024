const fs = require('node:fs/promises')


/* deadly */
async function main() {
    const test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    try {
        let data = await fs.readFile('b.txt', {encoding: 'utf8'})
        let n = data.length
        let total = 0
        let canDo = true
        const ref = 'mul('
        for(let s = 0; s <= n-8; ++s) {
            let matchedDont = false 
            // check for "don't"
            let p = s, q = 0
            const a = "don't"
            while(p < n && q < a.length && a[q] == data[p]) {
                q++
                p++
            }
            if(q == a.length) matchedDont = true
            if(matchedDont) {
                canDo = false   
                s += 5
            } 
             
            // check for "do"
            let matchedDo = false 
            p = s, q = 0
            const b = "do"
            while(p < n && q < b.length && b[q] == data[p]) {
                q++
                p++
            }
            if(q == b.length) matchedDo = true
            if(matchedDo) {
                canDo = true
                s += 4
            }

            if(canDo) {
                let isValid = true
                let r = 0, i = s
                // check for "mul("
                while(r < ref.length && i < n) {
                    if(ref[r] != data[i]) {
                        isValid = false
                        break
                    }
                    i++
                    r++
                }
                if(i == n) isValid = false
                if(isValid) {
                    // check for "X,"
                    let j = i
                    while(j < n && !isNaN(data[j])) j++
                    if(j == i || j == n || data[j] != ',') isValid = false
                    if(isValid) {
                        // check for "Y)"
                        i = j+1
                        j = i 
                        while(j < n && !isNaN(data[j])) j++
                        if(j == i || j == n || data[j] != ')') isValid = false
                        if(isValid) {
                            // matched "mul(X,Y)"            
                            [x, y] = data.substring(s + ref.length, j).split(",").map(Number)
                            total += (x * y)
                        }
                    }
                }
            } 
        }
        console.log(total)
    }
    catch (e) {
        console.log(e)
    }
}

main()

