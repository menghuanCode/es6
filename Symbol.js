'use strict'
// require('@babel/polyfill')

// Symbol

// 2. Symbol.prototype.description
var { log } = console
var sym = Symbol('foo')

log(sym)
log(sym.description)

// 3. 作为属性名的 Symbol

var mySymbol = Symbol()

// // 三种写法
// var a1 = {}
// a1[mySymbol] = 'Hello!'
// ////
// var a2 = {
//     [mySymbol] = 'Hello!'
// }
// ////
// var a3 = {}
// Object.defineProperty(a3, mySymbol, { value: 'Hello!' })
// //////////////////////////////////////////////////////////////////

// 注意： Symbol 的值为对象属性名时，不能用点运算符
// 因为点运算符后面总是字符串，所以不对读取作为标识名所指代的那个值
// 导致只是个字符串，而不是一个 Symbol 值

// 在对象内部使用 Symbol 值定义属性时，必须放在方括号之中
// Symbol 类型可以用于定义一组常量，保证这组常量的值都是不相等的
log(log)
var s = Symbol()
var obj = {
    [s](arg) { } 
}

log(obj[s])

var log = {}
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
}

console.log(log.levels.DEBUG, 'debug message')
console.log(log.levels.INFO, 'info message')

// 4. 实例：消除魔法字符串
// function getArea(shape, options) {
//     let area = 0

//     switch (shape) {
//         case 'Triangle':    // 魔法字符串
//             area = .5 * options.width * options.height
//             break
//     }

//     return area
// }

// getArea('Triangle', { width: 100, height: 100 })    // 魔术字符串

var shapeType = {
    triangle: Symbol()
}

function getArea(shape, options) {
    let area = 0
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height
            break
    }
    return area
}

getArea(shapeType.triangle, { width: 100, height: 100 })

// 5. 属性名的遍历
var obj = {
    a: 1,
    b: 2
}
var a = Symbol('a')
var b = Symbol('b')

obj[a] = 'Hello'
obj[b] = 'World'

var objectSymbols = Object.getOwnPropertySymbols(obj)

// 例子
var obj = {}
var foo = Symbol("foo")

Object.defineProperty(obj, foo, {
    value: "foobar"
})

for (let i in obj) {
    console.log(i)
}

console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertySymbols(obj))

// 新 API，Reflect.ownKeys 返回所有类型的键名，包括常规键名和 Symbol 键名
var obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
}

Reflect.ownKeys(obj)

// 例子
var size = Symbol('size')

class Collection {
    constructor() {
        this[size] = 0
    }

    add(item) {
        this[this[size]] = item
        this[size]++
    }

    static sizeOf(instance) {
        return instance[size]
    }
}

let x = new Collection()
Collection.sizeOf(x)    // 0

x.add('foo')
Collection.sizeOf(x)   // 1

console.log(Object.keys(x))
console.log(Object.getOwnPropertyNames(x))
console.log(Object.getOwnPropertySymbols(x))

// Symbol.for 、 Symbol.keyfor
// Symbol.for() 登记在全局环境，Symbol.key 可以返回登记的值

var s1 = Symbol.for("foo")
var s2 = Symbol.for("foo")
console.log(s1 === s2)

var s1 = Symbol.for('foo')
console.log(Symbol.keyFor(s1))

var s2 = Symbol('foo')
console.log(Symbol.keyFor(s2))

// 8. 内部 Symbol 值
// ES6 提供了 11 个内置的 Symbol 值，指向语言内部的使用方法




