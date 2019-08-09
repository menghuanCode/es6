'use strict'
// require('@babel/polyfill')

let { log } = console

let stu1 = { name: '张三', score: 90 }
let stu2 = { name: '李四', score: 11 }

let handler = {
    has(target,prop) {
        if(prop === 'score' && target[prop] < 60) {
            log(`${target.name} 不及格`)
            return false
        }
        return prop in target
    }
}

let oproxy1 = new Proxy(stu1, handler)
let oproxy2 = new Proxy(stu2, handler)


log('score' in oproxy1)
log('score' in oproxy2)

for(let a in oproxy1) {
    log(oproxy1[a])
}

for(let a in oproxy2) {
    log(oproxy2[a])
}