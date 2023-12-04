import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@/core/dom"

export class Table extends ExcelComponent {
    static className = "excel__table"
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["mousedown", "mousemove", 'mouseup']
        })
        console.log(this.$root)
    }
    toHTML() {
        return createTable(50)
    }

    onMousedown(event) {
        console.log(this.$root) // TODO: выяснить почему $root равно undefined
        if (event.target.dataset.resize) {
            const resizer = $(event.target)

            const type = event.target.dataset.resize
            const startX = event.clientX
            const startY = event.clientY
            const resizableElement = $(resizer.$el.closest(`[data-type="resizable"]`))
            const colSelector = `[data-col=${resizableElement.$el.textContent.trim()}]`

            switch (type) {
                case "col": {
                    // event.target.classList.add('col-resize-indicator') // Вариант полоса ресайза на css
                    resizer.css({background: "blue", height: "100vh"})
                } break
                case "row": {
                    // event.target.classList.add('row-resize-indicator')
                    resizer.css({background: "blue", width: "300vw"})
                }
            }

            document.onmousemove = (event) => {
                // console.log(resizableElement)
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

            document.onmouseup = (event) => {
                resizer.css({background: "transparent", heigth: "24px"})
                switch (type) {
                    case "col": {
                        console.log('resize col')
                        const endX = event.clientX
                        const deltaWidth = endX - startX
                        const resizeElementStartWidth = resizableElement.$el.offsetWidth
                        const resizeElementEndWidth = resizeElementStartWidth + deltaWidth
                        const colElements = document.querySelectorAll(colSelector)
                        // const colElements = this.$root.findAll(colSelector) // TODO: выяснить почему $root равно undefined
                        console.log(this.$root)

                        resizableElement.css({width: `${resizeElementEndWidth}px`})
                        colElements.forEach(element => element.style.width = `${resizeElementEndWidth}px`)
                    } break
                    case "row": {
                        console.log('resize row')
                        const endY = event.clientY
                        const deltaHeight = endY - startY
                        const resizeElementStartHeight = resizableElement.$el.offsetHeight
                        const resizeElementEndHeight = resizeElementStartHeight + deltaHeight
                        resizer.$el.classList.remove("row-resize-indicator")
                        resizableElement.css({height: `${resizeElementEndHeight}px`})
                    }
                }
                document.onmousemove = null
            }
        }
    }

    onMousemove(event) {

    }

    onMouseup(event) {

    }
}