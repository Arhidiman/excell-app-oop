import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@/core/dom"
import {
    setResizerStyle,
    moveResizer,
    resizeCol,
    resizeRow,
    shouldResize,
    resizeHandler,
    isCell
} from "@/components/table/table.lib";
import {TableSelection} from "@/components/table/TableSelection";

export class Table extends ExcelComponent {

    static className = "excel__table"
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["click", "mousedown", "mousemove", 'mouseup']
        })
        this.selection = null
        console.log(this.$root)
    }
    toHTML() {
        return createTable(50)
    }

    onMousedown(event) {
        console.log(event.target.dataset.type)
        if (shouldResize(event)) {
            resizeHandler(event)
        }
        else if(isCell(event)) {
            const cellCelector = `[data-id="${event.target.dataset.id}"]`
            const $cell = $(event.target)
            this.selection.select($cell)
        }
    }

    init() {
        super.init()
        console.log(this.$root.$el)
        this.selection = new TableSelection(this.$root)
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selection.select($cell)
    }

    onMousemove(event) {

    }

    onMouseup(event) {

    }

    onClick(event) {
        // console.log(event.target)
        // const cellCelector = `[data-id="${event.target.dataset.id}"]`
        // const $cell = this.$root.find(cellCelector)
        // this.selection.select($cell)
    }
}