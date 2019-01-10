var fn = curry(function(a, b, c) {
    console.log([a, b, c])
})

function curry(func) {
    let args = []

    let continuousInvoker = function() {
        args = args.concat(Array.from(arguments))

        if (args.length >= func.length) {
            func.apply(func, args)
            args = []
            return
        }

        return continuousInvoker
    }

    return continuousInvoker
}

fn("a", "b")("c")
fn("a")("b")("c")

