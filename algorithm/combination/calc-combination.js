module.exports = {
    calcAllCombination
}

function calcAllCombination(length) {
    let allCombination = []
    let tempArray = generateArray(length)

    for(let i = 0; i < length; i++) {
        let combination = calcCombination(tempArray, i + 1);
        allCombination = allCombination.concat(combination)
    }

    return allCombination
}

function generateArray(length) {
    let toCombineArray = new Array(length)

    for (let i = 0; i < length; i++) toCombineArray[i] = i

    return toCombineArray
}

// 写一个函数，输出所有Cmn组合
// 关键点如下：
// 参数：数组，和n(选取多少个元素)
// 循环数组，取第一个元素，放到临时数组，如果临时数组长度没有达到n，继续组合
// 递归，参数为 数组.slice(1),n 循环 这个新数组，取第一个元素，放到临时数组，如果临时数组长度没有达到n，继续组合
// 递归，参数为 数组.slice(2),n 循环 这个新数组，取第一个元素，放到临时数组，如果临时数组长度没有达到n，继续组合
// ...
// 递归，参数为 数组.slice(n-1),n 循环 这个新数组，取第一个元素，放到临时数组，发现临时数组长度为n，组合成立，放到另一个组合数组里面
//
// 将临时数组的最后一个元素弹出(pop)，放入数组.slice(n-1)的下一个元素，可以生成新组合
// 直到数组.slice(n-1)的最后一个元素，这时，移除临时最后2个元素，走数组.slice(n-2)循环，放入下一个元素，再次递归
//
// 如果数组最后一个元素都放进临时数组去了，临时数组长度还不够n，说明这个数组不足以生成组合，直接移除临时数组最后2个元素，尝试上上个递归的下一个元素
//
// 最后返回另一个组合数组，就获取到了所有组合

// 从数列array中，选取combinationCount个元素做组合，求出所有组合
function calcCombination(array, combinationCount) {
    let combinationArr = [],
        combination = []

    function doCalcCombination(array, combinationCount) {
        let length = array.length

        for (let i = 0; i < length; i++) {
            combination.push(array[i])

            let combinationLength = combination.length;
            if (combinationLength === combinationCount) {
                combinationArr.push(combination.slice())

                if (i === length - 1) {
                    combination.splice(-2, 2) // 当前循环完毕，去掉2个元素，分别是当前循环放入的元素和上个循环放入的元素，以便尝试上一个循环的下一个元素
                } else {
                    combination.pop() // 当前循环下一个，去掉当前循环上次放入的元素，尝试当前循环的下一个元素
                }
            } else {
                if (i === length - 1) {
                    combination.splice(-2, 2) // 当前循环完毕，去掉2个元素，分别是当前循环放入的元素和上个循环放入的元素，以便尝试上一个循环的下一个元素
                } else {
                    doCalcCombination(array.slice(i+1), combinationCount) // 当前循环不满足元素个数要求，从剩下的数组中，再依次选取元素
                }
            }
        }
    }
    doCalcCombination(array, combinationCount)

    return combinationArr
}

// let allCombination = calcAllCombination(6)
// let allCombination = calcCombination([1,2,3,4,5,6,7,8,9,10], 5)
// console.log(allCombination.length)
