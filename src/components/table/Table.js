import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@/core/dom"
import {setResizerStyle, moveResizer, resizeCol, resizeRow} from "@/components/table/table.lib";

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
    }

    onMousemove(event) {

    }

    onMouseup(event) {

    }
}