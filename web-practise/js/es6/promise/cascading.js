new Promise(((resolve, reject) => {
    process.nextTick(() => {
        resolve(0)
    })
})).then(getA).then(getB).then(getC).then(res => console.log(res))


function getA (res) {
    console.log(res)

    return new Promise(((resolve, reject) => {
        process.nextTick(() => {
            resolve(1)
        })
    }))
}

function getB (res) {
    console.log(res)

    return new Promise(((resolve, reject) => {
        process.nextTick(() => {
            resolve(2)
        })
    }))
}

function getC (res) {
    console.log(res)

    return new Promise(((resolve, reject) => {
        process.nextTick(() => {
            resolve(3)
        })
    }))
}
