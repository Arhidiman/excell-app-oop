import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@/core/dom"
import {
    shouldResize,
    resizeHandler,
    isCell,
    getRange,
    nextSelector
} from "@/components/table/table.lib";
import {TableSelection} from "@/components/table/TableSelection";
import * as actions from "@/redux/actions";

export class Table extends ExcelComponent {

    static className = "excel__table"
    constructor($root, options) {
        super($root, {
            name: "Table",
            listeners: ["click", "mousedown", "mousemove", 'mouseup', "keydown", "focus", "input"],
            ...options
        })
        this.selection = null
        this.rowsNum = 50
        this.state = this.store.getState()
    }
    toHTML() {
        return createTable(this.rowsNum, this.state)
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit("table:select", $cell)
        this.$dispatch({type: "TEST"})
    }

    init() {
        super.init()
        this.selection = new TableSelection(this.$root)
        const $cell = this.$root.find(`[data-id="0:0"]`)
        $cell.focus()
        this.selectCell($cell)
        this.$on("formula:input", text => {
            this.selection.$current.text(text)
        })
        this.$on("formula:enterdown", () => {
            this.selection.$current.focus()
        })
        // this.$subscribe(state => console.log("table state", state))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event)
            this.$dispatch(actions.tableResize(data))
        } catch(error) {
            throw new Error(error)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        }
        else if(isCell(event)) {
            const $cell = $(event.target)
            this.selectCell($cell)
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
            this.selectCell($nextCell)
            $nextCell.$el.focus()
            this.$emit("table:select", $nextCell)
        }
    }

    onInput(event) {
        this.$emit("table:input", $(event.target))
    }
    onFocus() {
        console.log("focused")
    }
}

function idToString (parcedId) {
    return `${parcedId.row}:${parcedId.col}`
}