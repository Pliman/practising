new Promise((res, rej) => {
    res(123)
}).then((rtn) => {
    // throw new Error('no no no')
    return rtn
}).catch((e) => {
    console.log('catch')
    console.log(e)
    // return e
}).then((rtn) => {
    console.log('last then')
    console.log(rtn)
})


// new Promise((res, rej) => {
//     res(123)
// }).then((rtn) => {
//     return rtn
// }).then((rtn) => {
//     console.log(rtn)
// })
