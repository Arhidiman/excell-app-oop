import {ExcelComponent} from "@/core/ExcelComponent";

export class Formula extends ExcelComponent {
    toHTML() {
        const element = document.createElement("div")
        element.innerHTML = "Formula"
        return element
    }
}