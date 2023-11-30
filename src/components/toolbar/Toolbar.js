import {ExcelComponent} from "@/core/ExcelComponent";

export class Toolbar extends ExcelComponent {
    toHTML() {
        const element = document.createElement("div")
        element.innerHTML = "Toolbar"
        return element
    }
}