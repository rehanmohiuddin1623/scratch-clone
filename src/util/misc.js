
export function mutateList(checked, list, ele) {
    if (checked) {
        return [...list, ele]
    }
    return [...list.filter((val, i) => val.uuid !== ele.uuid)]
}

export function getNearestBlocks(codeBlock, pieces, { x, y }) {
    let inititalY = codeBlock.y
    codeBlock.checked = false
    const actions = []
    pieces.forEach((item) => {
        item.uid = Math.random() * 1000
        if (Math.abs(item.y - inititalY) <= 50) {
            actions.push(item)
            inititalY = item.y
        }
        return false
    })
    if (actions.length) {
        return [...actions]
    }

    return [codeBlock]

}