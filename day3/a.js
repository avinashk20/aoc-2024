const fs = require('node:fs')
const INPUT_PATH = 'a.txt'

/* Brutal */ 
async function main() {
    const ref = 'mul('.split('');
    fs.readFile(INPUT_PATH, 'utf-8', (err, data) => {
        if(err) console.log(err)
        // data = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
        let n = data.length
        let total = 0
        for(let s = 0; s <= n-8; ++s) {
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
        console.log(total)
    })
}

main()
