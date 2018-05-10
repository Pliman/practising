new Promise((res, rej) => {
    res(123)
}).then((rtn) => {
    // throw new Error('no no no')
    return rtn
}).then((rtn) => {
    return rtn + 3
}).then((rtn) => {
    console.log(`rtn: ${rtn}`)
}, (e) => {
    console.log(`e: ${e}`)
})

// new Promise((res, rej) => {
//     res(123)
// }).then((rtn) => {
//     return rtn
// }).then((rtn) => {
//     console.log(rtn)
// })
