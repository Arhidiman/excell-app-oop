import {ExcelComponent} from "@/core/ExcelComponent";

export class Table extends ExcelComponent {
    toHTML() {
        const element = document.createElement("div")
        element.innerHTML = "Table"
        return element
    }
}