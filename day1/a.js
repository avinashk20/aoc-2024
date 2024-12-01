const fs = require("node:fs");
const readline = require("node:readline");


class MinHeap {
    constructor(size = 0) {
        this.h = new Array(size);
        this.size = size;
    }

    getMin() {
        return this.h?.[0];
    }

    swap(i, j) {
        let t = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = t;
    }

    insert(num) {
        this.h[this.size] = num;
        this.size++;

        let i = this.size - 1;
        while(i > 0) {
            let p = Math.floor((i - 1) / 2);
            if(this.h[i] < this.h[p]) {
                this.swap(i, p);
                i = p;
            }
            else break;
        }
    }

    pop() {
        if(this.size == 0) return;
        this.swap(0, this.size - 1);
        this.size--;
        let i = 0;
        while (true) {
            let li = 2*i + 1;
            let ri = 2*i + 2;
            
            let smallest = i;

            if(li < this.size && this.h[li] < this.h[smallest]) {
                smallest = li;
            } 
            if(ri < this.size && this.h[ri] < this.h[smallest]) {
                smallest = ri;
            }
            
            if(smallest == i) break;

            this.swap(smallest, i);
            i = smallest;
        }
    }

    isEmpty() {
        return this.size === 0;
    }
}

let total = 0;
const h1 = new MinHeap();
const h2 = new MinHeap();

async function processLineByLine(){
    const fileStream = fs.createReadStream('a.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity, 
        // this is to treat \rf\n as a single line break 
        // windows uses \rf\n as a line break
    });

    for await (const line of rl) {
        let [a, b] = line.split("   ").map(Number);
        h1.insert(a);         
        h2.insert(b);         
    }
}


async function main() {

    await processLineByLine()

    while(!h1.isEmpty()) {
        t1 = h1.getMin();
        t2 = h2.getMin();
        total += Math.abs(t1 - t2);
        h1.pop();
        h2.pop();

    }

    console.log(total);
}


main()
