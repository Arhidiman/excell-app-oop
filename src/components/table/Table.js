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
    getRange,
    nextSelector
} from "@/components/table/table.lib";
import {TableSelection} from "@/components/table/TableSelection";

export class Table extends ExcelComponent {

    static className = "excel__table"
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["click", "mousedown", "mousemove", 'mouseup', "keydown"]
        })
        this.selection = null
        this.rowsNum = 50
        console.log(this.$root)
    }
    toHTML() {
        return createTable(this.rowsNum)
    }

    onMousedown(event) {
        console.log(event.target.dataset.type)
        if (shouldResize(event)) {
            resizeHandler(event)
        }
        else if(isCell(event)) {
            const $cell = $(event.target)
            this.selection.select($cell)
            const startSelectId = (event.target.dataset['id'])
            if(event.ctrlKey) {
                this.$root.$el.onmousemove = (event) => {
                    const endSelectId = event.target.dataset['id']
                    const range = getRange(startSelectId, endSelectId)
                    const colsNum = range.end.col - range.start.col + 1
                    const cellsRows = []
                    for (let rowNum = range.start.row; rowNum <  range.end.row; rowNum++) {
                        const row = new Array(colsNum)
                            .fill("")
                            .map((col, i) => `${rowNum}:${i + range.start.col}`)
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

    onKeydown(event) {
        const key = event.key
        const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]
        if (keys.includes(key)) {
            const currentId = this.selection.$current.id(true)
            const $nextCell = this.$root.find(nextSelector(key, currentId))
            this.selection.select($nextCell)
            $nextCell.$el.focus()
        }
    }
}

function idToString (parcedId) {
    return `${parcedId.row}:${parcedId.col}`
}