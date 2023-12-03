import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
    static className = "excel__table"
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["mousedown", "mousemove", 'mouseup']
        })
        this.isMouseDown = false
        this.resizeElement = null
        this.startX = null
        this.endX = null
        this.startY = null
        this.endY = null
        this.colResize = null
        this.rowResize = null
    }
    toHTML() {
        // const element = document.createElement("div")
        // element.innerHTML = "Table"
        return createTable(50)
    }

    onMousedown(event) {
        this.isMouseDown = true
        if (event.target.dataset.resize)  {
            // this.resizeElement = event.target.parentNode
        }
        switch (event.target.dataset.resize) {
            case "col": {
                this.resizeElement = event.target.parentNode
                event.target.classList.add('col-resize-indicator')
                this.startX = event.clientX
                this.colResize = event.target
                console.log(this.colResize)
                const colSelector = `[data-col=${this.resizeElement.textContent.trim()}]`
                this.colElements = document.querySelectorAll(colSelector)
            } break
            case "row": {
                this.resizeElement = event.target.parentNode.parentNode
                console.log(this.resizeElement)
                event.target.classList.add('row-resize-indicator')
                this.startY = event.clientY
                this.rowResize = event.target
            }
        }
    }
    onMousemove(event) {
        if (this.isMouseDown) {
            //перемещение линии колонки
            if (this.colResize) {
                this.colResize.style.left = `${event.clientX - this.resizeElement.getBoundingClientRect().x}px`
            }
            //перемещение линии строки
            if (this.rowResize) {
                this.rowResize.style.top = `${event.clientY - this.resizeElement.getBoundingClientRect().y}px`
            }
        }
    }
    onMouseup(event) {

        //ресайз колонки
        if(this.colResize) {
            console.log('resize col')
            this.endX = event.clientX
            const deltaWidth = this.endX - this.startX
            const resizeElementStartWidth = this.resizeElement.offsetWidth
            const resizeElementEndWidth = resizeElementStartWidth + deltaWidth
            this.colResize.classList.remove("col-resize-indicator")
            this.resizeElement.style.width = `${resizeElementEndWidth}px`
            this.colElements.forEach(element => element.style.width = `${resizeElementEndWidth}px`)
        }

        //ресайз строки
        if(this.rowResize) {
            console.log('resize row')
            this.endY = event.clientY
            const deltaHeight = this.endY - this.startY
            const resizeElementStartHeight = this.resizeElement.offsetHeight
            const resizeElementEndHeight = resizeElementStartHeight + deltaHeight
            this.rowResize.classList.remove("row-resize-indicator")
            this.resizeElement.style.height = `${resizeElementEndHeight}px`
        }
        this.isMouseDown = false
        this.resizeElement = null
        this.colResize = null
        this.rowResize = null
    }
}