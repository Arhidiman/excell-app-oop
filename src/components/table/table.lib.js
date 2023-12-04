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
    const colElements = document.querySelectorAll(colSelector)
    // const colElements = this.$root.findAll(colSelector) // TODO: выяснить почему $root равно undefined
    console.log(resizeElementEndWidth)

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