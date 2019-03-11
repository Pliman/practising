const calcCombination = require('./calc-combination')

const rect = [[0, 0], [640, 480]] // 暂时只支持横屏 区域起点和止点 x水平向右， y垂直向上
const groups = require('./input1') // 由多到少已排序分类任务数量

function getTotalTaskCount(groups) {
    let total = 0

    groups.forEach(group => total += group.taskCount)

    return total
}

let totalTaskCount = getTotalTaskCount(groups)
let xLength = rect[1][0]
let yLength = rect[1][1]
let taskAreaByPixel = xLength * yLength / totalTaskCount // pixel per taskArea

let clonedGroups = groups.slice()
function fillArea(area, groups) {
    if (groups.length === 0) return

    // 条带划分
    // 分类分组
    let biggestTask = groups.shift()
    let biggestSharePercentage = biggestTask.taskCount / totalTaskCount

    if (biggestSharePercentage >= 0.5) {
        let xCoordinate = biggestTask.taskCount * taskAreaByPixel / yLength
        renderRect([area[0], [xCoordinate, yLength]], biggestTask)
        // let renewedGroups = getRenewedGroup(biggestTask, clonedGroups)


        fillArea([[xCoordinate, 0], [xLength, yLength]], biggestTask)
    } else if ( 0.3 < biggestSharePercentage < 0.5) {
        // 分为小于55%的组，否则还是横向渲染
        columnizeGroup(biggestTask, groups, 2)
    }
}

let taskAreas = []

function renderRect(area, group) {
    taskAreas.push({
        area: area,
        group: group
    })
}

function getRenewedGroup(group, groups) {
    return groups.filter(eachGroup => group.name != eachGroup.name)
}

function columnizeGroup(group, groups, columnCount) {
    let groupCombination = calcCombination.calcAllCombination(groups.length)
    console.log(groupCombination.length)
}

fillArea(rect, clonedGroups)

