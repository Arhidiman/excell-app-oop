import {$} from "@core/dom";

export const shouldResize = (event) => {
    return event.target.dataset.resize !== undefined
}

export const setResizerStyle = (resizer, type) => {
    switch (type) {
        case "col": {
            resizer.css({background: "blue", height: "100vh"})
        } break
        case "row": {
            resizer.css({background: "blue", width: "300vw"})
        }
    }
}

export const moveResizer = (event, type, resizer, resizableElement) => {
    switch (type) {
        case "col": {
            const resizerPosition = event.clientX - resizableElement.getCoords().x
            resizer.css({left: `${resizerPosition}px`})
        } break
        case "row": {
            const resizerPosition = event.clientY - resizableElement.getCoords().y
            resizer.css({top: `${resizerPosition}px`})
        }
    }
}

export const resizeCol = (event, resizableElement, colSelector, startX) => {
    const endX = event.clientX
    const deltaWidth = endX - startX
    const resizeElementStartWidth = resizableElement.$el.offsetWidth
    const resizeElementEndWidth = resizeElementStartWidth + deltaWidth
    const colElements = document.querySelectorAll(`[data-col="${colSelector}"]`)
    resizableElement.css({width: `${resizeElementEndWidth}px`})
    colElements.forEach(element => element.style.width = `${resizeElementEndWidth}px`)
}

export const resizeRow = (event, resizableElement, startY) => {
    const endY = event.clientY
    const deltaHeight = endY - startY
    const resizeElementStartHeight = resizableElement.$el.offsetHeight
    const resizeElementEndHeight = resizeElementStartHeight + deltaHeight
    resizableElement.css({height: `${resizeElementEndHeight}px`})
}

export const resizeHandler = (event) => {
    const resizer = $(event.target)
    const type = event.target.dataset.resize
    const startX = event.clientX
    const startY = event.clientY
    const resizableElement = $(resizer.$el.closest(`[data-type="resizable"]`))
    const colSelector = resizableElement.$el.dataset.col
    setResizerStyle(resizer, type)
    document.onmousemove = (event) => {
        moveResizer(event, type, resizer, resizableElement)
    }
    document.onmouseup = (event) => {
        resizer.css({background: "transparent", heigth: "24px"})
        switch (type) {
            case "col": resizeCol(event, resizableElement, colSelector, startX)
                break
            case "row": resizeRow(event, resizableElement, startY)
        }
        document.onmousemove = null
        document.onmouseup = null
    }
}

export const isCell = (event) => {
    return event.target.dataset.type === "cell"
}

export const getRange = (startId, endId) => {
    let [startRow, startColumn] = startId.split(":").map(Number)
    let [endRow, endColumn] = endId.split(":").map(Number)

    if (startRow > endRow) {
        [startRow, endRow] = [endRow, startRow]
    }
    if (startColumn > endColumn) {
        [startColumn, endColumn] = [endColumn, startColumn]
    }

    return {
        start: {
            row: startRow,
            col: startColumn
        },
        end: {
            row: endRow,
            col: endColumn
        }
    }
}

export const nextSelector = (key, {col, row}) => {
    switch (key) {
        case "ArrowDown": {
            row++
        } break
        case "ArrowUp": {
            row--
        } break
        case "ArrowLeft": {
            col--
        } break
        case "ArrowRight": {
            col++
        } break
    }
    return `[data-id="${row}:${col}"]`
}
