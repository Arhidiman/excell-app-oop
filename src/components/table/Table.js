import {ExcelComponent} from "@/core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
    static className = "excel__table"
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ["mousedown", "mousemove"]
        })
    }
    toHTML() {
        // const element = document.createElement("div")
        // element.innerHTML = "Table"
        return createTable(50)
    }

    onMousedown() {
        console.log("mouseDown")
    }
    onMousemove() {
        console.log("mouseMove")
    }
}