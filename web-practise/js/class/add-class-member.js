class A{}

A.prototype.a = 'a'
A.b = 'b'

Object.defineProperties(A.prototype, {
    'c': {
        value: 'c'
    }
})

Object.defineProperties(A, {
    'd': {
        value: 'd'
    }
})

var a = new A();
console.log(a.a)
console.log(a.b)
console.log(a.c)
console.log(a.d)
debugger
