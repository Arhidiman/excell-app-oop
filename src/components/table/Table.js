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
    isCell,
    getRange
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
            const cellSelector = `[data-id="${event.target.dataset.id}"]`
            const $cell = $(event.target)
            this.selection.select($cell)
            const startSelectId = (event.target.dataset['id'])
            console.log("Ctrl pressed", isCtrlPressed(event))

            if(event.ctrlKey) {
                const $targetCell = $(event.target)
                console.log($targetCell.id())
                this.$root.$el.onmousemove = (event) => {
                    const endSelectId = event.target.dataset['id']
                    const [startRow, startColumn] = startSelectId.split(":").map(Number)
                    const [endRow, endColumn] = endSelectId.split(":").map(Number)
                    const colsNum = endColumn - startColumn + 1
                    const rowsNum = endRow - startRow + 1
                    // console.log(startSelectId, endSelectId)
                    const cellsRows = []
                    const range = getRange(startRow, endRow)
                    for (let rowNum = range.start; rowNum <  range.end; rowNum++) {
                        const row = new Array(colsNum)
                            .fill("")
                            .map((col, i) => `${rowNum}:${i + startColumn}`)
                        cellsRows.push(row)
                    }

                    const $allCells =  cellsRows.length !== 0 && cellsRows
                        .reduce((rows, row) => rows.concat(row))
                        .map((cell) => this.$root.find(`[data-id="${cell}"]`))
                    this.selection.selectGroup($allCells)
                    this.$root.$el.onmouseup = () => {
                        this.$root.$el.onmousemove = null
                    }
                }
            }
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

    }
}

