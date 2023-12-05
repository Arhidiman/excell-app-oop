import {$} from "@core/dom";

export const shouldResize = (event) => {
    return event.target.dataset.resize !== undefined
}

export const setResizerStyle = (resizer, type) => {
    switch (type) {
        case "col": {
            // event.target.classList.add('col-resize-indicator') // Вариант полосы ресайза на css
            resizer.css({background: "blue", height: "100vh"})
        } break
        case "row": {
            // event.target.classList.add('row-resize-indicator')
            resizer.css({background: "blue", width: "300vw"})
        }
    }
}

export const moveResizer = (event, type, resizer, resizableElement) => {
    switch (type) {
        case "col": {
            const resizerPosition = event.clientX - resizableElement.getCoords().x
            console.log('col resize', resizerPosition)

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
    console.log("colSelector", colSelector)

    resizableElement.css({width: `${resizeElementEndWidth}px`})
    colElements.forEach(element => element.style.width = `${resizeElementEndWidth}px`)
}

export const resizeRow = (event, resizableElement, startY) => {
    const endY = event.clientY
    const deltaHeight = endY - startY
    const resizeElementStartHeight = resizableElement.$el.offsetHeight
    const resizeElementEndHeight = resizeElementStartHeight + deltaHeight
    resizableElement.css({height: `${resizeElementEndHeight}px`})
    // resizer.$el.classList.remove("row-resize-indicator") // Вариант полосы ресайза на css
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

export const getRange = (start, end) => {
    if (start > end) {
        [start, end] = [end, start]
    }
    return {
        start,
        end
    }
}

