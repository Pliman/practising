Promise.reject(111).then((rtn) => {
    console.log(`rtn ${rtn}`)
}, (err) => {
    console.log(`err ${err}`)
    return err
}).then((rtn) => {
    console.log(rtn)
})
